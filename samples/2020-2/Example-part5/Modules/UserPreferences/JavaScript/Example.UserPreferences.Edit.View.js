// Copyright (c) 2021, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.
define('Example.UserPreferences.Edit.View', [
    'PageType.Base.View',
    'Example.UserPreferences.Form.View',
    'Example.UserPreferences.Model',
    'example_userpreferences_edit.tpl',
    'jQuery'
], function (
    PageTypeBaseView,
    ExampleUserPreferencesFormView,
    ExampleUserPreferencesModel,
    example_userpreferences_edit_tpl,
    jQuery
) {
    'use strict';

    return PageTypeBaseView.PageTypeBaseView.extend({
        template: example_userpreferences_edit_tpl,

        initialize: function initialize () {
            this.model = new ExampleUserPreferencesModel();
        },

        beforeShowContent: function beforeShowContent () {
            this.childViews = {
                'Example.UserPreferences.Form.View': function () {
                    return new ExampleUserPreferencesFormView({
                        model: this.model
                    })
                }
            }

            if (!!Number(this.options.routerArguments[0])) {
                return this.model.fetch({
                    data: {internalid: this.options.routerArguments[0]}
                })
            }
            else {
                return jQuery.Deferred().resolve()
            }
        },

        getContext: function getContext () {
            return {
                model: this.model
            }
        }
    })
})