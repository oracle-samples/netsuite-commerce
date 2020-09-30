// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

// Useful variables
var limit = 100 // The maximum results we can get back at once from the API is 100 items, so we force it to that value
, offset = 0 // This is to create pages in the results, so we can step through the results
, itemCount = 0
, noImages = [] // Where we're going to store the results

// Build the URL
, locale = SC.ENVIRONMENT.currentLanguage.locale.split("_")
, url = SC.ENVIRONMENT.siteSettings.touchpoints.home
+ '/api/items'
+ '?q=' + '' // We're providing no query string so this will return all results, although you could use it and narrow down results
+ '&limit=' + limit
+ '&fields=' + 'itemid,itemimages_detail,itemoptions_detail'
+ '&timestamp=' + Date.now();

// After the call is made, we will use this function to process the results
function processResults (data)
{
  // Iterate all items returned
  data.items.forEach(function (item)
  {
    // First does a simple check: are *any* images? No, then push that to the array
    if (_.isEmpty(item.itemimages_detail))
    {
      noImages.push(item.itemid + ' (all colors)')
    }
    // Otherwise, move on to a more complicated check
    else
    {
      // Iterate all item options
      item.itemoptions_detail.fields && item.itemoptions_detail.fields.forEach(function (field)
      {
        // Find the one we use for color
        if (field.label == 'Color')
        {
          // Iterate over every color value
          field.values.forEach(function (value)
          {
            // First check that it's a legitimate color
            // Then try to call the object that for that color value, if it returns `undefined` then we know it's missing (so push that item and its color to the array)
            if (value.internalid && !item.itemimages_detail.media[value.label])
            {
              noImages.push(item.itemid + ' (' + value.label + ')')
            }
          });
        }
      });
    }
  });
}

// The wrapper function
// We need something like this to handle sequential repeated calls to the API
// For performance reasons, we're going use callbacks to make them operate synchronously
function findMissingImages (preserveCount, oS)
{
  // If no parameters are provided, we can assume that this is the first time it's being run
  itemCount = preserveCount ? itemCount : 0;
  offset = oS ? oS : 0;
  noImages = preserveCount ? noImages : [];

  // Perform the search
  jQuery.ajax(url + '&offset=' + offset)

  // The first callback provides console feedback, increases the offset, and calls the processor function
  .then(function (data)
  {
    // We need the item count to know whether we need to make further API calls, and for status reporting
    itemCount = data.total;

    // (Optional console feedback)
    min = offset + 1; // Computers start at 0; humans at 1
    max = offset + limit > itemCount ? itemCount : offset + limit;
    console.log('Processing ' + itemCount + ' items: ' + min + ' to ' + max + ' done.');

    // Increase the offset count
    offset = offset + limit;

    // Call the data processor
    processResults(data);
  })

  // The second callback decides whether we need to call the API again for the next page of results
  .then(function ()
  {
    if (itemCount > offset)
    {
      // If we do, we preserve the current item count and provide the position from which to start from
      findMissingImages(true, offset)
    }
    else
    {
      // If we don't, we dump the results into the console
      console.log('Search complete: ' + noImages.length + ' items with missing images', noImages)
    }

  });
}