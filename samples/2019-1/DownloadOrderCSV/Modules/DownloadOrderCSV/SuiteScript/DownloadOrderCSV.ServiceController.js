define('Example.DownloadOrderCSV.DownloadOrderCSV.ServiceController'
, [
    'ServiceController'
  , 'Example.DownloadOrderCSV.DownloadOrderCSV'
  ]
, function
  (
    ServiceController
  , DownloadOrderCSV
  )
{
  'use strict';

  return ServiceController.extend({
    name: 'Example.DownloadOrderCSV.DownloadOrderCSV.ServiceController'

  , get: function get ()
    {
      var orderHistoryCSVFile = DownloadOrderCSV.get(this.request.getParameter('orderHistory'));

      this.response.setContentType('CSV', 'orderhistory.csv', 'attachment');
      this.response.write(orderHistoryCSVFile.getValue());
    }
  })
})