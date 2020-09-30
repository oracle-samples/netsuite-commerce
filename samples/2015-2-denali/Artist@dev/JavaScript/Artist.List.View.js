// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('Artist.List.View', [
'Backbone',
'artist_list.tpl',
'Backbone.CollectionView',
'Backbone.CompositeView',
'Artist.Details.View',
'GlobalViews.Confirmation.View',
'jQuery'
], function (Backbone, artist_list_tpl, CollectionView, CompositeView, ArtistDetailsView, ConfirmationView, jQuery) {
   return Backbone.View.extend({
    initialize: function (options) {
      CompositeView.add(this);
      this.application = options.application;
      this.collection = options.collection;

      var self = this;
      this.collection.on('reset sync add remove change destroy', function() {
        self.render();
      });
    },

    getBreadcrumbPages: function() {
      return [{text: 'Artists', href: '/artists'}]
    },

    getSelectedMenu: function() {
      return 'artistslist'
    },

    childViews: {
      'Artist.Collection': function() {
        return new CollectionView({
          'childView': ArtistDetailsView,
          'collection': this.collection,
          'viewsPerRow': 1
        });
      }
    },

    template: artist_list_tpl,

    events: {
      'click button[data-action="remove"]': 'removeArtist'
    },

    removeModel: function(options) {
      var model = options.context.collection.get(options.id);
      model.destroy();
    },

    removeArtist: function(e) {
      e.preventDefault();
      var view = new ConfirmationView({
        title: 'Remove Artist',
        body: 'Are you sure you want to remove this artist?',
        callBack: this.removeModel,
        callBackParameters: {
          context: this,
          id: jQuery(e.target).data('id')
        },
        autohide: true
      });
      this.application.getLayout().showInModal(view);
    }
   });
});