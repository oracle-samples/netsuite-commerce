// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('Example.ExamplePageTypes.AboutUs'
, [
    'underscore'
  , 'Example.ExamplePageTypes.AboutUs.List.View'
  , 'Example.ExamplePageTypes.AboutUs.Details.View'
  , 'Example.ExamplePageTypes.ExampleLandingPage'
  ]
, function
  (
    _
  , AboutUsListView
  , AboutUsDetailsView
  , ExampleLandingPage
  )
{
  'use strict';

  return {
    mountToApp: function mountToApp (container)
    {
      ExampleLandingPage.mountToApp(container); // How to call an entry point file in another module

      var PageType = container.getComponent('PageType');

      PageType.registerPageType
      ({
        name: 'pagetype_aboutus_list'
      , view: AboutUsListView
      , routes: ['about-us']
      , defaultTemplate:
        {
          name: 'example_page_types_about_us_list.tpl'
        , displayName: 'About Us List View (Default)'
        }
      });

      PageType.registerPageType
      ({
        name: 'pagetype_aboutus_details'
      , view: AboutUsDetailsView
      , routes: ['about-us/:id']
      , defaultTemplate:
        {
          name: 'example_page_types_about_us_details.tpl'
        , displayName: 'About Us Details View (Default)'
        }
      });

      PageType.registerTemplate
      ({
        pageTypes: ['pagetype_aboutus_details']
      , template:
        {
          name: 'example_page_types_about_us_details_crown.tpl'
        , displayName: 'Employee of the Month'
        }
      })
    }
  }
})