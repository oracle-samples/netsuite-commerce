// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('ErrorService.Router',
  [
    'Backbone'
  , 'ErrorManagement.ForbiddenError.View'
  , 'ErrorManagement.InternalError.View'
  , 'ErrorManagement.PageNotFound.View'
  ]
, function (
    Backbone
  , ForbiddenView
  , InternalErrorView
  , PageNotFoundView
  )
{
  return Backbone.Router.extend({

    initialize: function(application) {
      this.application = application;
    },

    routes: {
      'error/forbidden': 'errorForbidden'
    , 'error/internal': 'errorInternal'
    , 'error/notfound': 'errorNotFound'
    },

    errorForbidden: function() {
      var view = new ForbiddenView({application: this.application});
      view.showContent();
      console.warn('Simulated Error 403');
    },

    errorInternal: function() {
      var view = new InternalErrorView({application: this.application});
      view.showContent();
      console.warn('Simulated Error 500');
    },

    errorNotFound: function() {
      var view = new PageNotFoundView({application: this.application});
      view.showContent();
      console.warn('Simulated Error 404');
    }
  });
});