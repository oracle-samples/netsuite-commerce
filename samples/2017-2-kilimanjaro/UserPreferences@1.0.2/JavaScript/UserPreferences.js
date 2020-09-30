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

  return {
    mountToApp: function (application)
    {
      return new UserPreferencesRouter(application);
    }
  }
});