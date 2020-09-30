// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('Example.ExamplePageTypes.ExampleLandingPage'
, [
    'Example.ExamplePageTypes.ExampleLandingPage.View'
  ]
, function
  (
    ExampleLandingPageView
  )
{
  'use strict';

  return {
    mountToApp: function mountToApp (container)
    {
      var PageType = container.getComponent('PageType');

      PageType.registerPageType
      ({
        name: 'pagetype_example_landing_page'
      , view: ExampleLandingPageView
      , defaultTemplate:
        {
          name: 'example_page_types_example_landing_page.tpl'
        , displayName: 'Example Landing Page (Default)'
        }
      })
    }
  }
});