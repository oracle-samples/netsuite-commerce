// Copyright (c) 2021, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.
define('Example.UserPreferences.Helper', [
    'Utils'
], function (
    Utils
) {
    'use strict';

    return {
        getTypeOptions: function getTypeOptions () {
            return [
                {internalid: '1', name: Utils.translate('Color')},
                {internalid: '2', name: Utils.translate('Size')}
            ];
        }
    }
})