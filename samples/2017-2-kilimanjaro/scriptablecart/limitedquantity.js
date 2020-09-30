// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

function customValidateLine(type)
{
  if (type != 'item')
  {
  return true;
  }

  if (!verifyAllotments())
  {
  return false;
  }

  return true;
}

function customAfterSubmit()
{
  return updateAllotmentsOnSave();
}

function verifyAllotments()
{
  var custId = nlapiGetFieldValue('entity');
  var itemId = nlapiGetCurrentLineItemValue('item', 'item');
  debug('Customer ID: '+custId+', Item Id: '+itemId);

  var allotmentDefault = nlapiGetCurrentLineItemValue('item','custcol_allotmentdefault');
  debug('Allotment default for item '+itemId+' is '+allotmentDefault);
  if (isEmpty(allotmentDefault))
  {
    debug('Empty allotment default - ignore validation');
    return true;
  }

  var remaining = allotmentDefault;
  var allotmentRec = getAllotmentRecord(custId, itemId, allotmentDefault);
  if (allotmentRec != null)
  {
    remaining = allotmentRec.getFieldValue('custrecord_remaining');
  }

  var qty = parseInt(nlapiGetCurrentLineItemValue('item','quantity'));
  var currentIndex = nlapiGetCurrentLineItemIndex('item');
  var numLines = nlapiGetLineItemCount('item');

  for (var i=1; i<= numLines; i++)
  {
    if (i == currentIndex) { continue; }
    var nxtItemId = nlapiGetLineItemValue('item','item',i);

    if (nxtItemId == itemId)
    {
     qty = qty + parseInt(nlapiGetLineItemValue('item','quantity',i));
    }
  }

  debug('Current quantity for item '+itemId+' is '+qty);

  if (qty > remaining)
  {
    alert('You are only allotted '+remaining+' of this item - please reduce your order');
    return false;
  }

  return true;
}

function updateAllotmentsOnSave()
{
  var custId = nlapiGetFieldValue('entity');
  var numLines = nlapiGetLineItemCount('item');
  var allottedItemQty = new Array();
  debug('Allotment update called for customer '+custId);

  var itemMap = getItemMap();

  var allottedMap = new Array();

  for (var i=1; i<= numLines; i++)
  {
    var defaultAllotment = nlapiGetLineItemValue('item', 'custcol_allotmentdefault', i);

    if (isEmpty(defaultAllotment))
    {
      debug('Line '+i+' has no default allotments. Skipping.');
      continue;
    }

    var itemId = nlapiGetLineItemValue('item','item',i);
    if (!(itemId in allottedMap))
    {
      debug('Getting allotment rec for item ID '+itemId);
      var rec = getAllotmentRecord(custId, itemId, nlapiGetLineItemValue('item','custcol_allotmentdefault', i));
      allottedMap[itemId] = rec;
    }
  }

  for (itemId in allottedMap)
  {
    rec = allottedMap[itemId];
    var remaining = rec.getFieldValue('custrecord_remaining');
    var qty = itemMap[itemId];

    if (qty > remaining)
    {
     alert('You are only allotted '+remaining+' of this item - please reduce your order');
     return false;
    }

    var newQty = remaining - qty;
    rec.setFieldValue('custrecord_remaining', newQty);
    debug('Updating custom record to new qty = '+newQty+' for item ID '+itemId);
    nlapiSubmitRecord(rec, true);
  }

  return true;
}

function getAllotmentRecord(custId, itemId, allotmentDefault)
{
  if (isEmpty(custId) || custId == '0')
  {
   return null;
  }

  var filters = new Array();
  filters[0] = new nlobjSearchFilter('custrecord_customer', null, 'anyOf', custId);
  filters[1] = new nlobjSearchFilter('custrecord_item', null, 'anyOf', itemId);

  try
  {
    var searchresults = nlapiSearchRecord('customrecord_allotments', null, filters, null);
  }

  catch (err)
  {
    debug('Error during allotment record retrieval: '+err.description);
  }

  var rec;

  if (isEmpty(searchresults))
  {
    debug('No record found for item '+itemId+' and customer ID '+custId+' - creating a new one');

    rec = nlapiCreateRecord('customrecord_allotments');
    rec.setFieldValue('custrecord_customer', custId);
    rec.setFieldValue('custrecord_item', itemId);
    rec.setFieldValue('custrecord_remaining', allotmentDefault);
    nlapiSubmitRecord(rec);
  }

  else
  {
    rec = nlapiLoadRecord(searchresults[0].getRecordType(), searchresults[0].getId());
    debug('Custom record found; remaining '+rec.getFieldValue('custrecord_remaining')+' found for item '+itemId+' and customer ID '+custId);
  }

  return rec;
}

function isEmpty(val)
{
  return (val == null || val == '');
}

function isNotEmpty(val)
{
  return !isEmpty(val);
}

function getVal(colName, linenum)
{
  return nlapiGetLineItemValue('item',colName,linenum);
}

function getItemMap(excludeFilter)
{
  if (isNotEmpty(excludeFilter))
  {
    debug('getItemMap called with filter '+excludeFilter);
  }

  var itemMap = new Array();
  var numLines = nlapiGetLineItemCount('item');

  for (var i=1; i<= numLines; i++)
  {
    var itemType = nlapiGetLineItemValue('item','itemtype',i);
    if (isNotEmpty(excludeFilter) && itemType == excludeFilter)
    {
      debug('Ignoring line '+i+', itemType '+itemType+' excluded');
      continue;
    }

    var itemId = nlapiGetLineItemValue('item','item',i);
    var nextQty = parseInt(nlapiGetLineItemValue('item','quantity',i));

    debug('Item '+itemId+' of type '+itemType+' added to item map');

    if (itemId in itemMap)
    {
      nextQty = nextQty + parseInt(itemMap[itemId]);
    }

    debug('Item Id '+itemId+' has updated quantity to '+nextQty+' because of line #'+i);
    itemMap[itemId] = nextQty;
  }

  return itemMap;
}

function debug(val)
{
  nlapiLogExecution('DEBUG', val);
}