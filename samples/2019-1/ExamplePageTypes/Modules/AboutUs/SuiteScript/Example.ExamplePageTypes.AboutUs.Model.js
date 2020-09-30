// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('Example.ExamplePageTypes.AboutUs.Model'
, [
    'SC.Model'
  , 'underscore'
  ]
, function
  (
    SCModel
  , _
  )
{
  'use strict';

  return SCModel.extend(
  {
    name: 'Example.ExamplePageTypes.AboutUs'

  , list: function list ()
    {
      var type = 'customrecord_about_us_employee'

      var filters = [];

      var columns = [
        new nlobjSearchColumn('internalid')
      , new nlobjSearchColumn('custrecord_about_us_employee_image')
      , new nlobjSearchColumn('custrecord_about_us_employee_name')
      , new nlobjSearchColumn('custrecord_about_us_employee_blurb')
      ];

      var search = nlapiSearchRecord(type, null, filters, columns);

      return _.map(search, function (result)
      {
        return {
          internalid: result.getValue('internalid')
        , image: result.getText('custrecord_about_us_employee_image') //getText() will return the URL path as getValue() will return the internal ID number
        , name: result.getValue('custrecord_about_us_employee_name')
        , blurb: result.getValue('custrecord_about_us_employee_blurb')
        }
      })
    }

  , get: function get (id)
    {
      var type = 'customrecord_about_us_employee'

      var filters = [
        new nlobjSearchFilter('internalid', null, 'is', id)
      ];

      var columns = [
        new nlobjSearchColumn('internalid')
      , new nlobjSearchColumn('custrecord_about_us_employee_image')
      , new nlobjSearchColumn('custrecord_about_us_employee_name')
      , new nlobjSearchColumn('custrecord_about_us_employee_blurb')
      ];

      var search = nlapiSearchRecord(type, null, filters, columns);

      // we can't use re-use the map function that we use for list() as list view wants an array of objects (ie a collection), whereas the details view wants a single object (ie a model)
      if (search && search.length === 1)
      {
        return {
          internalid: search[0].getValue('internalid')
        , image: search[0].getText('custrecord_about_us_employee_image')
        , name: search[0].getValue('custrecord_about_us_employee_name')
        , blurb: search[0].getValue('custrecord_about_us_employee_blurb')
        }
      }
    }
  });
});