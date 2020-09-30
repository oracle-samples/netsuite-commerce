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

  // The backend model handles data on the server. All code in it runs on NetSuite systems. It can contain SuiteScript - our proprietary scripting language - which is used to access record data and perform NetSuite specific things.
  // A model is paired with a service controller to create a service file.
  return SCModel.extend({
    // Every backend model must have a name, and one that is unique. It is best to match it to the module name.
    name: 'UserPreferences'

    // Model methods do not need to align perfectly with the names in your service controller or the 'official' names given to CRUD methods.
  , create: function (data)
    {
      // Validation prevents bad data from being entered into the system, which could be bad for you and waste the time of your customer and our servers!
      this.validate(data);

      // Create a NetSuite object based on the record type ID. Note that this does not create a new record in the database - it must be submitted first.
      var newRecord = nlapiCreateRecord('customrecord_user_preferences');

      // Set the data in the object using the data provided by the object and data we know about the user.
      // In our example, nlapiGetUser() gets the intenral ID of the user who's currently logged in and executing the code on the frontend
      newRecord.setFieldValue('custrecord_user_preferences_owner', nlapiGetUser());
      newRecord.setFieldValue('custrecord_user_preferences_type', data.type);
      newRecord.setFieldValue('custrecord_user_preferences_value', data.value);

      // Create the new record using the object we just created.
      return nlapiSubmitRecord(newRecord);
    }

  , get: function (id)
    {
      // Getting a specific record usually means performing a record search. There are three parts to it: the type of record (ie its ID), the filters you want to use (ie the search criteria), and the columns (ie the field data you want back).
      // See https://system.netsuite.com/app/help/helpcenter.nl?fid=book_N2902317.html
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
        // Return an object with the key names we want
        return {
          internalid: search[0].getValue('internalid')
          // Note how we use .getText() instead of .getValue() - this ensures that we get the option label, rather than its internal ID.
        , type: search[0].getText('custrecord_user_preferences_type')
        , value: search[0].getValue('custrecord_user_preferences_value')
        }
      }
    }

    // Getting a list of records, is similar to the .get() method above but in our case, we don't need the ID of a specific record: we just tell the system to perform a search of a particular type of records where the current user is the owner.
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

      // _.map() takes an array of results and transforms each result, returning a new array. It's perfect for when you get a list of results from
      return _.map(search, function (result) {
        return {
          internalid: result.getValue('internalid')
        , type: result.getText('custrecord_user_preferences_type')
        , value: result.getValue('custrecord_user_preferences_value')
        };
      });
    }

    // Updating (PUTing) a record is very similar to creating a record (see above).
  , update: function (id, data)
    {
      this.validate(data);

      var record = nlapiLoadRecord('customrecord_user_preferences', id);

      record.setFieldValue('custrecord_user_preferences_type', data.type);
      record.setFieldValue('custrecord_user_preferences_value', data.value);

      return nlapiSubmitRecord(record);
    }

  , delete: function (id)
    {
      nlapiDeleteRecord('customrecord_user_preferences', id);
    }

    // Validation is built into SCA models, so all you need to do is pass it an object of the data you want to validate.
    // See http://thedersen.com/projects/backbone-validation/
  , validation:
    {
      'type':
      {
        required: true
      , msg: 'Please select a type'
      }
    , 'value':
      {
        required: true
      , msg: 'Please enter a value'
      }
    }
  });
});