// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('MyReviews'
, [
    'MyReviews.Router'
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
    MenuItems: function()
    {
      if (Configuration.get('myreviews.isEnabled'))
      {
        return {
          id: 'myreviews'
        , parent: 'orders'
        , name: _('My Reviewed Products').translate()
        , url: 'myreviews'
        , index: 5
        }
      }
    }

  , mountToApp: function(application)
    {
      // remember to enable this functionality in the backend!
      if (Configuration.get('myreviews.isEnabled'))
      {
        return new Router(application);
      }
    }
  }
});