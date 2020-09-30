// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('Artist.Details.View',
  [
  'Backbone',
  'artist_details.tpl'
  ],
  function (Backbone, artist_details_template) {
    return Backbone.View.extend({
      getContext: function () {
        return {
          'name': this.model.get('name'),
          'genre': this.model.get('genre'),
          'internalid': this.model.get('internalid')
        }
      },

      template: artist_details_template

    });
  }
);