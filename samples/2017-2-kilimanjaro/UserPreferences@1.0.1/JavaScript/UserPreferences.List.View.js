// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('UserPreferences.List.View'
, [
    'Backbone'
  , 'Backbone.CollectionView'

  , 'UserPreferences.Details.View'
  , 'user_preferences_list.tpl'
  ]
, function
  (
    Backbone
  , CollectionView

  , UserPreferencesDetailsView
  , user_preferences_list_tpl
  )
{
  'use strict';

  return Backbone.View.extend({
    template: user_preferences_list_tpl

  , initialize: function (options)
    {
      this.application = options.application
    , this.collection = options.collection
    }

  , childViews:
    {
      'UserPreferences.Collection': function ()
      {
        return new CollectionView({
          'childView': UserPreferencesDetailsView
        , 'collection': this.collection
        , 'viewsPerRow': 1
        })
      }
    }
  })
});