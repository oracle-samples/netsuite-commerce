// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('ExampleSuiteScript.ServiceController'
, [
    'Application'
  , 'ServiceController'
  , 'ExampleSuiteScript.Model'
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
    name: 'ExampleSuiteScript.ServiceController'

  , get: function ()
    {
      var id = this.request.getParameter('internalid');
      return id ? Model.get(id) : Model.list()
    }

  , post: function ()
    {
      var id = Model.create(this.data);
      this.sendContent(Model.get(id), {'status': 201});
    }

  , put: function ()
    {
      var id = this.request.getParameter('internalid');
      Model.update(id, this.data);
      return Model.get(id)
    }

  , delete: function ()
    {
      var id = this.request.getParameter('internalid');
      Model.remove(id);
      return {'status': 'ok'}
    }
  })
});