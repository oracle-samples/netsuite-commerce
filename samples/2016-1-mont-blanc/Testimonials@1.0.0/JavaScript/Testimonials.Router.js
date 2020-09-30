// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('Testimonials.Router'
, [
    'Testimonials.Form.View'
  , 'Backbone'
  ]
, function TestimonialsFormRouter(
    FormView
  , Backbone
  )
{
  'use strict';

  return Backbone.Router.extend({

    routes: {
      'testimonials/new': 'newTestimonial',
      'testimonials/new?*options': 'newTestimonial'
    }

  , initialize: function initialize(application) {
      this.application = application;
    }

  , newTestimonial: function newTestimonial() {
      var view = new FormView({
        application: this.application
      });

      console.log('newTestimonial function called');

      view.showContent();
    }
  });
});