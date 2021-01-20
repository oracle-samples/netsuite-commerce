// Copyright (c) 2021, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.
define('Example.UserPreferences.List.View', [
    'PageType.Base.View',
    'Example.UserPreferences.Model',
    'example_userpreferences_list.tpl'
], function (
    PageTypeBaseView,
    ExampleUserPreferencesModel,
    example_userpreferences_list_tpl
) {
    'use strict';

    return PageTypeBaseView.PageTypeBaseView.extend({
        template: example_userpreferences_list_tpl,

        initialize: function initialize () {
            this.model = new ExampleUserPreferencesModel();
        },

        beforeShowContent: function beforeShowContent () {
            return this.model.fetch()
        },

        getContext: function getContext () {
            return {
                message: this.model.get('message')
            }
        }
    })
});