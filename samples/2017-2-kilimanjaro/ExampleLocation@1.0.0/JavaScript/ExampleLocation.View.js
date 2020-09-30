// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('ExampleLocation.View'
, [
    'Backbone'

  , 'example_location.tpl'
  ]
, function
  (
    Backbone

  , Template
  )
{
  'use strict'

  return Backbone.View.extend ({

    getContext: function ()
    {
      return {
        name: this.model.get('name')
      , latitude: this.model.get('latitude')
      , longitude: this.model.get('longitude')
      }
    }

  , initialize: function (options)
    {
      this.options = options;
      this.application = options.application;
    }

  , template: Template
  });
});