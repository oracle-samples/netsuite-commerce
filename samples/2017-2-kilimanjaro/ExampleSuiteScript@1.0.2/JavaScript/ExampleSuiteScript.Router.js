// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('ExampleSuiteScript.Router'
, [
    'Backbone'

  , 'ExampleSuiteScript.List.View'
  , 'ExampleSuiteScript.Edit.View'
  , 'ExampleSuiteScript.Model'
  , 'ExampleSuiteScript.Collection'
  ]
, function
  (
    Backbone

  , ListView
  , EditView
  , Model
  , Collection
  )
{
  'use strict';

  return Backbone.Router.extend ({
    routes:
    {
      'examplesuitescript': 'list'
    , 'examplesuitescript/new': 'new'
    }

  , initialize: function (application)
    {
      this.application = application;
    }

  , list: function ()
    {
      var collection = new Collection()
    , view = new ListView
      ({
        collection: collection
      , application: this.application
      });

      collection.fetch().done(function ()
      {
        view.showContent();
      });
    }

  , new: function ()
    {
      var model = new Model()
    , view = new EditView
      ({
        application: this.application
      , model: model
      });

      view.showContent();
      view.model.on('sync change destroy reset add', function (model)
      {
        Backbone.history.navigate('examplesuitescript', {trigger: true});
      });
    }
  })
});