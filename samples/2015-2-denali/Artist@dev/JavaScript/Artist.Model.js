// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('Artist.Model',
  [
  'Backbone',
  'underscore'
  ],
  function (Backbone, _) {
    return Backbone.Model.extend({
      urlRoot: _.getAbsoluteUrl('services/Artist.Service.ss'),
      validation: {
        'name': {
          required: true,
          msg: 'Please enter an artist name'
        },
        'genre': {
          required: true,
          msg: 'Please enter a genre'
        }
      }
    });
  }
);