// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

// In this example, shipping tax does not needed to be calculated in the web store as it's already included in the pricing on the shipping cost, so we use the postSourcing function and listen to the shippingtaxcode field
function customPostSourcing(type, name) {
  if(nlapiGetContext().getExecutionContext() !== 'webstore') {return true}

  if (name == 'shippingtaxcode') {
    if (IS_PROCESSING) {return true}

    IS_PROCESSING = true;

    // ie theFunctionWeWantToRun();
    nlapiSetFieldValue('shippingtax1rate', 0);

    IS_PROCESSING = false;
  }
}