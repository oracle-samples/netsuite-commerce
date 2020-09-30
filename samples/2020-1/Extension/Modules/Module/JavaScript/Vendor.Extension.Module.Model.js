define('Vendor.Extension.Module.Model',
[
    'SCModel',
    'underscore'
],
function 
(
    SCModelModule,
    _
) {
    'use strict';

    var SCModel = SCModelModule.SCModel;

    // Create the constructor for your custom model
    // VendorExtensionModuleModel is a subclass of SCModel
    function VendorExtensionModuleModel () {
        // Call the super class's constructor
        SCModel.call(this);

        // Define the properties for our custom model
        this.urlRoot = function () {
            return _.getAbsoluteUrl(getExtensionAssetsPath('services/Module.Service.ss'));
        }
    }

    // Copy parent instance methods (ie the superclass)
    // Note that `new SCModel` would also accomplish this, but this would also call the constructor, which is not something we need to do
    VendorExtensionModuleModel.prototype = Object.create(SCModel.prototype);

    // Restore the constructor as it would have been overwritten
    VendorExtensionModuleModel.prototype.constructor = VendorExtensionModuleModel;

    // Return the AMD constructor
    return VendorExtensionModuleModel
})