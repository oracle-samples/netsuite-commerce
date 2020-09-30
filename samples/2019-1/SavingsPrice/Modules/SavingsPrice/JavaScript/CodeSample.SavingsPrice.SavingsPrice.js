// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

// Included in this is three different ways of implementing the same functionality.
// This is deliberate: I want to demonstrate the benefits and drawbacks of each method.
// See the switch below for morei nformation.

define('CodeSample.SavingsPrice.SavingsPrice'
, [
    'underscore' // Only required if you're using option 1
  , 'ProductViews.Price.View' // Only required if you're using option 2 or 3
  , 'PluginContainer' // Only require if you're using option 3
  , 'CodeSample.SavingsPrice.SavingsPrice.View'
  ]
, function
  (
    _
  , PriceView
  , PluginContainer
  , SavingsPriceView
  )
{
  'use strict';

  return {
    mountToApp: function mountToApp (container)
    {
      var PDP = container.getComponent('PDP');

      // Set to 1 if you want to use this an edit to your template
      // Set to 2 if you want to use a separate view and template
      // Set to 3 to use pre-extensibility customization methods
      // This is obviously just for demonstration purposes, don't include it in your final code
      var option = 2;

      if (PDP && option != 3)
      {
        if (option == 1)
        {
          PDP.addToViewContextDefinition('ProductViews.Price.View', 'savingsPrice', 'string', function (context)
          {
            return _.formatCurrency(context.comparePrice - context.price)
          });

          PDP.addToViewContextDefinition('ProductViews.Price.View', 'savingsPricePercentage', 'string', function (context)
          {
            // Note that using Math.floor eliminates decimal places and rounds down. If you require more precision, you can use something like toFixed(2) instead
            return Math.floor((1-(context.price / context.comparePrice)) * 100) + '%'
          });

          /*

          Add the following to product_views_price.tpl in the {{#if showComparePrice}} blocks:

          <p>{{translate 'You\'ll save $(0) per item ($(1))' savingsPrice savingsPricePercentage}}</p>

          */
        }

        else if (option == 2)
        {
          PDP.addChildView('Product.Price', function ()
          {
            return new SavingsPriceView({application: container})
          });
        }
      }

      else if (option == 3)
      {
        // This option is what you would do if you don't have access to the above two methods
        // The main customization is the modification of the price view prototype to add to the childViews object
        // Instead of adding a new child view, you could also just add new properties to the view's context object
        PriceView.prototype.childViews = PriceView.prototype.childViews || {}

        PriceView.prototype.childViews.SavingsPriceView = function ()
        {
          // One of the things that's quite different about the `addChildView()` method on components in the extensibility API, and adding new views directly to the `childViews` property of a view is anything you pass to the constructor in `addChildView()` gets added to the view instance's `options` object; whereas anything you add to the constructor of a view passed into `childViews` gets added automatically as those properties.
          // In other words, the following method lets us set the `application` and `model` properties directly, whereas we have to set them in the view file after passing them in as options.`
          return new SavingsPriceView
          ({
            application: container
            // Because we're extending the view object the scope of `this` gets set to the class itself, which means that we don't need to faff around trying to set it: we can just pass it on from the price view
          , model: this.model
          })
        }

        // The plugin container can be used to modify a view's template at various stages of compilation or rendering.
        PriceView.prototype.preRenderPlugins = PriceView.prototype.preRenderPlugins || new PluginContainer();

        PriceView.prototype.preRenderPlugins.install
        ({
          name: 'SavingsPriceContainer'
        , execute: function ($el, view)
          {
            $el
              .find('.product-views-price-old')
              .after('<div data-view="SavingsPriceView"></div>');
            return $el
          }
        });
      }
    }
  }
});