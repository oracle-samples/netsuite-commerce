// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('UserPreferences.Router'
, [
    'Backbone'
  , 'UserPreferences.List.View'
  , 'UserPreferences.Collection'
  ]
, function
  (
    Backbone
  , UserPreferencesListView
  , UserPreferencesCollection
  )
{
  'use strict';

  return Backbone.Router.extend({
    routes:
    {
      'preferences': 'preferencesList'
    , 'preferences/add': 'preferencesAdd'
    , 'preferences/:id': 'preferencesEdit'
    }

  , initialize: function (application)
    {
      this.application = application
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