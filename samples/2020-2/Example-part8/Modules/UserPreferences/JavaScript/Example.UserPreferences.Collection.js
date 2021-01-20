// Copyright (c) 2021, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.
define('Example.UserPreferences.Collection', [
    'SCCollection',
    'Example.UserPreferences.Model',
    'Utils'
], function (
    SCCollectionModule,
    ExampleUserPreferencesModel,
    Utils
) {
    'use strict';

    var SCCollection = SCCollectionModule.SCCollection;

    function ExampleUserPreferencesCollection(models, options) {
        SCCollection.call(this, models, options);

        this.model = ExampleUserPreferencesModel;
        this.url = function () {
            return Utils.getAbsoluteUrl(
                getExtensionAssetsPath(
                    "Modules/UserPreferences/SuiteScript2/Example.UserPreferences.Service.ss"
                ), true
            )
        }
    }

    ExampleUserPreferencesCollection.prototype = Object.create(SCCollection.prototype);
    ExampleUserPreferencesCollection.prototype.constructor = ExampleUserPreferencesCollection;

    return ExampleUserPreferencesCollection
})