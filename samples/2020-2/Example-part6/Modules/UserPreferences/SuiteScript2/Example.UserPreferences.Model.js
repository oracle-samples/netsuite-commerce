/**
* @NApiVersion 2.x
* @NModuleScope TargetAccount
* // Copyright (c) 2021, Oracle and/or its affiliates. All rights reserved.
* // Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.
*/
define([
    'N/record',
    'N/runtime',
    'N/search'
], function (
    record,
    runtime,
    search
) {
    'use strict';

    var ExampleUserPreferencesModel = {
        get: function (request) {
            var type = 'customrecord_user_preferences';

            var filters = [
                ['custrecord_user_preferences_owner', search.Operator.ANYOF, runtime.getCurrentUser().id]
            ];

            var columns = ['internalid', 'custrecord_user_preferences_type', 'custrecord_user_preferences_value'];

            if (request.parameters.internalid) {
                filters.push('and', [
                    ['internalid', search.Operator.IS, request.parameters.internalid]
                ]);
            }

            var searchResults = search.create({
                type: type,
                filters: filters,
                columns: columns
            }).run().getRange({start: 0, end: 1000});

            var mappedResults = searchResults.map(function (result) {
                return {
                    internalid: result.getValue('internalid'),
                    type: result.getValue('custrecord_user_preferences_type'),
                    value: result.getValue('custrecord_user_preferences_value')
                }
            });

            return mappedResults.length == 1 ? mappedResults[0] : mappedResults
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
        },

        put: function (request) {
            var body = JSON.parse(request.body);

            var userPreferences = record.load({
                type: 'customrecord_user_preferences',
                id: request.parameters.internalid
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