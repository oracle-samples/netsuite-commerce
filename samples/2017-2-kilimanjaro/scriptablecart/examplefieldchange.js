// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

// In this example, we're listening to changes to the shipping cost of the order. In our scenario we reduce all shipping fees to zero (free shipping).
function customFieldChange (type, name)
{
  if (nlapiGetContext().getExecutionContext() !== 'webstore') {return true}

  if (name == 'shippingcost')
  {
    if (IS_PROCESSING) {return true}

    IS_PROCESSING = true;

    // ie theFunctionWeWantToRun();
    nlapiSetFieldValue('shippingcost', 0);

    IS_PROCESSING = false;
  }
}