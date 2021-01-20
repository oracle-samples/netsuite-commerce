// Copyright (c) 2021, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.
define('Example.UserPreferences.Helper', [
    'Utils'
], function (
    Utils
) {
    // A helper file is a module that contains utility functions that can be shared between multiple modules

    'use strict';

    return {
        // For the sake of the tutorial, we are hardcoding in the options for the available types of user preference, but it would be better to fetch them with SuiteScript
        getTypeOptions: function getTypeOptions () {
            return [
                {internalid: '1', name: Utils.translate('Color')},
                {internalid: '2', name: Utils.translate('Size')}
            ];
        }
    }
})