// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('UserPreferences.Model'
, [
    'SC.Model'
  ]
, function
  (
    SCModel
  )
{
  'use strict';

  return SCModel.extend({
    name: 'UserPreferences'

  , create: function (data)
    {
      var newRecord = nlapiCreateRecord('customrecord_user_preferences');

      newRecord.setFieldValue('custrecord_user_preferences_owner', nlapiGetUser());
      newRecord.setFieldValue('custrecord_user_preferences_type', data.type);
      newRecord.setFieldValue('custrecord_user_preferences_value', data.value);

      return nlapiSubmitRecord(newRecord);
    }

  , get: function (id)
    {
      var type = 'customrecord_user_preferences';

      var filters = [
        new nlobjSearchFilter('custrecord_user_preferences_owner', null, 'anyof', nlapiGetUser())
      , new nlobjSearchFilter('internalid', null, 'is', id)
      ];

      var columns = [
        new nlobjSearchColumn('internalid')
      , new nlobjSearchColumn('custrecord_user_preferences_type')
      , new nlobjSearchColumn('custrecord_user_preferences_value')
      ];

      var search = nlapiSearchRecord(type, null, filters, columns);

      if (search && search.length === 1)
      {
        return {
          internalid: search[0].getValue('internalid')
        , type: search[0].getText('custrecord_user_preferences_type')
        , value: search[0].getValue('custrecord_user_preferences_value')
        }
      }
    }

  , list: function ()
    {
      var type = 'customrecord_user_preferences';

      var filters = [
        new nlobjSearchFilter('custrecord_user_preferences_owner', null, 'anyof', nlapiGetUser())
      ];

      var columns = [
        new nlobjSearchColumn('internalid')
      , new nlobjSearchColumn('custrecord_user_preferences_type')
      , new nlobjSearchColumn('custrecord_user_preferences_value')
      ];

      var search = nlapiSearchRecord(type, null, filters, columns);

      return _.map(search, function (result) {
        return {
          internalid: result.getValue('internalid')
        , type: result.getText('custrecord_user_preferences_type')
        , value: result.getValue('custrecord_user_preferences_value')
        };
      });
    }

  , update: function (id, data)
    {
      var record = nlapiLoadRecord('customrecord_user_preferences', id);

      record.setFieldValue('custrecord_user_preferences_type', data.type);
      record.setFieldValue('custrecord_user_preferences_value', data.value);

      return nlapiSubmitRecord(record);
    }

  , delete: function (id)
    {
      nlapiDeleteRecord('customrecord_user_preferences', id);
    }
  });
});