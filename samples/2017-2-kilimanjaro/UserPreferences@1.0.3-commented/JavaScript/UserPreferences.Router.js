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

  // Routers are used when you need to add new URL paths for users to visit.
  return Backbone.Router.extend({
    // An object of the URL paths you want to add, mapped to the functions you want to run when they are called.
    // In addition to static text, there are some wild cards and parameters that are accepted.
    // See http://backbonejs.org/#Router
    routes:
    {
      'preferences': 'preferencesList'
    , 'preferences/add': 'preferencesEdit'
    , 'preferences/:id': 'preferencesEdit'
    }

    // This function runs when the file is first loaded. It is available in a number of Backbone files, and can be a useful way of running code before any function runs.
  , initialize: function (application)
    {
      this.application = application
    }

  , preferencesEdit: function (id)
    {
      // Create a model to handle the data
      var model = new UserPreferencesModel();
      // Promises / deferred objects let you perform AJAX calls and then proceed on based on the results returned.
      // See https://developers.suitecommerce.com/understand-jquery-promises-and-deferred-objects
      var promise = jQuery.Deferred();
      var application = this.application;

      // If an ID has been provided, then we know that we're meant to be fetching a particular record; otherwise just skip the fetch.
      if (!id) {promise.resolve()}
      else
      {
        // Get the record data, and when we have it, move on.
        model.fetch({data: {internalid: id}})
        .done(function () {promise.resolve();});
      }

      // When jQuery.Deferred().resolve() is called, we go to jQuery.Deferred().done.
      // In either case, we need to create a view to display. If it we fetched data then we can use the populated model, otherwise we can just use the empty one.
      promise.done(function ()
      {
        var view = new UserPreferencesEditView
        ({
          application: application
        , model: model
        });

        view.showContent();
        // Adding an event listener for when the model is synced. If it is uploaded to the server, then it'll trigger a redirect in the browser
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