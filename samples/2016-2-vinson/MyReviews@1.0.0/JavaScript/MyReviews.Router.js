// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('MyReviews.Router'
, [
    'Backbone'
  , 'MyReviews.List.View'
  , 'MyReviews.Collection'
  ]
, function
  (
    Backbone
  , ListView
  , CollectionView
  )
{
  'use strict';

  return Backbone.Router.extend({
    routes:
    {
      'myreviews': 'listReviews'
    }

  , initialize: function (application)
    {
      this.application = application;
    }

  , listReviews: function ()
    {
      var collection = new CollectionView();
      var view = new ListView
      ({
        collection: collection
      , application: this.application
      });

      collection.fetch().done(function()
      {
        view.showContent();
      });
    }
  })
});