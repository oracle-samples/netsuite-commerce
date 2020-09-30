// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('Example.ProdData.ProdData'
, [
    'Product.Model'
  ]
, function
  (
    ProductModel
  )
{
  'use strict';

  // The following will perform a query just for a specific query
  return {
    mountToApp: function mountToApp (container)
    {
      var product = new ProductModel()
      // This returns details for item 8050.
      // However, you can use any of the input parameters to make a specific search (https://netsuite.custhelp.com/app/answers/detail/a_id/28857).
      // For example, if you wanted to do a keyword search for tents, you could change it to {q: 'tent'}; to return everything from my Orange Things commerce category, I can search using its URL: {commercecategoryurl: '/orange-things'}
    , query = {id: '8050'}
    , item = product.get('item').fetch({data: query}).then(
      function(data, result, jqXhr)
      {
        console.log(data);
        console.log(result);
        console.log(jqXhr);
      });
    }
  }
});