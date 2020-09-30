
function service(request, response)
{
	'use strict';
	try 
	{
		require('Example.DownloadOrderCSV.DownloadOrderCSV.ServiceController').handle(request, response);
	} 
	catch(ex)
	{
		console.log('Example.DownloadOrderCSV.DownloadOrderCSV.ServiceController ', ex);
		var controller = require('ServiceController');
		controller.response = response;
		controller.request = request;
		controller.sendError(ex);
	}
}