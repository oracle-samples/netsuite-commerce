// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

// The sample script provided here restricts the quantity of items based on the value in a custom field that you add to the item record. When a shopper adds an item that has an allotment amount to the cart, a custom record is created to track the quantity sold.

// See https://system.na1.netsuite.com/app/help/helpcenter.nl?fid=section_N2558716.html ("Setting Quantity Limits for Customers") for setup information

// BEGIN CUSTOM FUNCTIONS FOR ALLOTMENTS

function customValidateLine(type)
{
// In web store scripts line inputs only needed to be validated on the item sublist.

   if (type != 'item')
   {
      return true;
   }
// Note that validation routines are called in a different way than other events because the
// return value of each function must be tested before going on to the next function. If any
// function returns false, then stop processing and return false.
   if (!verifyAllotments())
   {
      return false;
   }
// All validations passed. Return true.

   return true;
}
// This custom function will be run after a sales order is saved. Because only User Event scripts
// have an afterSubmit event, you must create a separate User Event script record.
function customAfterSubmit()
{
   return updateAllotmentsOnSave();
}
//END CUSTOM FUNCTIONS FOR ALLOTMENTS

//BEGIN ALLOTMENTS

function verifyAllotments()
{
// Get current item and customer.

   var custId = nlapiGetFieldValue('entity');
   var itemId = nlapiGetCurrentLineItemValue('item', 'item');
   debug('Customer ID: '+custId+', Item Id: '+itemId);
// First, check to see if this item has a value for the allotment custom field. If not, ignore the
// validation and allow the line item to be entered. Not all items will have a value for allotment.
   var allotmentDefault = nlapiGetCurrentLineItemValue('item','custcol_allotmentdefault');
   debug('Allotment default for item '+itemId+' is '+allotmentDefault);
   if (isEmpty(allotmentDefault))
   {
      debug('Empty allotment default - ignore validation');
      return true;
   }
// If the shopper has not logged in, the allotment record cannot be found. Set the value for the
// number remaining in the allotment to the value in the Allotment custom field on the item.
// Note that this sample script does not include an alert for shoppers about the allotment
// quantity.
   var remaining = allotmentDefault;

   var allotmentRec = getAllotmentRecord(custId, itemId, allotmentDefault);
   if (allotmentRec != null)
   {
// When the shopper logs in, find the allotment record. Get the number remaining in the
// allotment for this customer.
      remaining = allotmentRec.getFieldValue('custrecord_remaining');
   }
// Calculate the current total quantity for this item to check if it exceeds the customer's
// allotted quantity.
   var qty = parseInt(nlapiGetCurrentLineItemValue('item','quantity'));
   var currentIndex = nlapiGetCurrentLineItemIndex('item');
// Because the order can contain multiple line items for the same line, look for the items in
// other lines and add the quantities together to get an accurate count.
   var numLines = nlapiGetLineItemCount('item');
   for (var i=1; i<= numLines; i++)
   {
// Skip the line currently selected because it was already counted.

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
// If quantities are added that exceed the current allotments, refuse the entry.

      alert('You are only allotted '+remaining+' of this item - please reduce your order');
      return false;
   }

   return true;
}
// This function is called when the sales order is saved.

function updateAllotmentsOnSave()
{
   var custId = nlapiGetFieldValue('entity');
   var numLines = nlapiGetLineItemCount('item');
   var allottedItemQty = new Array();
   debug('Allotment update called for customer '+custId);
// First, get the total item count for each item.

   var itemMap = getItemMap();
// Then construct a map of the current allotments for each item.

   var allottedMap = new Array();

   for (var i=1; i<= numLines; i++)
   {
      var defaultAllotment = nlapiGetLineItemValue('item', 'custcol_allotmentdefault', i);
// If this item doesn't have allotments, then skip it.

      if (isEmpty(defaultAllotment))
      {
         debug('Line '+i+' has no default allotments. Skipping.');
         continue;
      }

      var itemId = nlapiGetLineItemValue('item','item',i);
      if (!(itemId in allottedMap))
      {
// If this item ID does not exist in the map, then load the allotment record.

         debug('Getting allotment rec for item ID '+itemId);
         var rec = getAllotmentRecord(custId, itemId, nlapiGetLineItemValue('item','custcol_allotmentdefault', i));
         allottedMap[itemId] = rec;
      }
   }
// Now, update each custom record with the new value for the allotted number remaining.

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
// Set the record with the new quantity, and then save it.

      var newQty = remaining - qty;
      rec.setFieldValue('custrecord_remaining', newQty);
      debug('Updating custom record to new qty = '+newQty+' for item ID '+itemId);
      nlapiSubmitRecord(rec, true);
   }

   return true;
}
// This function returns a custom record for allotments for this customer-item
// combination. If an allotment record does not exist for this customer and item combination, it
// will create one with the original allotment specified on the item record. If the
// customer ID is null or zero (0), the shopper has not logged in, and should not be given a
// record. Instead, restrict the shopper to the default value until they log in.
function getAllotmentRecord(custId, itemId, allotmentDefault)
{
// Before doing anything else, check for anonymous shoppers. If an anonymous shopper is
// detected, return null for an allotment record. Any script that calls this function should check
// for null values before proceeding to read the outgoing record.
   if (isEmpty(custId) || custId == '0')
   {
      return null;
   }
// Define two filters, one for item and one for the customer.

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
// If no records are found, then create a new record to track this customer-item combination.

      rec = nlapiCreateRecord('customrecord_allotments');
      rec.setFieldValue('custrecord_customer', custId);
      rec.setFieldValue('custrecord_item', itemId);
      rec.setFieldValue('custrecord_remaining', allotmentDefault);
      nlapiSubmitRecord(rec);
   }
   else
   {
// The record was found. Get the remaining quantity.

      rec = nlapiLoadRecord(searchresults[0].getRecordType(), searchresults[0].getId());
      debug('Custom record found; remaining '+rec.getFieldValue('custrecord_remaining')+' found for item '+itemId+' and customer ID '+custId);
   }

   return rec;
}
// UTILITY FUNCTIONS

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
// This function returns a map with the internal ID for the item as the key and the total
// quantity for that item in the value. It sums items when the same item appears on different
// lines on the sales order. If passed a non-null filter value, item types that match the filter are
// excluded.
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
// Include only items that match the filter.

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
// If other line items exist with the same item, then add the quantities together.

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
//END UTILITY FUNCTIONS