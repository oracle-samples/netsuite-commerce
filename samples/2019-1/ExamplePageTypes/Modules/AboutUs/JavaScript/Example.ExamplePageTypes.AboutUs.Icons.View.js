// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('Example.ExamplePageTypes.AboutUs.Icons.View'
, [
    'Backbone'
  , 'Example.ExamplePageTypes.AboutUs.Model'

  , 'example_page_types_about_us_icons.tpl'
  ]
, function
  (
    Backbone
  , AboutUsModel

  , example_page_types_about_us_icons_tpl
  )
{
  'use strict';

  return Backbone.View.extend({
    template: example_page_types_about_us_icons_tpl

  , attributes:
    {
      id: 'AboutUsIcons'
    , class: 'aboutus-icons'
    }

  , initialize: function initialize (options)
    {
      this.application = options.application;
      this.model = options.model
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