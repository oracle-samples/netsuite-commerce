// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('Testimonials.Carousel.View'
, [
    'Testimonials.Testimonial.View'
  , 'testimonials_carousel.tpl'
  , 'Backbone'
  , 'Backbone.CompositeView'
  , 'Backbone.CollectionView'
  , 'underscore'
  , 'jQuery'
  , 'Utils'
  ]
, function TestimonialsCarouselView(
    TestimonialView
  , testimonialsCarouselTpl
  , Backbone
  , BackboneCompositeView
  , BackboneCollectionView
  , _
  , jQuery
  )
{
  'use strict';

  return Backbone.View.extend({

    template: testimonialsCarouselTpl

  , initialize: function initialize() {
      BackboneCompositeView.add(this);
      this.listenTo(this.collection, 'sync', _.debounce(jQuery.proxy(this.render, this)));
      this.collectionPromise = this.collection.fetch();

      var self = this;
      this.on('afterCompositeViewRender', function afterViewRender() {
        _.initBxSlider(self.$('[data-slider]'), {
          slideSelector: 'div.testimonials-testimonial'
        , mode: 'fade'
        , pager: false
        , auto: false
        });
      });
    }

  , childViews: {
      'Testimonials.Collection': function TestimonialCollectionChildView() {
        return new BackboneCollectionView({
          application: this.application
        , collection: this.collection
        , childView: TestimonialView
        , viewsPerRow: 1
        , childViewOptions: {
            application: this.application
          }
        });
      }
    }

  , getContext: function getContext() {
      return {
        isReadyToRender: this.collectionPromise.state() === 'resolved'
      };
    }
  });
});