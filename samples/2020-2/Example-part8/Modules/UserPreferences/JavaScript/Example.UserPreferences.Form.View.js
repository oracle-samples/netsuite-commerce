// Copyright (c) 2021, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.
define('Example.UserPreferences.Form.View', [
    'Backbone',
    'SCFormView',
    'Example.UserPreferences.Helper',
    'Utils',
    'example_userpreferences_form.tpl'
], function (
    Backbone,
    SCFormViewModule,
    ExampleUserPreferencesHelper,
    Utils,
    example_userpreferences_form_tpl
) {
    'use strict';

    var SCFormView = SCFormViewModule.SCFormView;

    function ExampleUserPreferencesFormView (options) {
        SCFormView.call(this, options.model);

        this.formModel.on('sync', function () {
            Backbone.history.navigate('preferences', {trigger: true});
        });

        this.template = example_userpreferences_form_tpl;
    }

    ExampleUserPreferencesFormView.prototype = Object.create(SCFormView.prototype)
    ExampleUserPreferencesFormView.prototype.constructor = ExampleUserPreferencesFormView;

    ExampleUserPreferencesFormView.prototype.getEvents = function () {
        return {
            'submit form': 'saveForm',
            'blur :input': 'onFormFieldChange'
        }
    }

    ExampleUserPreferencesFormView.prototype.saveForm = function (e) {
        e.preventDefault();

        var promise = SCFormView.prototype.saveForm.call(this, e);

        return promise
    }
    
    ExampleUserPreferencesFormView.prototype.getFormFieldValue = function (input) {
        var field = {
            name: input.attr('name'),
            value: input.val()
        };

        if (!this.formModel.validate(field)) {
            SCFormView.prototype.removeErrorMessage.call(this, field.name)
        }

        return field
    }

    ExampleUserPreferencesFormView.prototype.getFormValues = function (form) {
        var formValues = form.serializeObject();

        return {
            type: formValues.type,
            value: formValues.value
        }
    }

    ExampleUserPreferencesFormView.prototype.getContext = function () {
        return {
            model: this.formModel,
            typeOptions: ExampleUserPreferencesHelper.getTypeOptions()
        }
    }

    return ExampleUserPreferencesFormView
})