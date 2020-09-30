define('Vendor.Extension.Module', 
[
    'Vendor.Extension.Module.TestView'
], 
function
(
    VendorExtensionModuleTestView
) {
    'use strict';

    return {
        mountToApp: function mountToApp (application) {
            console.log('Vendor.Extension.Module loaded');

            var pageType = application.getComponent('PageType');

            pageType.registerPageType({
                'name': 'Vendor.Extension.Module.TestView',
                'routes': ['testview'],
                'view': VendorExtensionModuleTestView, 
                'defaultTemplate': {
                    'name': 'vendor_extension_module_test_template.tpl',
                    'displayName': 'Vendor Extension Module Test Page'
                }
            });
        }
    }
})