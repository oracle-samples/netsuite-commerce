// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('Example.TermsAndConditions.TermsAndConditions.Checkout'
, [
    'Example.TermsAndConditions.TermsAndConditions.LoginRegister.View'
  ]
, function
  (
    TermsAndConditionsLoginRegisterView
  )
{
  'use strict';

  return  {
    mountToApp: function mountToApp (container)
    {
      var LoginRegisterPage = container.getComponent('LoginRegisterPage');

      if (LoginRegisterPage)
      {
        LoginRegisterPage.addChildView('Register.CustomFields', function ()
        {
          return new TermsAndConditionsLoginRegisterView
          ({
          	LoginRegisterPage: LoginRegisterPage
          })
        });
      }
    }
  };
});
