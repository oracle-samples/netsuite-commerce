// Copyright (c) 2021, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.
define('Example.UserPreferences.Details.View', [
    'SCView',
    'Example.UserPreferences.Helper',
    'example_userpreferences_details.tpl'
], function (
    SCViewModule,
    ExampleUserPreferencesHelper,
    example_userpreferences_details_tpl
) {
    'use strict';

    var SCView = SCViewModule.SCView;

    function ExampleUserPreferencesDetailsView (options) {
        SCView.call(this, options);

        this.model = options.model;

        this.template = example_userpreferences_details_tpl;
    }

    ExampleUserPreferencesDetailsView.prototype = Object.create(SCView.prototype);
    ExampleUserPreferencesDetailsView.prototype.constructor = ExampleUserPreferencesDetailsView;

    ExampleUserPreferencesDetailsView.prototype.getContext = function () {
        return {
            model: this.model,
            typeOptions: ExampleUserPreferencesHelper.getTypeOptions()
        }
    }

    return ExampleUserPreferencesDetailsView
})