// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('UserPreferences.List.View'
, [
    'Backbone'
  , 'user_preferences_list.tpl'
  ]
, function
  (
    Backbone
  , user_preferences_list_tpl
  )
{
  'use strict';

  return Backbone.View.extend({
    template: user_preferences_list_tpl

  , getContext: function ()
    {
      return {
        message: 'Hello world! 🌍👋'
      }
    }
  })
});