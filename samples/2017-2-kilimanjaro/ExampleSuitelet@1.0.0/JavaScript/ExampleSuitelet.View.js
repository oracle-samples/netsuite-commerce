// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('ExampleSuitelet.View'
, [
    'Backbone'

  , 'example_suitelet.tpl'
  ]
, function
  (
    Backbone

  , Template
  )
{
  'use strict'

  return Backbone.View.extend ({
    getContext: function ()
    {
      var subsidiary = this.model.get('subsidiary')
      , country = this.model.get('country')

      return {
        subsidiary: subsidiary[0].text
      , country: country[0].text
      , city: this.model.get('city')
      , phone: this.model.get('phone')
      , mobile: this.model.get('mobilephone')
      }
    }

  , initialize: function (options)
    {
      this.options = options;
      this.application = options.application;
    }

  , template: Template
  });
});