// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('UserPreferences.Router'
, [
    'Backbone'
  , 'UserPreferences.Edit.View'
  , 'UserPreferences.List.View'
  , 'UserPreferences.Collection'
  , 'UserPreferences.Model'

  , 'jQuery'
  ]
, function
  (
    Backbone
  , UserPreferencesEditView
  , UserPreferencesListView
  , UserPreferencesCollection
  , UserPreferencesModel

  , jQuery
  )
{
  'use strict';

  return Backbone.Router.extend({
    routes:
    {
      'preferences': 'preferencesList'
    , 'preferences/add': 'preferencesEdit'
    , 'preferences/:id': 'preferencesEdit'
    }

  , initialize: function (application)
    {
      this.application = application
    }

  , preferencesEdit: function (id)
    {
      var model = new UserPreferencesModel();
      var promise = jQuery.Deferred();
      var application = this.application;

      if (!id) {promise.resolve()}
      else
      {
        model.fetch({data: {internalid: id}})
        .done(function () {promise.resolve();});
      }

      promise.done(function ()
      {
        var view = new UserPreferencesEditView
        ({
          application: application
        , model: model
        });

        view.showContent();
        view.model.on('sync', function (model)
        {
          Backbone.history.navigate('preferences', {trigger: true});
        });
      });
    }

  , preferencesList: function ()
    {
      var collection = new UserPreferencesCollection();
      var view = new UserPreferencesListView
      ({
        application: this.application
      , collection: collection
      });

      collection.fetch().done(function ()
      {
        view.showContent();
      });
    }
  })
});