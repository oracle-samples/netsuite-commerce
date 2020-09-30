// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('Testimonials.Testimonial.View'
, [
    'testimonials_testimonial.tpl'
  , 'GlobalViews.StarRating.View'
  , 'Backbone'
  , 'Backbone.CompositeView'
  ]
, function TestimonialsTestimonialView(
    testimonialsTestimonialTpl
  , GlobalViewsStarRatingView
  , Backbone
  , BackboneCompositeView
  )
{
  'use strict';

  return Backbone.View.extend({

    template: testimonialsTestimonialTpl

  , initialize: function initialize() {
      BackboneCompositeView.add(this);
    }

  , childViews: {
      'StarRating': function() {
        return new GlobalViewsStarRatingView({
          model: this.model
        , showRatingCount: false
        });
      }
    }

  , getContext: function getContext() {
      return {
        createdDate: this.model.get('createdDate')
      , writerName: this.model.get('writerName')
      , title: this.model.get('title')
      , text: this.model.get('text')
      };
    }
  });
});