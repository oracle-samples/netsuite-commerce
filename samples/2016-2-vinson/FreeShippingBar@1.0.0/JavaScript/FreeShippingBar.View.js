// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('FreeShippingBar.View'
, [
    'Backbone'
  , 'SC.Configuration'
  , 'free_shipping_bar.tpl'
  ]
, function (
    Backbone
  , Configuration
  , free_shipping_bar_tpl
  )
{
  'use strict';

  return Backbone.View.extend({

    template: free_shipping_bar_tpl

  , getContext: function getContext()
    {
      var summary = this.model.get('summary')
      , config = Configuration.get('freeshippingbar')

      , subtotal = summary.subtotal
      , threshold = config.threshold.usd
      , difference = +(threshold - subtotal).toFixed(2)
      , diffpc = (subtotal / threshold * 100) + '%'

      , message = function message() {
          if (difference > 0) {
            return 'Add \$' + difference + ' more to your cart to get free shipping!'
          } else {
            return 'Congratulations, you qualify for free shipping!'
          }
        };

      return {
        message: message
      , diffpc: diffpc
      }
    }
  });
});