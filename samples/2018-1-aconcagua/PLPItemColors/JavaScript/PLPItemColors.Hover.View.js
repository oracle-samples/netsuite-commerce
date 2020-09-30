// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('PLPItemColors.Hover.View'
, [
    'plp_itemcolors_hover.tpl'

  , 'underscore'
  ]
, function
  (
    plp_itemcolors_hover_tpl

  , _
  )
{
  'use strict';

  return Backbone.View.extend({
    template: plp_itemcolors_hover_tpl

    // If you've worked with CCTs before, you'll know that when we add a CCT to a page, we can provide it with data about the place it's being added to. In our case, we want data about the individual item whose cell we are adding our view to. By using `contextDataRequest`, we will get a copy of the item model that will be available to use via `this.contextData.item()`.
  , contextDataRequest: ['item']

  , getItemColors: function getItemColors ()
    {
      // Create some useful variables for shorthanding
      var itemOptionFields = this.contextData.item().itemoptions_detail.fields
      // `media`` is used in part of my site's image naming convention, which causes an additional nested object -- your site's may not be organized this way
      , itemImagesDetailsMedia = this.contextData.item().itemimages_detail.media
      , thumbnail = this.contextData.item().keyMapping_thumbnail.url
      , self = this

      // _.find() goes through every item in a list (ie object in the collection) and returns the first one that matches the conditions we set
      // In our example, we're going through every item option for the current item and then looking for the one we associate with different colors; when it finds it, it'll stop and return it
      // Note that we attach `.values` to the end: this will return all of the colors themselves
      var itemColors = _.find(itemOptionFields, function (field)
      {
        return field.internalid == self.options.customColorId
      }).values;

      // Simplify the object using `_.map()`, which creates a new object out of the old one in the key-value pairs we specify. The downside to this is that we skip over 'fake' values (ie the auto-generated ones that say 'please select a value') we end up with an undefined value occupying a space in the final array. The simplest way to handle this is to use `_.compact()`, which removes 'falsy' values (eg `undefined` and `null`)
      itemColors = _.compact(_.map(itemColors, function (color)
      {
        // Sometimes values called 'please select a value' are included to aid dropdowns, but we don't want those so we check to see if the color has an internalid
        // Note that this is why we use `compact()` - this conditional will return an undefined value, which we don't want and `compact()` will remove them
        if (color.internalid)
        {
          return {
            color: color.label
          , url: color.url
          }
        }
      }));

      // Now that we have our list of colors and their urls, there is one bit of data left: a representative image. For this, we're going to go through each one and then look up the first image URL
      // Note that we're going to use the `resizeImage` Handlebars helper in the template to change the size – if you haven't got `tinyThumb` set up (100x100px) then I recommend you do so
      _.each(itemColors, function (color)
      {
        // If you're unfamiliar, this is a ternary operator (the bit with the `?` and `:`) and its used as a shorthand in JavaScript to set a variable's value based on the outcome of a conditional statement
        // `var myvar = <conditional statement> ? <value if true> : <value if false>`
        // What we're doing is checking to see if object exists before we try to pull values from it (because it'll throw an error otherwise)
        // Ie, if the object is available, set it to the url of the first child object, otherwise set it as an empty string
        var image = itemImagesDetailsMedia[color.color] && itemImagesDetailsMedia[color.color].urls ? itemImagesDetailsMedia[color.color].urls[0].url : ''

        color.image = image;
      });

      // Finally, we can do some clean-up to remove the default thumbnail from the list of alternative colors – again, this is determined by a configuration setting so you can negate it if you haven't got it set up yet
      // For this we're using `_.reject()`, which is another cool Underscore method that is essentially the opposite of `_.find`: it goes through the list until it finds a match based on our criteria, and then returns everything in the list except for the thing that matches
      if (this.options.rejectDefault)
      {
        itemColors = _.reject(itemColors, function (color)
        {
          return color.image == thumbnail;
        });
      }

      return itemColors
    }

  , getContext: function getContext ()
    {
      return {
        itemColors: this.getItemColors()
      }
    }
  })
});