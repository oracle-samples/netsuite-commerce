// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('MyReviews.Model'
, [
    'SC.Model'
  , 'underscore'
  ]
, function (
    SCModel
  , _
  )
{

  'use strict';

  return SCModel.extend({

    name: 'MyReviews'

  , list: function ()
    {
      // filter on 'writer' field
      var filters = [
        new nlobjSearchFilter('custrecord_ns_prr_writer', null, 'anyof', nlapiGetUser())
      ];

      // define which fields we want returned
      var columns = [
        new nlobjSearchColumn('internalid'),
        new nlobjSearchColumn('custrecord_ns_prr_rating'),
        new nlobjSearchColumn('custrecord_ns_prr_text'),
        new nlobjSearchColumn('custrecord_ns_prr_item_id'),
        new nlobjSearchColumn('created')
      ];

      // define record type to be searched
      var search = nlapiSearchRecord('customrecord_ns_pr_review', null, filters, columns);

      // if you need to, log it so that you can see it
      // var log1 = nlapiLogExecution('DEBUG', 'search', JSON.stringify(search));

      return _.map(search, function(result) {
        return {
          reviewid: result.getValue('internalid')
        , rating: result.getValue('custrecord_ns_prr_rating')
        , text: result.getValue('custrecord_ns_prr_text')
        , itemid: result.getValue('custrecord_ns_prr_item_id')
        , created: result.getValue('created')
        }
      })
    }
  })
});