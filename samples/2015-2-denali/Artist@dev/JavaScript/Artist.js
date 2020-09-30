// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('Artist',
  [
  'Artist.Router'
  ],
  function (Router) {
    'use strict';
    return {
      MenuItems: {
        parent: 'settings',
        id: 'artistslist',
        name: 'Artists List',
        url: 'artists',
        index: 0
      },

      mountToApp: function(application) {
        return new Router(application);
      }
    }
  }
);