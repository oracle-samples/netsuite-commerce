// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('Testimonials.Model'
, [
    'SC.Model'
  , 'Application'
  , 'Utils'
  , 'underscore'
  ]
, function TestimonialsModel(
    SCModel
  , Application
  , Utils
  , _
)
{
  'use strict';

  return SCModel.extend({

    name: 'Testimonial'

  , validation: {
      writerName: {
        required: true
      , rangeLength: [2, 50]
      }
    , title: {
        required: true
      , rangeLength: [2, 200]
      }
    , text: {
        required: true
      , rangeLength: [2, 999]
      }
    , rating: {
        required: true
      , range: [1, 5]
      }
    }

  , create: function create(data) {
      var record = nlapiCreateRecord('customrecord_testimonial');

      this.validate(data);

      if (session.isLoggedIn2()) {
        record.setFieldValue('custrecord_t_entity', nlapiGetUser() + '');
      }
      data.writerName && record.setFieldValue('custrecord_t_entity_name', Utils.sanitizeString(data.writerName));
      data.title && record.setFieldValue('name', Utils.sanitizeString(data.title));
      data.text && record.setFieldValue('custrecord_t_text', Utils.sanitizeString(data.text));
      data.rating && record.setFieldValue('custrecord_t_rating', parseInt(data.rating, 10));

      return nlapiSubmitRecord(record);
    }
  });
});