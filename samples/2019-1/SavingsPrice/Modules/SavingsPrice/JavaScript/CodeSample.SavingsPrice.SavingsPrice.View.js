// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

// This view is only required if you're adding a new child view, and not adding new properties to the view's context object
define('CodeSample.SavingsPrice.SavingsPrice.View'
, [
    'Backbone'
  , 'underscore'
  , 'codesample_savingsprice.tpl'
  ]
, function
  (
    Backbone
  , _
  , codesample_savingsprice_tpl
  )
{
  'use strict';

  return Backbone.View.extend({
    template: codesample_savingsprice_tpl

  , initialize: function initialize (options)
    {
      this.application = this.application || options.application;
      this.model = this.model || this.application.getLayout().getCurrentView().model;
      this.model.on('change', this.render, this);
    }

  , getContext: function getContext ()
    {
      // This block is borrowed from ProductViews.Price.View, which is one of the reasons why I am not in favour of using a separate view as the customization method
      var price_object = this.model.getPrice()
    , showSavingsPrice = !!(price_object.min && price_object.max)
      ? price_object.max.price < price_object.compare_price
      : price_object.price < price_object.compare_price;

      return {
        savingsPrice: _.formatCurrency(price_object.compare_price - price_object.price)
      , savingsPricePercentage: Math.floor((1-(price_object.price / price_object.compare_price)) * 100) + '%'
      }
    }
  })
})