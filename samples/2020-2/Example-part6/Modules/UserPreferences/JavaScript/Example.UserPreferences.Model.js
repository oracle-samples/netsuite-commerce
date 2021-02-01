// Copyright (c) 2021, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.
define('Example.UserPreferences.Model',
[
    'SCModel',
    'Utils'
],
function
(
    SCModelModule,
    Utils
) {
    'use strict';
 
    var SCModel = SCModelModule.SCModel;
 
    function ExampleUserPreferencesModel (model, options) {
        SCModel.call(this, model, options);
 
        this.urlRoot = function urlRoot () {
            return Utils.getAbsoluteUrl(
                getExtensionAssetsPath(
                    "Modules/UserPreferences/SuiteScript2/Example.UserPreferences.Service.ss"
                ), true
            )
        }
    }
 
    ExampleUserPreferencesModel.prototype = Object.create(SCModel.prototype);
    ExampleUserPreferencesModel.prototype.constructor = ExampleUserPreferencesModel;
 
    return ExampleUserPreferencesModel
})