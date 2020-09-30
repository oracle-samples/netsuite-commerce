define('Vendor.Extension.Module.ServiceController', [
    'ServiceController',
    'Vendor.Extension.Module.Model'
], function (
    ServiceController,
    ModuleModel
) {
    'use strict';

    return ServiceController.extend({
        name: 'Vendor.Extension.Module.ServiceController',

        get: function get () {
            return ModuleModel.get()
        }
    })
})