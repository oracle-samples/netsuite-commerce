// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('Example.PreferredDelivery.PreferredDelivery'
, [
    'Example.PreferredDelivery.PreferredDelivery.View'
  ]
, function
  (
    PreferredDeliveryContainerView
  )
{
  'use strict';

  return  {
    mountToApp: function mountToApp (container)
    {
      var checkout = container.getComponent('Checkout');

      checkout.addModuleToStep(
      {
        step_url: 'opc' // the place you want to add it to, think of this like an ID. You can log the step or group info to the console to find the one you're looking for
      , module: {
          id: 'PreferredDeliveryView' // the ID you want to give it
        , index: 6 // its place in the order of modules (if it matches an existing one, it is pushed down)
        , classname: 'Example.PreferredDelivery.PreferredDelivery.View' // the name of the thing you want to render (ie the value in the view's define statement)
        //, options: {container: '#wizard-step-content'} // where you're going to render it -- by default it will render in the main content area unless you specify a different container
        }
      });

      checkout.addModuleToStep(
      {
        step_url: 'review'
      , module: {
          id: 'PreferredDeliveryView'
        , index: 99
        , classname: 'Example.PreferredDelivery.PreferredDelivery.View'
        }
      });
    }
  };
});
