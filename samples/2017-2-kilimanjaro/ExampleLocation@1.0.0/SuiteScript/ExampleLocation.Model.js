// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('ExampleLocation.Model'
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
    name: 'ExampleLocation'

  , get: function (id)
    {
      var filters = [
        new nlobjSearchFilter('internalid', null, 'is', id)
      ]

    , columns = [
        new nlobjSearchColumn('internalid')
      , new nlobjSearchColumn('name')
      , new nlobjSearchColumn('latitude')
      , new nlobjSearchColumn('longitude')
      ]

    , search = nlapiSearchRecord('location', null, filters, columns);

      if (search && search.length === 1)
      {
        return {
          internalid: search[0].getValue('internalid')
        , name: search[0].getValue('name')
        , latitude: search[0].getValue('latitude')
        , longitude: search[0].getValue('longitude')
        }
      }

      else
      {
        throw notFoundError
      }
    }
  })
});