// Copyright (c) 2020, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.
/**
 * @NApiVersion 2.x
 * @NScriptType BundleInstallationScript
 */
 /*jshint funcscope:true */
define(
    [
           'N/config'
    ,   'N/error'
    ,   'N/file'
    ]
,   function(
           nconfig
    ,   error
       ,    file_module
    )
{
    var em = {
        //Hardcode here the path to your extensions' manifest. This paths must be relative to the bundle folder.
        //For instance, if your SuiteApp has the following extension1 and extension2 paths:
        //SuiteBundles/Bundle 1234/com.netsuite.mySuiteApp/extension1/manifest.json
        //SuiteBundles/Bundle 1234/com.netsuite.mySuiteApp/extension2/manifest.json
        //The extension_folders array should look like:
        //extension_folders: ['com.netsuite.mySuiteApp/extension1', 'com.netsuite.mySuiteApp/extension2']
        //Keep it empty if your extension' folders are first level folders of the bundle
        extension_folders: [

        ]

        //return the SCEXTMECHAPI PATH
    ,   getPath: function getPath()
        {
            var conf = nconfig.load({
                type: nconfig.Type.COMPANY_PREFERENCES
            });
            var path = conf.getValue({fieldId: 'custscript_sc_extmech_api_path_ss2'});
            return path;
        }

    ,    beforeInstall: function beforeInstall()
        {
            try
            {
                var path = this.getPath()
                ,    file = path && file_module.load({id: path});
            }
            catch(error)
            {}

            if (!path || !file)
            {
                throw error.create({
                    name: 'SCE_EXTMECH_ERROR'
                ,   message: 'The Extension Management Bundle it\'s not installed or not configured correctly'
                });
            }
        }

    ,    afterInstall: function afterInstall()
        {
            var self = this
            ,   path = this.getPath();

            if (path)
            {
                require([path], function(sdk)
                {
                    sdk.afterInstall(self.extension_folders);
                });
            }
            else
            {
                throw error.create({
                    name: 'SCE_EXTMECH_ERROR'
                ,   message: 'The Extension Management Bundle it\'s not installed or not configured correctly'
                });
            }

        }

    ,    afterUpdate: function afterUpdate()
        {
            var self = this
            ,   path = this.getPath();

            if (path)
            {
                require([path], function(sdk)
                {
                    sdk.afterUpdate(self.extension_folders);
                });
            }
            else
            {
                throw error.create({
                    name: 'SCE_EXTMECH_ERROR'
                ,   message: 'The Extension Management Bundle it\'s not installed or not configured correctly'
                });
            }
        }

    ,    beforeUninstall: function beforeUninstall()
        {
            var path = this.getPath();
            if (path)
            {
                require([path], function(sdk)
                {
                    sdk.beforeUninstall();
                });
            }
            else
            {
                throw error.create({
                    name: 'SCE_EXTMECH_ERROR'
                ,   message: 'The Extension Management Bundle it\'s not installed or not configured correctly'
                });
            }
        }

    };
    return em;
});
