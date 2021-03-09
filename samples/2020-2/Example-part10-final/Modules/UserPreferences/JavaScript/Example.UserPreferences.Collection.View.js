// Copyright (c) 2021, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.
define('Example.UserPreferences.Collection.View', [
    'SCCollectionView',
    'Example.UserPreferences.Details.View',
    'example_userpreferences_collection.tpl',
    'jQuery'
], function (
    SCCollectionViewModule,
    ExampleUserPreferencesDetailsView,
    example_userpreferences_collection_tpl,
    jQuery
) {
    'use strict';

    var SCCollectionView = SCCollectionViewModule.SCCollectionView;

    function ExampleUserPreferencesCollectionView (options) {
        SCCollectionView.call(this, options.collection);

        this.collection = options.collection;

        this.template = example_userpreferences_collection_tpl;

        var self = this;
        this.collection.on('reset sync add remove change destroy', function () {
          self.render();
        });

        this.removeUserPreference = function (e) {
            e.preventDefault();

            var id = jQuery(e.target).data('id');
            var model = this.collection.get(id);
            model.destroy();
        }
    }

    ExampleUserPreferencesCollectionView.prototype = Object.create(SCCollectionView.prototype);
    ExampleUserPreferencesCollectionView.prototype.constructor = ExampleUserPreferencesCollectionView;

    ExampleUserPreferencesCollectionView.prototype.getCellViewsPerRow = function () {
        return 1
    }

    ExampleUserPreferencesCollectionView.prototype.getCellViewInstance = function (model) {
        return new ExampleUserPreferencesDetailsView({
            model: model
        })
    }
    
    ExampleUserPreferencesCollectionView.prototype.getEvents = function () {
        return {
            'click button[data-action="delete"]': 'removeUserPreference'
        }
    }
    
    ExampleUserPreferencesCollectionView.prototype.getContext = function () {
        return {}
    }

    return ExampleUserPreferencesCollectionView
})