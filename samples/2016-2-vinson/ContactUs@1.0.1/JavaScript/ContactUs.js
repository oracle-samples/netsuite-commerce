// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('ContactUs'
, [
    'ContactUs.Router'
  , 'SC.Configuration'
  ]
, function
  (
    Router
  , Configuration
  )
{
  'use strict';

  return {
    mountToApp: function(application)
    {
      // This is a basic way of only enabling functionality if it has been enabled: get the config option from the backend and if it's set to true, then create a router.
      var enabled = Configuration.get('contactUs.enabled');

      if (enabled)
      {
        return new Router(application);
      }
    }
  }
});