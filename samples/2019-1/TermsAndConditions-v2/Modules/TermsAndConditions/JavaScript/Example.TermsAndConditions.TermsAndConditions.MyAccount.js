// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('Example.TermsAndConditions.TermsAndConditions.MyAccount'
, [
    'Example.TermsAndConditions.TermsAndConditions.MyAccount.Router'
  ]
, function
  (
    TermsAndConditionsMyAccountRouter
  )
{
  'use strict';

  return {
    mountToApp: function mountToApp (container)
    {
      var MyAccountMenu = container.getComponent('MyAccountMenu');

      var termsAndConditionsGroupEntry = {
        id: 'termsandconditions'
      , groupid: 'settings'
      , index: 99
      , url: 'update-terms-and-conditions'
      , name: _.translate('Terms and Conditions')
      }

      MyAccountMenu.addGroupEntry(termsAndConditionsGroupEntry);

      return new TermsAndConditionsMyAccountRouter(container)
    }
  };
});
