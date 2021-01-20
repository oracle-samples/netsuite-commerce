// Copyright (c) 2021, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.
define('Example.UserPreferences.List.View', [
    'PageType.Base.View',
    'Example.UserPreferences.Collection',
    'Example.UserPreferences.Collection.View',
    'example_userpreferences_list.tpl'
], function (
    PageTypeBaseView,
    ExampleUserPreferencesCollection,
    ExampleUserPreferencesCollectionView,
    example_userpreferences_list_tpl
) {
    'use strict';

    return PageTypeBaseView.PageTypeBaseView.extend({
        template: example_userpreferences_list_tpl,

        initialize: function initialize () {
            this.collection = new ExampleUserPreferencesCollection();
        },

        beforeShowContent: function beforeShowContent () {
            this.childViews = {
                'Example.UserPreferences.Collection.View': function () {
                    return new ExampleUserPreferencesCollectionView({
                        collection: this.collection
                    })
                }
            }

            return this.collection.fetch()
        }
    })
});