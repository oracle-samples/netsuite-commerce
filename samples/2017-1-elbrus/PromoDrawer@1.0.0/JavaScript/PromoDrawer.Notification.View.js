// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('PromoDrawer.Notification.View'
, [
    'Backbone'
  , 'jQuery'
  , 'promodrawer_notification.tpl'
  ]
, function
  (
    Backbone
  , jQuery
  , promodrawerNotificationTpl
  )
{
  'use strict';

  return Backbone.View.extend({
    template: promodrawerNotificationTpl

  , events:
    {
      'click .promodrawer-notification-icon': 'toggleDrawer'
    }

  , toggleDrawer: function()
    {
      jQuery('.promodrawer-drawer').toggleClass('open');
      jQuery.cookie('readPromoNotifications1', true, {expires: 30, path: '/' });
      jQuery('.promodrawer-notification-icon').removeClass('unread');
    }

  , getContext: function()
    {
      return {
        unreadNotifications: !jQuery.cookie('readPromoNotifications1')
      }
    }
  });
});