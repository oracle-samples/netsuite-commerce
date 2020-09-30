// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('ExampleCorrelated.View'
, [
    'Backbone'

  , 'ItemRelations.Correlated.View'

  , 'example_correlated.tpl'
  ]
, function
  (
    Backbone

  , ItemRelationsCorrelatedView

  , Template
  )
{
  'use strict'

  return Backbone.View.extend ({
    initialize: function (options)
    {
      this.options = options;
      this.application = options.application;
    }

  , template: Template

  , childViews: {
      'Correlated.Items': function ()
      {
        return new ItemRelationsCorrelatedView({
          itemsIds: this.model.get('ids')
        , application: this.application
        });
      }
    }

  , getContext: function ()
    {
      return {
        ids: this.model.get('ids')
      }
    }
  });
});