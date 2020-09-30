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

    // Build a function that requests search information. It takes the collection (which is just review data at this point)
  , itemDetails: function (reviews)
    {
      // Build up some useful variables
      var ids = []
      , locale = SC.ENVIRONMENT.currentLanguage.locale.split("_")
      , language = locale[0]
      , country = locale[1]
      , currency = SC.ENVIRONMENT.currentCurrency.code
      , company = SC.ENVIRONMENT.companyId
      , fieldset = 'myreviews'

      // Go through the object passed to it and build an array out of the item IDs
      for (var i = 0; i < reviews.models.length; i++)
      {
        ids.push(reviews.models[i].attributes.itemid)
      }

      ids = ids.toString();

      // Build the search URL and the search request itself
      var search = '/api/items?id=' + ids + '&fieldset=' + fieldset + '&language=' + language + '&country=' + country + '&currency=' + currency + '&c=' + company
      , itemDetails = jQuery.ajax(search);

      // Perform the search when called
      return itemDetails
    }

  , listReviews: function ()
    {
      var self = this;
      var collection = new CollectionView();
      var view = new ListView
      ({
        collection: collection
      , application: this.application
      });

      collection.fetch().done(function()
      {
        // Generate an array of item details using itemDetails and the collection
        var arr = self.itemDetails(collection);

        // Create a promise
        jQuery.when(arr).done(function(result)
        {
          // Loop through every item in the collection
          for (var i = 0; i < collection.models.length; i++)
          {
            // Loop through every item in search API request
            for (var j = 0; j < result.items.length; j++)
            {
              // Check to see if it matches
              if (collection.models[i].attributes.itemid == result.items[j].internalid)
              {
                // If it does, merge the search data into the collection data
                Object.assign(collection.models[i].attributes,result.items[j]);
              }
            }
          }
        })
        .then(function()
        {
          // Once we've done all that, render the view
          view.showContent();
        });
      });
    }
  })
});