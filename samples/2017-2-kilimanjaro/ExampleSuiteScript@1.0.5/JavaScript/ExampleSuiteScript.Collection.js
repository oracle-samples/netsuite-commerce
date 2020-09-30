// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('ExampleSuiteScript.Collection'
, [
    'Backbone'

  , 'ExampleSuiteScript.Model'

  , 'Utils'
  ]
, function
  (
    Backbone

  , Model

  , Utils
  )
{
  'use strict';

  return Backbone.Collection.extend({
    url: Utils.getAbsoluteUrl('services/ExampleSuiteScript.Service.ss')
  , model: Model
  })
});