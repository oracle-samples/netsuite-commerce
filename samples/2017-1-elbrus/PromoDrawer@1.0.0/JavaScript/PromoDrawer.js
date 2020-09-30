// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('PromoDrawer',
[
  'Header.View'
, 'PromoDrawer.Drawer.View'
, 'PromoDrawer.Notification.View'
, 'PluginContainer'
], function
(
  HeaderView
, DrawerView
, NotificationView
, PluginContainer
)
{
  'use strict';

  HeaderView.prototype.preRenderPlugins = HeaderView.prototype.preRenderPlugins || new PluginContainer();

  HeaderView.prototype.preRenderPlugins.install
  ({
    name: 'PromoDrawerDrawer'
  , execute: function ($el, view)
    {
      $el
        .find('.header-subheader')
        .before('<div class="promodrawer-drawer" data-view="PromoDrawerDrawer"></div>');
      return $el
    }
  });

  HeaderView.prototype.preRenderPlugins.install
  ({
    name: 'PromoDrawerNotification'
  , execute: function ($el, view)
    {
      $el
        .find('.header-menu-cart')
        .after('<div class="promodrawer-notification" data-view="PromoDrawerNotification"></div>');
      return $el
    }
  });

  HeaderView.prototype.childViews.PromoDrawerDrawer = function()
  {
    return new DrawerView
  };

  HeaderView.prototype.childViews.PromoDrawerNotification = function()
  {
    return new NotificationView
  };
});