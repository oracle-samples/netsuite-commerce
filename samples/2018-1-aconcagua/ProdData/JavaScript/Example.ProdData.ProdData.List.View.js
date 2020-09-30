// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('Example.ProdData.ProdData.List.View'
, [
    'Backbone'
  , 'Backbone.CollectionView'

  , 'Example.ProdData.ProdData.Details.View'

  , 'example_proddata_proddata_list.tpl'
  ]
, function
  (
    Backbone
  , CollectionView

  , ProdDataDetailsView

  , example_proddata_proddata_list_tpl
  )
{
  'use strict';

  return Backbone.View.extend(
  {
    template: example_proddata_proddata_list_tpl

  , initialize: function initialize (options)
    {
      this.application = options.application
    , this.collection = options.collection
    }

  , childViews:
    {
      'ProdData.Collection': function ()
      {
        return new CollectionView(
        {
          'childView': ProdDataDetailsView
        , 'collection': this.collection
        , 'viewsPerRow': 1
        })
      }
    }
  })
});