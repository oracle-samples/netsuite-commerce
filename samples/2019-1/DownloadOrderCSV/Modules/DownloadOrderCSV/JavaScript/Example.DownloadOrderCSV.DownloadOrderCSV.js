define('Example.DownloadOrderCSV.DownloadOrderCSV'
, [
    'Example.DownloadOrderCSV.DownloadOrderCSV.View'
  ]
, function
  (
    DownloadOrderCSVView
  )
{
  'use strict';

  return {
    mountToApp: function mountToApp (container)
    {
      var Layout = container.getComponent('Layout');

      if (Layout)
      {
        Layout.addChildView('ListHeader', function () // Sadly, this will add this functionality to every List Header view, so we will need to do some work to minimize this
        {
          return new DownloadOrderCSVView({container: container})
        });
      }
    }
  }
});