// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('Artist.Router', [
  'Backbone',
  'Artist.List.View',
  'Artist.Model',
  'Artist.Edit.View',
  'Artist.Collection',
  'jQuery'
  ], function (Backbone, ListView, Model, EditView, Collection, jQuery) {
  return Backbone.Router.extend({
    initialize: function(application) {
      this.application = application;
    },
    routes: {
      'artists': 'artistList',
      'artists/new': 'artistDetails',
      'artists/:id': 'artistDetails'
    },
    artistList: function () {
      var collection = new Collection();
      var view = new ListView({collection: collection, application: this.application});
      collection.fetch().done(function() {
        view.showContent();
      });
    },
    artistDetails: function (id) {
      var model = new Model();
      var promise = jQuery.Deferred();
      var self = this;

      if (!id) {
        promise.resolve();
      } else {
        model.fetch({
          data: {
            internalid: id
          }
        }).done(function () {
          promise.resolve();
        });
      }
      promise.done(function () {
        var view = new EditView({model: model, application: self.application});
        view.showContent();
        view.model.on('sync', function (model) {
            Backbone.history.navigate('artists', {trigger: true});
        });
      });
    }
  });
});