// Entry point file to run in the shopping and checkout applications
// We don't anything to happen when it's called in those scenarios, so we update the manifest file to point to this file, and then return ... nothing.
define('Example.DownloadOrderCSV.DownloadOrderCSV.noop'
, [
  ]
, function
  (
  )
{
  'use strict';

  return {
    mountToApp: function mountToApp (container)
    {
      return undefined
    }
  }
});