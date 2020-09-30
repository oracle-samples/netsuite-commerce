// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('ExampleSuiteScript.Details.View'
, [
    'Backbone'

  , 'example_suitescript_details.tpl'
  ]
, function
  (
    Backbone

  , Template
  )
{
  'use strict';

  return Backbone.View.extend ({
    template: Template

  , getContext: function ()
    {
      return {
        faveThing: this.model.get('faveThing')
      , faveReason: this.model.get('faveReason')
      }
    }
  })
});