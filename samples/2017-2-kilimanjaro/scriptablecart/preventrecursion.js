// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

// Create a variable to be used as a boolean flag
var IS_PROCESSING = false;

function customRecalc (type, action)
{
  // As is good practice, run a check to see if we're in the webstore. If we're not, the function short-circuits and doesn't run any additional code
  if (nlapiGetContext().getExecutionContext() !== 'webstore') {return true}

  // We check what type and action we're dealing with
  if (type === 'item' && (action == 'commit' || action == 'remove'))
  {
    // We check to see if we're already processing some code; if we are, we short circuit and don't run any more code
    if (IS_PROCESSING) {return true}

    // If we're not, then we can run the code related to this function
    try
    {
      // We're now processing code, so we flag it to true for the timebeing. Thus, if another function (or this function) is called again, it won't process until this one is done.
      IS_PROCESSING = true;

      // Now we can run the function we want to run
      theFunctionWeWantToRun();
    }

    // Error handling
    catch (e)
    {
      nlapiLogExecution('ERROR', 'Error', e);
    }

    // The last thing we do is set the variable back to false
    finally
    {
      IS_PROCESSING = false;
    }
  }
}
