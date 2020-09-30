// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('Artist.Collection',
  [
  'Backbone',
  'Artist.Model'
  ],
  function (Backbone, Model) {
    return Backbone.Collection.extend({
      model: Model,
      url: _.getAbsoluteUrl('services/Artist.Service.ss')
    });
  }
);