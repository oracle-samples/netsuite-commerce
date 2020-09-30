define('Vendor.Extension.Module.TestView',
[
    'Backbone',
    'AjaxRequestsKiller',

    'Vendor.Extension.Module.Model',
    'vendor_extension_module_test_template.tpl'
],
function
(
    Backbone,
    AjaxRequestsKiller,

    VendorExtensionModuleModel,
    vendor_extension_module_test_template_tpl
) {
    'use strict';

    return Backbone.View.extend({
        template: vendor_extension_module_test_template_tpl,

        initialize: function initialize (options) {
            this.application = options.application;
            this.model = new VendorExtensionModuleModel();
            console.log('Vendor.Extension.Module.TestView loaded')
        },

        beforeShowContent: function beforeShowContent () {
            return this.model.fetch({
                killerId: AjaxRequestsKiller.getKillerId()
            })
        },

        getContext: function getContext () {
            return {
                internalid: this.model.get('internalid'),
                value: this.model.get('value')
            }
        }
    })
})