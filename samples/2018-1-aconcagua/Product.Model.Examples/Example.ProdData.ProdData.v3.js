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

  // The following will return results for the 'tent' keyword search AND debug information AND ensuring that the results are NOT from the cache.
  return {
    mountToApp: function mountToApp (container)
    {
      var product = new ProductModel()
    , query = {
        q: 'tent'
        // ssdebug returns debug and timing information, useful for seeing how long API requests take to return results. USE ONLY FOR DEBUGGING
      , ssdebug: true
        // Adding an arbitrary parameter with a unique value ensures that the results returned are not from the cache. USE ONLY FOR DEBUGGING
      , timestamp: Date.now()
      }
    , item = product.get('item').fetch(
      {
        data: query
      })

      .then(
        function (data, result, jqXhr)
        {
          console.log(data);
        }
      );
    }
  }
});