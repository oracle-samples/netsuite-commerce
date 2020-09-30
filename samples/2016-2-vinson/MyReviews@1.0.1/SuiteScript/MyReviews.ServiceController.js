// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('MyReviews.ServiceController'
, [
    'ServiceController'
  , 'MyReviews.Model'
  ]
, function
  (
    ServiceController
  , MyReviewsModel
  )
{
  'use strict';

  return ServiceController.extend({

    name: 'ProductReviews.ServiceController'

  , options:
    {
      common: {
        requireLogin: true
      }
    }

  , get: function ()
    {
      return MyReviewsModel.list()
    }
  })
});