// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('MyReviews.List.View'
, [
    'Backbone'
  , 'Backbone.CollectionView'
  , 'Backbone.CompositeView'
  , 'MyReviews.Details.View'
  , 'myreviews_list.tpl'
  , 'jQuery'
  , 'Application'
  ]
, function
  (
    Backbone
  , CollectionView
  , CompositeView
  , DetailsView
  , myreviews_list_tpl
  , jQuery
  , Application
  )
{
  return Backbone.View.extend ({

    template: myreviews_list_tpl

  , initialize: function (options)
    {
      CompositeView.add(this);
      this.application = options.application;
      this.collection = options.collection;
    }

  , childViews:
    {
      'MyReviews.Collection': function ()
      {
        return new CollectionView ({
          childView: DetailsView
        , collection: this.collection
        , viewsPerRow: 1
        })
      }
    }
  })
});