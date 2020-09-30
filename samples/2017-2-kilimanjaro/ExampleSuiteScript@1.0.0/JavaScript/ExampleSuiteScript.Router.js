// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('ExampleSuiteScript.Router'
, [
    'Backbone'

  , 'ExampleSuiteScript.View'
  , 'ExampleSuiteScript.Model'
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
      'examplesuitescript': 'loadTheModel'
    }

  , initialize: function (application)
    {
      this.application = application;
    }

  , loadTheModel: function ()
    {
      var model = new Model()
        , self = this;

      model.fetch().done(function ()
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