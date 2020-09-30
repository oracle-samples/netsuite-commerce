define('Example.DownloadOrderCSV.DownloadOrderCSV.View'
, [
    'Backbone'
  , 'jQuery'

  , 'OrderHistory.List.View'

  , 'Example.DownloadOrderCSV.DownloadOrderCSV.Helper'
  , 'example_downloadordercsv_downloadordercsv.tpl'
  ]
, function
  (
    Backbone
  , jQuery

  , OrderHistoryListView

  , Helper
  , example_downloadordercsv_downloadordercsv_tpl
  )
{
  'use strict';

  return Backbone.View.extend({
    template: example_downloadordercsv_downloadordercsv_tpl

  , initialize: function ()
    {
      this.application = this.options.container;
      this.parentView = this.application.getLayout().getCurrentView();
    }

  , render: function () // this will overwrite the inherited render() method
    {
      // "How do I conditionally do something based on what the current view is?"
      if (this.parentView instanceof OrderHistoryListView)
      {
        this._render(); // this is the 'real' method
      }
      // by doing nothing if it is false, it won't render on pages that aren't the order history list view
    }

  , events:
    {
      'click [data-action="downloadordercsv"]': 'downloadOrderCSV'
    }

  , downloadOrderCSV: function downloadOrderCSV ()
    {
      var orderHistoryModels = this.parentView.collection.models // get order data straight from the view's collection's models
    , orderHistoryColumns = this.application.getConfig('transactionListColumns.enableOrderHistory') ? this.application.getConfig('transactionListColumns.orderHistory') : Helper.getDefaultColumns() // Does this site use custom order history columns? If so, get them, otherwise provide some defaults
    , orderHistoryMap = Helper.mapList(orderHistoryModels, orderHistoryColumns) // map the data into JSON format that the parsing system can understand
    , CSVServiceURL = Helper.getServiceUrl() + '?orderHistory=' + JSON.stringify(orderHistoryMap); // generate the URL for the service, to which we will attach a stringified version of the processed of the data

      // So, here's the thing. If you have a service you need to call in your extension then you can use jQuery/XHR to get it. BUT if you're going to use this GET to get model/collection data, then you should use standard Backbone model/collection stuff. This is only if you need to make a call to NetSuite for other uses.
      jQuery.get(CSVServiceURL).then(function (CSVfile)
      {
        // After calling the service and getting our response, we need to do something with the file. But unfortunately the download / 'save as' mechanism won't automatically trigger :(
        // The web standards folk *were* going to make downloading files super easy with an API but they canceled that idea, sadly.
        // Some people have tried to resurrect it by creating a library, etc, but that's a bit overkill, I think: https://developers.google.com/web/updates/2011/08/Saving-generated-files-on-the-client-side
        // The reason I think that is because there are a couple of easy ways to do it that are 'hacky' but reliable (and, to be honest, the library just wraps those hacks up and makes them look pretty)
        // Anyway, you basically create a fake link that reads the data and converts it into a file.
        // We then trigger a click() event and download it.
        // Wait. Does that mean we don't even need to bother generating the file on NetSuite? :thinking_face:
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(CSVfile));
        element.setAttribute('download', 'OrderHistory.csv');
        element.style.display = 'none';

        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      });
    }
  })
});