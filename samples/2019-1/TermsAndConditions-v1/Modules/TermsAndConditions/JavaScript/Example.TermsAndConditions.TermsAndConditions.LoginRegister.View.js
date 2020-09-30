// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('Example.TermsAndConditions.TermsAndConditions.LoginRegister.View'
, [
    'Backbone'
  , 'jQuery'
  , 'example_termsandconditions_termsandconditions_loginregister.tpl'
  ]
,  function
  (
    Backbone
  , jQuery
  , example_termsandconditions_termsandconditions_loginregister_tpl
  )
{
  'use strict';

  return Backbone.View.extend({
    template: example_termsandconditions_termsandconditions_loginregister_tpl

  , events:
    {
      // Optional UX feature: when a user clicks on label/input it will trigger the built-in function to hide any errors attached to this element (see ErrorManagement.js)
      'click #login-register-register-custentity_tsandcs': 'hideError'
    }

  , initialize: function ()
    {
      var self = this;

      this.options.LoginRegisterPage.on('beforeRegister', function (formFields)
      {
        // Unchecked checkboxes are not included in the data object, so we need to check they exist
        if (!formFields.custentity_tsandcs)
        {
          // All views have the ability to render error messages via ErrorManagement.js.
          // By default, they will automatically find the nearest alert-placeholder, so our template needs one.
          self.showError(_.translate('You must accept the terms and conditions to register an account'))
          return jQuery.Deferred().reject()
        }
      });
    }
  });
});