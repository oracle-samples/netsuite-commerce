// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('ContactUs.View'
, [
    'Backbone'
  , 'Backbone.FormView'
  , 'contact_us.tpl'
  ]
, function
  (
    Backbone
  , BackboneFormView
  , contactUsTpl
  )
{
  'use strict';

  return Backbone.View.extend({
    events:
    {
      'submit form': 'saveForm'
    }

  , initialize: function(options)
    {
      this.options = options;
      this.application = options.application;

      BackboneFormView.add(this);
    }

  , template: contactUsTpl
  });
});