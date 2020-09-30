// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('Example.ExamplePageTypes.AboutUs.List.View'
, [
    'Backbone'
  , 'Backbone.CollectionView'
  , 'Example.ExamplePageTypes.AboutUs.Icons.View'
  , 'Example.ExamplePageTypes.AboutUs.Collection'

  , 'example_page_types_about_us_list.tpl'

  , 'AjaxRequestsKiller'
  ]
, function
  (
    Backbone
  , CollectionView
  , AboutUsIconsView
  , AboutUsCollection

  , example_page_types_about_us_list_tpl

  , AjaxRequestsKiller
  )
{
  'use strict';

  // use the following if you plan to make them CMS-creatable
  // return PageType.PageTypeBaseView.extend({
  return Backbone.View.extend({
    template: example_page_types_about_us_list_tpl

  , getBreadcrumbPages: function ()
    {
      return [{text: 'About Us', url: 'about-us'}]
    }

  , attributes:
    {
      id: 'AboutUsList'
    , class: 'aboutus-list'
    }

  , initialize: function initialize (options)
    {
      this.application = options.application;
      this.collection = new AboutUsCollection();
    }

  , childViews:
    {
      'AboutUs.Collection': function ()
      {
        return new CollectionView({
          childView: AboutUsIconsView
        , collection: this.collection
        })
      }
    }

  , beforeShowContent: function beforeShowContent ()
    {
      return this.collection.fetch({
        killerId: AjaxRequestsKiller.getKillerId()
      })
    }
  })
})