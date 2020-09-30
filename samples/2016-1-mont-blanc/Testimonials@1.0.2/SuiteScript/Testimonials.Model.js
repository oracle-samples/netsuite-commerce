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
  , list: function list() {
      var paginatedSearchResults;

      var filters = [
        new nlobjSearchFilter('custrecord_t_status', null, 'is', '2')
      , new nlobjSearchFilter('isinactive', null, 'is', 'F')
      ];

      var columns = [
        new nlobjSearchColumn('name')
      , new nlobjSearchColumn('custrecord_t_rating')
      , new nlobjSearchColumn('custrecord_t_entity_name')
      , new nlobjSearchColumn('custrecord_t_text')
      , new nlobjSearchColumn('custrecord_t_creation_date')
      ];

      paginatedSearchResults = Application.getPaginatedSearchResults({
        results_per_page: 20
      , columns: columns
      , filters: filters
      , record_type: 'customrecord_testimonial'
      });

      if (paginatedSearchResults.records && paginatedSearchResults.records.length > 0) {
        paginatedSearchResults.records = _.map(paginatedSearchResults.records, function mapRecord(record) {
           return {
             title: record.getValue('name'),
             text: record.getValue('custrecord_t_text'),
             createdDate: record.getValue('custrecord_t_creation_date'),
             rating: record.getValue('custrecord_t_rating'),
             writerName: record.getValue('custrecord_t_entity_name')
           };
        });
      }
      return paginatedSearchResults;
    }
  });
});