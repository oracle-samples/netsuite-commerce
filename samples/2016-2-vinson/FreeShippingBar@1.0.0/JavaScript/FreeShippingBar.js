// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('FreeShippingBar'
, [
    'Cart.Summary.View'
  , 'FreeShippingBar.View'
  , 'SC.Configuration'
  ]
, function (
    CartSummaryView
  , FreeShippingBarView
  , Configuration
  )
{
  'use strict';

  return {

    isEnabled: function isEnabled() {
      return Configuration.get('freeshippingbar.isEnabled');
    }

  , mountToApp: function(application)
    {
      if (this.isEnabled())
      {
        CartSummaryView.prototype.childViews.FreeShippingBar = function()
        {
          return new FreeShippingBarView({
            model: this.model
          })
        }
      }
    }
  }
});