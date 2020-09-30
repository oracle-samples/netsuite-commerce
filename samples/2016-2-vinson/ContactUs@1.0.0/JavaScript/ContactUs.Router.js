// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('ContactUs.Router'
, [
    'Backbone'
  , 'ContactUs.Model'
  , 'ContactUs.View'
  ]
, function
  (
    Backbone
  , Model
  , View
  )
{
  'use strict';

  return Backbone.Router.extend({
    routes:
    {
      'contact-us': 'contactUs'
    }

  , initialize: function(application)
    {
      this.application = application;
    }

  , contactUs: function(options)
    {
      var view = new View({
        application: this.application
      , model: new Model()
      });

      view.showContent();
    }
  });
});