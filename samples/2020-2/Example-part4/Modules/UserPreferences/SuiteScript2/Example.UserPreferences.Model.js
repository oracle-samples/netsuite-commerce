/**
* @NApiVersion 2.x
* @NModuleScope TargetAccount
* // Copyright (c) 2021, Oracle and/or its affiliates. All rights reserved.
* // Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.
*/
define([
    'N/record',
    'N/runtime'
], function (
    record,
    runtime
) {
    'use strict';

    var ExampleUserPreferencesModel = {
        get: function (request) {
            var data = {
                message: 'This is a message sent from the server!'
            }

            return data
        },

        post: function (request) {
            var body = JSON.parse(request.body);

            var userPreferences = record.create({
                type: 'customrecord_user_preferences'
            });

            userPreferences.setValue({
                fieldId: 'custrecord_user_preferences_owner',
                value: runtime.getCurrentUser().id
            });

            userPreferences.setValue({
                fieldId: 'custrecord_user_preferences_type',
                value: body.type
            });

            userPreferences.setValue({
                fieldId: 'custrecord_user_preferences_value',
                value: body.value
            });

            return userPreferences.save()
        }
    }

    return ExampleUserPreferencesModel
})