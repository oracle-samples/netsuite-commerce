// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('ExampleSuiteScript.List.View'
, [
    'Backbone'
  , 'Backbone.CollectionView'

  , 'ExampleSuiteScript.Details.View'
  , 'example_suitescript_list.tpl'
  ]
, function
  (
    Backbone
  , CollectionView

  , DetailsView
  , Template
  )
{
  'use strict'

  return Backbone.View.extend ({
    attributes:
    {
      'class': 'examplesuitescript-container'
    }

  , childViews:
    {
      'ExampleSuiteScript.Collection': function ()
      {
        return new CollectionView({
          'childView': DetailsView,
          'collection': this.collection,
          'viewsPerRow': 1
        });
      }
    }

  , getBreadcrumbPages: function ()
    {
      return [{
        text: _('Example SuiteScript').translate()
      , href: '/examplesuitescript'
      }]
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