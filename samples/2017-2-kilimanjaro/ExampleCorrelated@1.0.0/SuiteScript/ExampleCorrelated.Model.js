// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('ExampleCorrelated.Model'
, [
    'SC.Model'
  , 'Models.Init'
  , 'Utils'
  , 'underscore'
  ]
, function
  (
    SCModel
  , ModelsInit
  , Utils
  , _
  )
{
  'use strict';

  return SCModel.extend({
    name: 'ExampleCorrelated'

  , getAbandonedIds: function ()
    {
      var customerId = nlapiGetUser()
      , filters = new Array()
      , ids = new Array()
      , parentIds = new Array();

      if (ModelsInit.session.isLoggedIn2()) {
        var filter = filters.push
        (
          new nlobjSearchFilter('internalid', null, 'is', customerId)
        )

      , results = Utils.loadAndMapSearch('customsearch_abandoned_carts', filters);

        if (results.length > 0)
        {
          ids = _.map(results, function (id) {return id.itemid});
        }

        var parentIds = this.getParentIds(ids);

        if (parentIds.length > 0) {ids = parentIds}
      }

      return {ids: ids}
    }

  , getParentIds: function (ids)
    {
      var parentIds = new Array()
      , filters = new Array()
      , columns = new Array();

      if (ids)
      {
        var filter = filters.push
        (
          new nlobjSearchFilter('internalid', null, 'anyof', ids)
        )

      , column = columns.push
        (
          new nlobjSearchColumn('internalid', 'parent', null)
        )

        // Must run as a role that has the List > Items > View permission
      , search = nlapiSearchRecord('item', null, filters, columns);

        // console.log(JSON.stringify(search));
        // returns, eg:
          // [{"id":"8041","recordtype":"inventoryitem","columns":{"internalid":{"name":"8033","internalid":"8033"}}},{"id":"8047","recordtype":"inventoryitem","columns":{"internalid":{"name":"8044","internalid":"8044"}}},{"id":"8052","recordtype":"inventoryitem","columns":{"internalid":{"name":"8050","internalid":"8050"}}},{"id":"6596","recordtype":"inventoryitem","columns":{"internalid":{"name":"6594","internalid":"6594"}}}]

        for (var i in search)
        {
          // console.log(search[i].getValue('internalid', 'parent'));
          // returns, eg, "8041"
          parentIds.push(search[i].getValue('internalid', 'parent'));
        }
      }

      return parentIds
    }
  });
});
