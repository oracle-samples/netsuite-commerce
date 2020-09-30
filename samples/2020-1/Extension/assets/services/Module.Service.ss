
function service(request, response)
{
	'use strict';
	try 
	{
		require('Vendor.Extension.Module.ServiceController').handle(request, response);
	} 
	catch(ex)
	{
		console.log('Vendor.Extension.Module.ServiceController ', ex);
		var controller = require('ServiceController');
		controller.response = response;
		controller.request = request;
		controller.sendError(ex);
	}
}