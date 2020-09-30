define('Example.DownloadOrderCSV.DownloadOrderCSV.Helper'
, [
    'underscore'
  ]
, function
  (
    _
  )
{
  'use strict';

  return {
    getServiceUrl: function getServiceUrl ()
    {
      return _.getAbsoluteUrl(getExtensionAssetsPath('services/DownloadOrderCSV.Service.ss'))
    }

  , getDefaultColumns: function getDefaultColumns ()
    {
      return [
        {'id': 'trandate', 'label': 'Date'}
      , {'id': 'amount', 'label': 'Amount'}
      , {'id': 'status', 'label': 'Status'}
      ]
    }

  , mapList: function mapList (data, orderHistoryColumns)
    {
      /* Example data:
      {
        "page":"1",
        "recordsPerPage":20,
        "records":[
          {
            "recordtype":"salesorder",
            "internalid":"13257",
            "tranid":"SO111259",
            "trandate":"4/30/2019",
            "status":{
              "internalid":"pendingFulfillment",
              "name":"Pending Fulfillment"
            },
            "amount":1138.27,
            "currency":{
              "internalid":"1",
              "name":"USD"
            },
            "amount_formatted":"$1,138.27",
            "trackingnumbers":null
          }
        ]
      }
      */

      var orderHistoryJSON = [];

      _.map(data, function (oldrec)
      {
        var newrec = {'Purchase Number': oldrec.tranid};

        _.each(orderHistoryColumns, function (column)
        {
          if (oldrec[column.id])
          {
            // Most values in the object are strings, but in same cases they are objects
            newrec[column.label] = _.isObject(oldrec[column.id]) ? oldrec[column.id].name : oldrec[column.id]
          }
        });

        orderHistoryJSON.push(newrec);
      });

      return orderHistoryJSON
    }
  }
})