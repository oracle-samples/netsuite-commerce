// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('UserPreferences'
, [
    'UserPreferences.Router'
  ]
, function
  (
    UserPreferencesRouter
  )
{
  'use strict';

  // This is the entry point file. This is what loads when the module is loaded into the application for the first time. Everything to do with the module starts here.
  return {
    mountToApp: function (application)
    {
      // If your module has new pages to visit and routes to go to, then you will almost always return your router when the module is mounted to the application (ie initialized). However, not every module needs a router, so don't feel like you have to return a router if your new module has no routes.
      return new UserPreferencesRouter(application);
    }

    // As we are working within the confines of the account application, we have a nav available to us. This object lets us inject a new item into it.
  , MenuItems:
    {
      parent: 'settings'
    , id: 'userpreferenceslist'
    , name: 'User Preferences'
    , url: 'preferences'
    , index: 1
    }
  }
});