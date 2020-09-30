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
      return [
        {
          internalid: '0'
        , faveThing: 'Red'
        , faveReason: 'It\'s a strong color'
        }
      , {
          internalid: '1'
        , faveThing: 'Apple'
        , faveReason: 'It\'s a tasty fruit'
        }
      , {
          internalid: '2'
        , faveThing: '7'
        , faveReason: 'It\'s a lucky number'
        }
      ]
    }

  , update: function (id, data)
    {
      return null
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