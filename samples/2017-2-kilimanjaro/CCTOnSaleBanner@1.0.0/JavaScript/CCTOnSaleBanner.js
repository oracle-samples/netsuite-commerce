// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('CCTOnSaleBanner'
, [
    'CCTOnSaleBanner.View'
  ]
, function
  (
    View
  )
{
  'use strict';

  return {
    mountToApp: function (application)
    {
      application.getComponent('CMS').registerCustomContentType({
        id: 'sc_cct_onsale_banner'
      , view: View
      });
    }
  }
});