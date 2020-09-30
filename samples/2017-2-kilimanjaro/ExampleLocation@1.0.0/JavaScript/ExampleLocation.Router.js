// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('ExampleLocation.Router'
, [
    'Backbone'

  , 'ExampleLocation.View'
  , 'ExampleLocation.Model'
  ]
, function
  (
    Backbone

  , View
  , Model
  )
{
  'use strict';

  return Backbone.Router.extend ({
    routes:
    {
      'examplelocation/:id': 'details'
    }

  , initialize: function (application)
    {
      this.application = application;
    }

  , details: function (id)
    {
      var model = new Model()
        , self = this;

      model.fetch({data: {internalid: id}}).done(function ()
      {
        var view = new View
        ({
          application: self.application
        , model: model
        });

        view.showContent();
      });
    }
  })
});