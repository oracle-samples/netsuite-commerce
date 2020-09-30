// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

// Utility Scripts
// Unlike in SCA, we don't have an alias set up for console messaging, so in regular SuiteScript files you have to do it the proper way. To make it easier, let's just write our own alias.
function debug (message)
{
  nlapiLogExecution('DEBUG', 'Example Scriptable Cart', message);
}

// This lets you check where the script is being executed. Remember, a scriptable cart script can be called in the frontend and the backend, so you may want to wrap bits of code in a check, eg:
// if (getContext() === 'webstore')
// or
// if (getContext() === 'userinterface')
function getContext ()
{
  return nlapiGetContext().getExecutionContext();
}
// END UTILITY FUNCTIONS

// The recalc function is called whenever the contents of the cart is modified
function customRecalc ()
{
  debug('recalc called!')
}

//The validateLine function is called whenever a transaction line in the order is changed. It executes the code *before* the change is made, which means you can use it to block the change. If we want the change to go through, then we *must* return true; returning false (or not returning anything) will block the change.
function customValidateLine (type)
{
  if (type = 'item')
  {
    var itemId = nlapiGetCurrentLineItemValue('item', 'item');
    debug('Line validated: ' + itemId);
  }

  return true
}

// The pageInit function is called when the transaction form finishes loading or if it is reset. On the webstore, this typically happens when:
// a) an existing user logs in
// b) a new user adds something to their cart for the first time
// c) a user goes to check out (ie the cart is being converted from a live transaction to a sales order)
// In the backend, this means when a new sales order is being created
function customPageInit ()
{
  if (getContext() === 'webstore')
  {
    debug('You\'re in the frontend!');
  }
  else if (getContext() === 'userinterface')
  {
    debug('You\'re in the backend!');
  }

  // Check whether there's transaction record associated with the current user by seeing if it returns anything for the entity field. If there isn't one then it'll return 0.
  var userId = nlapiGetFieldValue('entity');
  if (parseInt(userId) === 0)
  {
    debug('Guest user');
  }
  else
  {
    debug('User id: ' + userId);
  }
}

// The saveRecord function is called after the user submits the record. However, like validateLine, saveRecord can be used as a blocker: thus we have to return true if we want the order to actually be placed, or return false (or not return anything) if we want it to be prevented from being placed.
// Typically we use this function as a second (custom) line of validation. For example, if you have a field that is mandatory for your business (but not mandatory in NetSuite) then you can make it mandatory here.
function customSaveRecord ()
{
  nlapiSetFieldValue('custbody_used_scriptable_cart', 'T');
  return true
}