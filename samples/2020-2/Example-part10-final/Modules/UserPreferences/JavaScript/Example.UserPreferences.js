// Copyright (c) 2021, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.
define('Example.UserPreferences', [
    'Example.UserPreferences.List.View',
    'Example.UserPreferences.Edit.View',
    'Utils'
], function (
    ExampleUserPreferencesListView,
    ExampleUserPreferencesEditView,
    Utils
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

            PageType.registerPageType({
                name: 'example_userpreferences_edit',
                routes: ['preferences/add', 'preferences/:id'],
                view: ExampleUserPreferencesEditView,
                defaultTemplate: {
                    name: 'example_userpreferences_edit.tpl',
                    displayName: 'User Preferences Edit'
                }
            });

            var MyAccountMenu = container.getComponent('MyAccountMenu');

            var UserPreferencesListGroupEntry = {
                groupid: 'settings',
                id: 'userpreferenceslist',
                name: Utils.translate('User Preferences'),
                url: 'preferences',
                index: 99
            }

            MyAccountMenu.addGroupEntry(UserPreferencesListGroupEntry);
        }
    }
});