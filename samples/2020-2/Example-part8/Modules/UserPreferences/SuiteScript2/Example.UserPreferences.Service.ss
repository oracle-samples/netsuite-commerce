/**
* @NApiVersion 2.x
* @NModuleScope Public
* // Copyright (c) 2021, Oracle and/or its affiliates. All rights reserved.
* // Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.
*/
define([
    './Example.UserPreferences.Model',
    'N/runtime'
], function (
    ExampleUserPreferencesModel,
    runtime
) {
    'use strict';

    function isLoggedIn () {
        var user = runtime.getCurrentUser();
        return user.id > 0 && user.role !== 17
    }

    function service (context) {
        var response = {};

        if (isLoggedIn()) {
            switch (context.request.method) {
                case 'GET': 
                    response = ExampleUserPreferencesModel.get(context.request)
                    break;
                case 'POST': 
                    response = ExampleUserPreferencesModel.post(context.request)
                    break;
                case 'PUT':
                    response = ExampleUserPreferencesModel.put(context.request)
                    break;
                case 'DELETE':
                    response = ExampleUserPreferencesModel.delete(context.request)
                    break;
                default:
                    response = {
                        type: 'error',
                        message: 'Method not supported: ' + context.request.method
                    };
            }
        }

        else {
            response = {
                type: 'error',
                message: 'You must be logged in to use this service'
            }
        }
        
        context.response.write(JSON.stringify(response));
    }

    return {
        service: service
    }
})