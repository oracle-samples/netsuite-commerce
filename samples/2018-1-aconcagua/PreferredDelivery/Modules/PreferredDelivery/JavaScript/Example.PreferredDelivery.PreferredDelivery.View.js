// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

/*
  Note that this is for demonstration purposes only, it is not viable solution. There are a number of issues with this code, eg:
  - Clicking continue and then back causes the date not to be shown in the input (improper date format)
  - No validation (eg can pick dates in the past)
  - No button to remove date once one has been selected
*/
define('Example.PreferredDelivery.PreferredDelivery.View'
, [
    'Wizard.Module'

  , 'example_preferreddelivery_preferreddelivery.tpl'
  ]
, function (
    WizardModule

  , example_preferreddelivery_preferreddelivery_tpl
  )
{
  'use strict';

  // We have to use the Wizard.Module class because it is special for the checkout
  return WizardModule.extend({

    template: example_preferreddelivery_preferreddelivery_tpl

  , getContext: function getContext()
    {
      return {
        // We're going to use this to determine whether the shopper is either inputting details or reviewing them. This means we can reuse the template, showing an input for the main checkout step, and a paragraph tag for when they're reviewing before placing an order.
        isReview: this.step.step_url == 'review'
      };
    }
  });
});