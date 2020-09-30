// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('ExampleLocation.ServiceController'
, [
    'Application'
  , 'ServiceController'
  , 'ExampleLocation.Model'
  ]
, function
  (
    Application
  , ServiceController
  , Model
  )
{
  'use strict';

  return ServiceController.extend({
    name: 'ExampleLocation.ServiceController'

  , get: function ()
    {
      var id = this.request.getParameter('internalid');
      return Model.get(id)
    }
  })
});