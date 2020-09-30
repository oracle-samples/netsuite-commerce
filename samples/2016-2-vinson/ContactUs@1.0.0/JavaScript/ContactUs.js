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
      var enabled = Configuration.get('contactUs.enabled');

      if (enabled)
      {
        return new Router(application);
      }
    }
  }
});