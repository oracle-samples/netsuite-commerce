// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('Artist.Edit.View',
  [
  'Backbone',
  'artist_edit.tpl',
  'Backbone.FormView'
  ],
  function (Backbone, artist_edit_template, FormView) {
    return Backbone.View.extend({
      initialize: function(options) {
        this.application = options.application;
        this.model = options.model;
        FormView.add(this);
      },
      template: artist_edit_template,
      events: {
        'submit form': 'saveForm'
      },
      getBreadcrumbPages: function() {
        if (this.model.isNew()) {
          return [
            {text: 'Artists', href: '/artists'},
            {text: 'New', href: '/artists/new'}
          ]
        } else {
          return [
            {text: 'Artists', href: '/artists'},
            {text: 'Edit', href: '/artists/' + this.model.get('internalid')}
          ]
        }
      },
      getSelectedMenu: function() {
        return 'artistslist'
      },
      getContext: function() {
        return {
          isNew: this.model.isNew(),
          id: this.model.get('internalid'),
          name: this.model.get('name'),
          genre: this.model.get('genre')
        }
      }
    });
  }
)