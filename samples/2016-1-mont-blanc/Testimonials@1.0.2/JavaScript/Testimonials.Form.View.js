// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('Testimonials.Form.View'
, [
    'testimonials_form.tpl'
  , 'GlobalViews.Message.View'
  , 'GlobalViews.StarRating.View'
  , 'Backbone'
  , 'Backbone.FormView'
  , 'Backbone.CompositeView'
  , 'jQuery'
  , 'underscore'
  ]
, function TestimonialsFormView(
    testimonialsFormTpl
  , GlobalViewsMessageView
  , GlobalViewsStarRatingView
  , Backbone
  , BackboneFormView
  , BackboneCompositeView
  , jQuery
  , _
  )
{
  'use strict';

  return Backbone.View.extend({

    showSuccessMessage: false

  , template: testimonialsFormTpl

  , title: _('New Testimonial').translate()

  , bindings: {
      '[name="text"]': 'text'
    , '[name="title"]': 'title'
    , '[name="writerName"]': 'writerName'
    }

  , events: {
      'submit form': 'saveForm'
    , 'rate [data-toggle="rater"]': 'rate'
    }

  , initialize: function initialize() {
      this.model.on('sync', jQuery.proxy(this, 'showSuccess'));
      this.initializeModel();
      BackboneCompositeView.add(this);
      BackboneFormView.add(this);
    }

  , getBreadcrumbPages: function getBreadcrumbPages() {
      return [{
        text: this.title
      , href: '/testimonials/new'
      }];
    }

  , childViews: {
      'Testimonial.StarRating': function TestimonialStarRating() {
        return new GlobalViewsStarRatingView({
          showRatingCount: false
        , isWritable: true
        , value: this.model.get('rating')
        , label: 'Rating'
        , name: 'rating'
        });
      }
    }

  , showContent: function showContent() {
      var self = this;
      this.options.application.getLayout().showContent(this).done(
        function afterShowContent() {
          self.$('[data-toggle="rater"]').rater();
        }
      );
    }

  , initializeModel: function initializeModel() {
      this.model.clear().set('rating', 0);
    }

  , showSuccess: function showSuccess() {
      this.initializeModel();
      this.showContent();
      this.showConfirmationMessage(this.successMessage, true);
    }

  , rate: function rate(e, rater) {
      this.model.set(rater.name, rater.value);
    }

  , successMessage: _('Thank you for your testimonial. We\'ll review and publish it soon.').translate()
  });
});