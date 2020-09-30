// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('Example.RemoveAll.RemoveAll'
, [
    'Example.RemoveAll.RemoveAll.View'
  ]
, function
  (
    RemoveAllView
  )
{
  'use strict';
  return  {
    mountToApp: function mountToApp (container)
    {
      // We need two components: one to add a view, and the other to show the modal dialog
      // Pre-Aconcagua sites can extend the childViews object prototype of Cart.Detailed.View – make sure you pass the application as a parameter
      var Cart = container.getComponent('Cart')
    , Layout = container.getComponent('Layout')

      if (Cart && Layout)
      {
        Cart.addChildViews(Cart.CART_VIEW,
        {
          'Item.ListNavigable': // Adding it this child view means it will only show if there >0 items in the cart
          {
            'RemoveAll':
            {
              childViewIndex: 99 // Renders the child view at the bottom of the page; set it to 1 to put it at the top
            , childViewConstructor: function ()
              {
                return new RemoveAllView
                ({
                  Layout: Layout
                })
              }
            }
          }
        });
      }
    }
  };
});