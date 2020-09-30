// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('Example.ExamplePageTypes.AboutUs.ServiceController'
, [
    'ServiceController'
  , 'Example.ExamplePageTypes.AboutUs.Model'
  ]
, function
  (
    ServiceController
  , AboutUsModel
  )
{
  'use strict';

  return ServiceController.extend({
    name: 'AboutUs.ServiceController'

  , get: function ()
    {
      var id = this.request.getParameter('internalid');
      return id ? AboutUsModel.get(id) : AboutUsModel.list();
    }
  })
})