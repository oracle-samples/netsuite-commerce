/**
* @NApiVersion 2.x
* @NModuleScope Public
* // Copyright (c) 2021, Oracle and/or its affiliates. All rights reserved.
* // Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.
*/
define([
    './Example.UserPreferences.Model'
], function (
    ExampleUserPreferencesModel
) {
    'use strict';

    function service (context) {
        var response = {};

        switch (context.request.method) {
            case 'GET':
                response = ExampleUserPreferencesModel.get(context.request)
                break;
            case 'POST': 
                response = ExampleUserPreferencesModel.post(context.request)
                break;
        }

        context.response.write(JSON.stringify(response));
    }

    return {
        service: service
    }
})