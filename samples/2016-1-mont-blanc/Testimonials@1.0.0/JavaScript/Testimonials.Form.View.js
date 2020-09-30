// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('Testimonials.Form.View'
, [
    'testimonials_form.tpl'
  , 'Backbone'
  ]
, function TestimonialsFormView(
    testimonialsFormTpl
  , Backbone
  )
{
  'use strict';

  return Backbone.View.extend({

    template: testimonialsFormTpl

  , getContext: function getContext() {
      return {
        example: 'Example text'
      }
    }
  });
});