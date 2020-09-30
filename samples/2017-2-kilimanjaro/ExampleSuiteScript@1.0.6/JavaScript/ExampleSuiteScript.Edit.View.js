// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('ExampleSuiteScript.Edit.View'
, [
    'Backbone'
  , 'Backbone.FormView'

  , 'example_suitescript_edit.tpl'
  ]
, function
  (
    Backbone
  , FormView

  , Template
  )
{
  'use strict';

  return Backbone.View.extend({
    events:
    {
      'submit form': 'saveForm'
    }

  , getBreadcrumbPages: function ()
    {
      if (this.model.isNew())
      {
        return [
          {text: 'Favorite Things', href: '/examplesuitescript'}
        , {text: 'New', href: '/examplesuitescript/new'}
        ]
      }

      else
      {
        return [
          {text: 'Favorite Things', href: '/examplesuitescript'}
        , {text: 'Edit ' + this.model.get('faveThing'), href: '/examplesuitescript/' + this.model.get('internalid')}
        ]
      }
    }

  , getContext: function ()
    {
      return {
        isNew: this.model.isNew()
      , favething: this.model.get('faveThing')
      , favereason: this.model.get('faveReason')
      }
    }

  , initialize: function (options)
    {
      this.application = options.application;
      this.model = options.model;
      FormView.add(this);
    }

  , template: Template
  })
})