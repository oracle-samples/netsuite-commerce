// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define(
  'CustomFacetViews'
, [
    'Facets.Browse.View'
  , 'jQuery'
  , 'facets_item_cell_portrait.tpl'
  ]
, function (
    BrowseView
  , jQuery
  )
{
  'use strict';

  _.extend(BrowseView.prototype,
  {
    showContent: _.wrap(BrowseView.prototype.showContent, function(fn)
    {
      fn.apply(this, _.toArray(arguments).slice(1));
      var displayOption = this.translator.options.display;

      if (displayOption === 'portrait')
      {
        self.jQuery('.facets-facet-browse-items').addClass('facets-facet-browse-portrait');
      }
    })
  });
});