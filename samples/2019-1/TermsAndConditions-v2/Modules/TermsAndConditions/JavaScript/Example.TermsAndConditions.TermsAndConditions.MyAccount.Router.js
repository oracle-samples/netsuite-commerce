// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('Example.TermsAndConditions.TermsAndConditions.MyAccount.Router'
, [
    'Backbone'
  , 'Example.TermsAndConditions.TermsAndConditions.MyAccount.View'
  ]
, function
  (
    Backbone
  , TermsAndConditionsMyAccountView
  )
{
  'use strict';

  return Backbone.Router.extend({
    routes:
    {
      'update-terms-and-conditions': 'termsView'
    }

  , initialize: function (container)
    {
      this.application = container;
      this.UserProfile = container.getComponent('UserProfile');
    }

  , termsView: function ()
    {
      var self = this;
      this.UserProfile.getUserProfile().then(function (profileData)
      {
        var view = new TermsAndConditionsMyAccountView
        ({
          application: self.application
        , UserProfile: profileData
        })

        view.showContent();
      });
    }
  })
});