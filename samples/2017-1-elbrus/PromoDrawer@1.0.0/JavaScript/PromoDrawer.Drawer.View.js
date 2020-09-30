// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('PromoDrawer.Drawer.View'
, [
    'Backbone'
  , 'jQuery'
  , 'promodrawer_drawer.tpl'
  ]
, function
  (
    Backbone
  , jQuery
  , promodrawerDrawerTpl
  )
{
  'use strict';

  return Backbone.View.extend({
    template: promodrawerDrawerTpl

  , events:
    {
      'click .promodrawer-drawer-handle' : 'toggleDrawer'
    }

  , toggleDrawer: function()
    {
      jQuery('.promodrawer-drawer').toggleClass('open');
      jQuery.cookie('readPromoNotifications1', true, { expires: 30, path: '/' });
      jQuery('.promodrawer-notification-icon').removeClass('unread');
    }
  });
});