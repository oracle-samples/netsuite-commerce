// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('PLPItemColors'
, [
    'PLPItemColors.Hover.View'
  ]
, function
  (
    PLPItemColorsHoverView
  )
{
  'use strict';

  return {
    mountToApp: function mountToApp (container)
    {
      var PLP = container.getComponent('PLP')
      // Environment component is new for Aconcagua R2; if you don't have this version, you will have to subsitute it for the correct SC.Configuation syntax
    , Environment = container.getComponent('Environment')
    , customColorId = Environment.getConfig('plpItemColors.customColorId')
    , rejectDefault = Environment.getConfig('plpItemColors.rejectDefault');

      // We need this configuration setting to be set before this functionality will work, so if it's not been set then we prevent the module from doing anything. To test this locally without deploying it first, you'll need to comment this out
      if (customColorId)
      {
        // We want to add a child view to the item cell (Facets.ItemCell.View) but we can't do that. But, we can use a child view that already exists, and this allows our content to be pushed into it. `addChildView` is for simple additions, but you can use `addChildViews()` for more control (eg controlling the index).
        PLP.addChildView('ItemDetails.Options', function ()
        {
          return new PLPItemColorsHoverView(
          {
            customColorId: customColorId
          , rejectDefault: rejectDefault
          })
        });
      }
    }
  }
});