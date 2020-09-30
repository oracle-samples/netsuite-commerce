// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('ExampleSuiteScript.Model'
, [
    'Models.Init'
  , 'SC.Model'
  ]
, function
  (
    CommerceAPI
  , SCModel
  )
{

  'use strict';

  return SCModel.extend({
    name: 'ExampleSuiteScript'

  , get: function (id)
    {
      var filters = [
        new nlobjSearchFilter('custrecord_favething_owner', null, 'anyof', nlapiGetUser())
      , new nlobjSearchFilter('internalid', null, 'is', id)
      ]

    , columns = [
        new nlobjSearchColumn('internalid')
      , new nlobjSearchColumn('name')
      , new nlobjSearchColumn('custrecord_favething_reason')
      ]

    , search = nlapiSearchRecord('customrecord_favething', null, filters, columns);

      if (search && search.length === 1)
      {
        return {
          internalid: search[0].getValue('internalid')
        , faveThing: search[0].getValue('name')
        , faveReason: search[0].getValue('custrecord_favething_reason')
        }
      }

      else
      {
        throw notFoundError
      }
    }

  , list: function ()
    {
      var filters = [
        new nlobjSearchFilter('custrecord_favething_owner', null, 'anyof', nlapiGetUser())
      ]

    , columns = [
        new nlobjSearchColumn('internalid')
      , new nlobjSearchColumn('name')
      , new nlobjSearchColumn('custrecord_favething_reason')
      ]

    , search = nlapiSearchRecord('customrecord_favething', null, filters, columns);

      return _.map(search, function (result) {
        return {
          internalid: result.getValue('internalid')
        , faveThing: result.getValue('name')
        , faveReason: result.getValue('custrecord_favething_reason')
        }
      })
    }

  , update: function (id, data)
    {
      this.validate(data);

      var record = nlapiLoadRecord('customrecord_favething', id);
      record.setFieldValue('name', data.favething);
      record.setFieldValue('custrecord_favething_reason', data.favereason);

      return nlapiSubmitRecord(record)
    }

  , create: function (data)
    {
      this.validate(data);

      var record = nlapiCreateRecord('customrecord_favething');
      record.setFieldValue('name', data.favething);
      record.setFieldValue('custrecord_favething_reason', data.favereason);
      record.setFieldValue('custrecord_favething_owner', nlapiGetUser());

      return nlapiSubmitRecord(record)
    }

  , remove: function (id)
    {
      return null
    }
  })
});