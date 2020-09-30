// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define(
  'RefinementStorer'
, [
    'Facets.FacetedNavigation.View'
  , 'SC.Configuration'
  ]
, function
  (
    FacetsFacetedNavigationView
  , Configuration
  )
{
  'use strict';

  // Extend a method in a view where we know what facets have been applied so that we can get at this information
  FacetsFacetedNavigationView.prototype.initialize = _.wrap(FacetsFacetedNavigationView.prototype.initialize, function wrappedInitialize(fn)
  {
    fn.apply(this, _.toArray(arguments).slice(1));

    // Here we're saving the facet data in session storage. You could use cookies or local storage if you want.
    // We're stringifying it because the web storage API doesn't like anything other than strings, so we need to convert our object
    sessionStorage.refinements = JSON.stringify(this.appliedFacets);
  });

  return {
    mountToApp: function mountToApp(application)
    {
      // Check to see: a) it's not a robot, b) we've refinements saved, and c) the functionality is enabled
      if (!SC.isPageGenerator() && sessionStorage.refinements && Configuration.refinementStorer.enabled)
      {
        // Use the extensibility API
        var pdp = application.getComponent('PDP');

        // Run this code after the content has been rendered
        pdp.on('afterShowContent', function(){
          // Get the stored refinements and the item's option details
          var refinements = JSON.parse(sessionStorage.refinements),
          itemOptions = pdp.getItemInfo().item.itemoptions_detail.fields;
          // Spin up the refinement loop
          for (var i in refinements)
          {
            // Spin up the item options loop
            for (var j in itemOptions)
            {
              // Compare the each refinement's type ID against the source of each item option
              if (refinements[i].id === itemOptions[j].sourcefrom)
              {
                // If there's match then go through each of that item option's values
                for (var k in itemOptions[j].values)
                {
                  // Compare the value of the refinement against the labels of those values
                  if (refinements[i].value === itemOptions[j].values[k].label)
                  {
                    // If there's a match then we can use the extensibility API to set the option using the current option type internal ID and the internal ID of current option value
                    pdp.setOption(itemOptions[j].internalid, itemOptions[j].values[k].internalid)
                  }
                }
              }
            }
          }
        });
      }
    }
  }
});
