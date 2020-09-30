// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */

define(
  [
    'N/search'
  ]
, function ExampleSuitelet
  (
    search
  )
{
  function loadSomething(context)
  {
    var customerId = context.request.parameters.customer;

    var data = search.lookupFields({
      type: search.Type.CUSTOMER
    , id: customerId
    , columns: ['subsidiary', 'country', 'city', 'phone', 'mobilephone']
    });

    context.response.setHeader({
      name: 'Content-Type'
    , value: 'application/json'
    });

    context.response.write({
      output: JSON.stringify(data) || {}
    });
  }

  return {
    onRequest: loadSomething
  };
});
