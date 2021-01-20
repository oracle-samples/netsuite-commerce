/**
* @NApiVersion 2.x
* @NModuleScope TargetAccount
* // Copyright (c) 2021, Oracle and/or its affiliates. All rights reserved.
* // Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.
*/
define([], function () {
    'use strict';

    var ExampleUserPreferencesModel = {
        get: function (request) {
            var data = {
                message: 'This is a message sent from the server!'
            }

            return data
        }
    }

    return ExampleUserPreferencesModel
})