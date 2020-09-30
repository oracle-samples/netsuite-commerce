// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('Testimonials.Form.View'
, [
    'testimonials_form.tpl'
  , 'Backbone'
  , 'Backbone.FormView'
  ]
, function TestimonialsFormView(
    testimonialsFormTpl
  , Backbone
  , BackboneFormView
  )
{
  'use strict';

  return Backbone.View.extend({

    template: testimonialsFormTpl

  , title: _('New Testimonial').translate()

  , bindings: {
      '[name="text"]': 'text'
    , '[name="title"]': 'title'
    , '[name="writerName"]': 'writerName'
    , '[name="rating"]': 'rating'
    }

  , events: {
      'submit form': 'saveForm'
    }

  , initialize: function initialize() {
      BackboneFormView.add(this);
    }

  , getBreadcrumbPages: function getBreadcrumbPages() {
      return [{
        text: this.title
      , href: '/testimonials/new'
      }];
    }
  });
});