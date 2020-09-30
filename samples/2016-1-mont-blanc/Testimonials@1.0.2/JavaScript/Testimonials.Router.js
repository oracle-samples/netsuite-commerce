// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('Testimonials.Router'
, [
    'Testimonials.Form.View'
  , 'Testimonials.Model'
  , 'Backbone'
  ]
, function TestimonialsFormRouter(
    FormView
  , Model
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
      var model = new Model();
      var view = new FormView({
        application: this.application
      , model: model
      });

      view.showContent();
    }
  });
});