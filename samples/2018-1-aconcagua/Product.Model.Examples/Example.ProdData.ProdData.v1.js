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

  // The following will perform a query of every item in your inventory (up to default limit, which is 50)
  return {
    mountToApp: function mountToApp (container)
    {
      var product = new ProductModel()
    , items = product.get('item').fetch().then(
      function(data, result, jqXhr)
      {
        console.log(data);
        console.log(result);
        console.log(jqXhr);
      });
    }
  }
});