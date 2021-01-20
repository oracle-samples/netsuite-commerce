// Copyright (c) 2021, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.
define('Example.UserPreferences.Model',
[
    'SCModel',
    'Utils',
    'Example.UserPreferences.Helper'
],
function
(
    SCModelModule,
    Utils,
    ExampleUserPreferencesHelper
) {
    'use strict';
 
    var SCModel = SCModelModule.SCModel;
 
    function ExampleUserPreferencesModel (model, collection, options) {
        SCModel.call(this, model, collection, options);
 
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

    ExampleUserPreferencesModel.prototype.getValidationRules = function () {
        return {
            type: [
                function (value, name) {
                    if (typeof value === 'undefined' || value.length === 0  || !value.trim()) {
                        return name.charAt(0).toUpperCase() + name.slice(1) + ' is required'
                    }
                },
                function (value, name) {
                    if (ExampleUserPreferencesHelper.getTypeOptionIds().indexOf(String(value)) === -1) {
                        return 'Select a valid ' + name
                    }
                }
            ],
            value: [
                function (value, name) {
                    if (typeof value === 'undefined' || value.length === 0  || !value.trim()) {
                        return name.charAt(0).toUpperCase() + name.slice(1) + ' is required'
                    }
                }
            ]
        }
    }
    
    return ExampleUserPreferencesModel
})