// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('Artist.Model',
  [
  'SC.Model',
  'underscore'
  ],
  function (SCModel, _) {
    return SCModel.extend({
      name: 'Artist',
      validation: {
        'name': {
          required: true,
          msg: 'Please enter an artist name'
        },
        'genre': {
          required: true,
          msg: 'Please enter a genre'
        }
      },
      get: function(id) {
        var filters = [
          new nlobjSearchFilter('custrecord_owner', null, 'anyof', nlapiGetUser()),
          new nlobjSearchFilter('internalid', null, 'is', id)
        ];
        var columns = [
          new nlobjSearchColumn('internalid'),
          new nlobjSearchColumn('name'),
          new nlobjSearchColumn('custrecord_genre')
        ];
        var search = nlapiSearchRecord('customrecord_artist', null, filters, columns);
        if (search && search.length === 1) {
          return {
            internalid: search[0].getValue('internalid'),
            name: search[0].getValue('name'),
            genre: search[0].getValue('custrecord_genre')
          };
        } else {
          throw notFoundError;
        }
      },
      list: function() {
        var filters = [
          new nlobjSearchFilter('custrecord_owner', null, 'anyof', nlapiGetUser()),
        ];

        var columns = [
          new nlobjSearchColumn('internalid'),
          new nlobjSearchColumn('name'),
          new nlobjSearchColumn('custrecord_genre')
        ];

        var searchResults = nlapiSearchRecord('customrecord_artist', null, filters, columns);
        return _.map(searchResults, function(result) {
          return {
            internalid: result.getValue('internalid'),
            name: result.getValue('name'),
            genre: result.getValue('custrecord_genre')
          };
        });

      },
      create: function(data) {
        this.validate(data);
        var record = nlapiCreateRecord('customrecord_artist');
        record.setFieldValue('name', data.name);
        record.setFieldValue('custrecord_genre', data.genre);
        record.setFieldValue('custrecord_owner', nlapiGetUser());
        return nlapiSubmitRecord(record);
      },
      update: function(id, data) {
        this.validate(data);
        var record = nlapiLoadRecord('customrecord_artist',id);
        record.setFieldValue('name', data.name);
        record.setFieldValue('custrecord_genre', data.genre);
        return nlapiSubmitRecord(record);
      },
      remove: function(id) {
        nlapiDeleteRecord('customrecord_artist', id);
      }
    });
  }
)