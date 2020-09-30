// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('ExampleCorrelated.ServiceController'
, [
    'ExampleCorrelated.Model'
  , 'ServiceController'
  , 'Application'
  ]
, function
  (
    Model
  , ServiceController
  , Application
  )
{
  'use strict';

  return ServiceController.extend({

    name: 'ExampleCorrelated.ServiceController'

  , options:
    {
      common:
      {
        requireLogin: true
      }
    }

  , get: function ()
    {
      return Model.getAbandonedIds();
    }

  });
});
