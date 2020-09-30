// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('ExampleSuiteScript.View'
, [
    'Backbone'

  , 'example_suitescript.tpl'
  ]
, function
  (
    Backbone

  , Template
  )
{
  'use strict'

  return Backbone.View.extend ({
    attributes:
    {
      'class': 'examplesuitescript-container'
    }

  , getBreadcrumbPages: function ()
    {
      return [{
        text: _('Example SuiteScript').translate()
      , href: '/examplesuitescript'
      }]
    }

  , getContext: function ()
    {
      return {
        faveColor: this.model.get('faveColor')
      , faveNumber: this.model.get('faveNumber')
      , faveFruit: this.model.get('faveFruit')
      }
    }

  , initialize: function (options)
    {
      this.options = options;
      this.application = options.application;
    }

  , template: Template

  , title: _('Example SuiteScript Page').translate()
  });
});