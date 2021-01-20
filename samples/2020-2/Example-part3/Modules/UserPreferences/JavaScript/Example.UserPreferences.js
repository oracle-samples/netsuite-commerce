// Copyright (c) 2021, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.
define('Example.UserPreferences', [
    'Example.UserPreferences.List.View'
], function (
    ExampleUserPreferencesListView
) {
    'use strict';

    return {
        mountToApp: function (container) {
            var PageType = container.getComponent('PageType');

            PageType.registerPageType({
                name: 'example_userpreferences_list',
                routes: ['preferences'],
                view: ExampleUserPreferencesListView,
                defaultTemplate: {
                    name: 'example_userpreferences_list.tpl',
                    displayName: 'User Preferences List'
                }
            });
        }
    }
});