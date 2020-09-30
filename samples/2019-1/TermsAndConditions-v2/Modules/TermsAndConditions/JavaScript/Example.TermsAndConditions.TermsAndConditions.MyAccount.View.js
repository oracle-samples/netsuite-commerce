// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('Example.TermsAndConditions.TermsAndConditions.MyAccount.View'
, [
    'Backbone'
  , 'example_termsandconditions_termsandconditions_myaccount.tpl'
  ]
, function
  (
    Backbone
  , example_termsandconditions_termsandconditions_myaccount_tpl
  )
{
  'use strict';

  return Backbone.View.extend({
    template: example_termsandconditions_termsandconditions_myaccount_tpl

  , getContext: function ()
    {
      var termsAndConditions = _.find(this.options.UserProfile.customfields, function(field)
      {
        return field.id == 'custentity_tsandcs'
      });

      return {
        termsAndConditions: !!termsAndConditions
      }
    }
  })
});