define('Vendor.Extension.Module.Model', [
    'SC.Model'
], function (
    SCModel
) {
    'use strict';

    return SCModel.extend({
        get: function () {
            // Perform some data look-up or something, but this is just going to use some dummy data for now
            return {
                internalid: '1', value: 'test'
            }
        }
    })
})