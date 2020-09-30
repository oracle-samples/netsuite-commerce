// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('Example.ExamplePageTypes.AboutUs.Details.View'
, [
    'Backbone'
  , 'Example.ExamplePageTypes.AboutUs.Model'

  , 'example_page_types_about_us_details.tpl'

  , 'AjaxRequestsKiller'
  ]
, function
  (
    Backbone
  , AboutUsModel

  , example_page_types_about_us_details_tpl

  , AjaxRequestsKiller
  )
{
  'use strict';

  return Backbone.View.extend({
    template: example_page_types_about_us_details_tpl

  , attributes:
    {
      id: 'AboutUsDetails'
    , class: 'aboutus-details'
    }

  , getBreadcrumbPages: function ()
    {
      return [{text: 'About Us', href: '/about-us'}, {text: this.model.get('name')}]
    }

  , initialize: function initialize (options)
    {
      this.application = options.application;
      this.model = new AboutUsModel
      ({
        internalid: options.routerArguments[0]
      });
    }

  , beforeShowContent: function beforeShowContent ()
    {
      return this.model.fetch({
        killerId: AjaxRequestsKiller.getKillerId()
      })
    }

  , getContext: function getContext ()
    {
      return {
        model: this.model
      , internalid: this.model.get('internalid')
      , image: this.model.get('image')
      , name: this.model.get('name')
      , blurb: this.model.get('blurb')
      }
    }
  })
})