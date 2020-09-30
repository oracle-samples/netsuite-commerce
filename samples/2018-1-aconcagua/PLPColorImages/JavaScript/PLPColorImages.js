// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

// This functionality listens for when a shopper has selected a color option and then swaps the thumbnail images for the color they have selected

define('PLPColorImages'
, [
    // The extensibility API is so cool you don't even need dependencies sometimes
  ]
, function
  (

  )
{
  'use strict';

  return {
    mountToApp: function mountToApp (container)
    {
      var PLP = container.getComponent('PLP')
    , Environment = container.getComponent('Environment')
    , Layout = container.getComponent('Layout')
      // The ID for color filters – we're pulling it from the config record but you could hardcode it if you want
      // Note that the customColorId we're specifying here is the one used by search filters, rather than the one used for item options
    , customColorId = Environment.getConfig('plpColorImages.customColorId') ? Environment.getConfig('plpColorImages.customColorId') : '';

      // We need this configuration setting to be set before this functionality will work, so if it's not been set then we prevent the module from doing anything. To test this locally without deploying it first, you'll need to comment this out or change it to true
      if (customColorId)
      {
        // So, technically Facets.ItemCell.View is not a PLP view, so we have to use the generic methods afforded to us by the layout component – no big deal
        Layout.addToViewContextDefinition('Facets.ItemCell.View', 'thumbnail', 'string', function thumbnail (context)
        {
          // Create a copy of the model so that it's easy to query the current item's data from it
          var model = _.find(PLP.getItemsInfo(), function (item)
          {
            return item.internalid == context.itemId
          })
          // Keep the original thumbnail just in case we don't want to change it
        , thumbnail = context.thumbnail
          // Get the images attached to the current model
        , images = model.itemimages_detail ? model.itemimages_detail : ''
          // Next get the active filters and check to see if anyone them are colors by matching them against our specified color ID
          // Note that the order that the shopper selects color refinements is not stored, they're always returned from the API in alphabetical order – this is fine if you only allow one color at a time, but problematic if you don't (ie, which one should you show?)
        , filters = _.find(PLP.getFilters(), function (filter)
          {
            return filter.id == customColorId
          });

          // While you should have images for every color all the time, sometimes there are mistakes and you don't, so it's important that there is at least one change we can make
          if (images && images.media && filters && filters.value[0] && images.media[filters.value[0]])
          {
            // Because we don't have any sort of meaningful way of knowing which color we should prioritize, there are a few approaches to how we can set the thumbnail and URL:
            // 1) A loop that goes through every color, overwriting the thumbnail/URL until it runs out of colors. This will therefore set the thumbnail/URL based on the last one alphabetically (eg, orange > blue > black).
            // 2) A loop that first checks whether we've done this once before, aborting if we have. This will therefore set the thumbnail/URL to the first one alphabetically (eg black > blue > orange)
            // For the purpose of this tutorial, I've implemented both independently: the first one will be used for the thumbnail, the second will be used for the URL.
            _.each(filters.value, function (filter)
            {
              if (images.media[filter] && images.media[filter].urls)
              {
                thumbnail = images.media[filter].urls[0]
              }
            });
          }

          return thumbnail
        });

        // We can use similar methods to also change the link URL of the item so that it pre-selects the color option
        Layout.addToViewContextDefinition('Facets.ItemCell.View', 'url', 'string', function url (context)
        {
          // BTW we can't set this outside of the context of this method because this information won't be available there... so we have to do this again
          var model = _.find(PLP.getItemsInfo(), function (item)
          {
            return item.internalid == context.itemId
          })

          // Same story with this
        , filters = _.find(PLP.getFilters(), function (filter)
          {
            return filter.id == customColorId
          })

          // Keep a copy of the existing URL in case it doesn't change
        , existingUrl = context.url

          // Get all available options for the current item (eg color, size)
        , fields = model.itemoptions_detail ? model.itemoptions_detail.fields : ''

          // Find the color one by matching the source of the option values to our specified custom color ID
        , fieldColors = fields ? _.find(fields, function (option)
          {
            return option.sourcefrom == customColorId
          }) : ''

        , fieldColorValues = fieldColors ? fieldColors.values : '';

          if (fieldColorValues && filters && filters.value[0])
          {
            // This loop is different than the one above; check the comments there to find out why
            var url = '';

            // Find the specific color by matching it against the current filter
            _.each(filters.value, function (filter)
            {
              if (!url)
              {
                url = _.find(fieldColorValues, function (value)
                {
                  return value.label == filter
                })
              }
            });

            /* If you want to match the behavior of the above images, then you could implement something like this (this way the URL colors match the color of the thumbnails)
            _.each(fieldColorValues, function (value)
            {
              _.each(filters.value, function (filter)
              {
                if (value.label == filter)
                {
                  url = value
                }
              })
            });
            */

            // If we have a new URL, return that; otherwise, just return the old one
            if (url)
            {
              return url.url
            }
          }
          else
          {
            return existingUrl
          }
        });
      }
    }
  }
});


