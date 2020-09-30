// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('Example.SCCCTEncourage.Encourage'
, [
    'Example.SCCCTEncourage.Encourage.View'
  ]
, function
  (
    EncourageView
  )
{
  'use strict'

  return {
    mountToApp: function mountToApp (application)
    {
      // Normal way is to pass it as an option to the view
      // var pdp = application.getComponent('PDP');

      // For console debugging purposes only
      // SC.PDP = application.getComponent('PDP');

      // However, we can't pass this via registerCustomContentType(), so we have to prototype the view and add it as a value

      EncourageView.prototype.application = application;

      application.getComponent('CMS').registerCustomContentType({
        id: 'cct_example_sccctencourage'
      , view: EncourageView
      });
    }
  }
});