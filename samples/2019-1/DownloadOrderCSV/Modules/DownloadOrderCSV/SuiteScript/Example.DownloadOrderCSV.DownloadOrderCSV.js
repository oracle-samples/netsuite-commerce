define('Example.DownloadOrderCSV.DownloadOrderCSV'
, [
  ]
, function
  (
  )
{
  'use strict';

  return {
    get: function get (orderHistory)
    {
      var CSVData = this.unparse(orderHistory);
      return nlapiCreateFile('orderhistory.csv', 'CSV', CSVData);
    }

  , unparse: function unparse (jsonData)
    {
      // Define to header rows
      var json = JSON.parse(jsonData);
      var headerRows = Object.keys(json[0]);
      // Deal with null values
      var replacer = function replacer (key, value) {return value === null ? '' : value};

      // Produce the CSV
      var csv = json.map(function (row) 
      {
        return headerRows.map(function (field) 
        {
          return JSON.stringify(row[field], replacer)
        }).join(',')
      });

      csv.unshift(headerRows.join(','));
      csv = csv.join('\r\n');

      return csv
    }
  }
});