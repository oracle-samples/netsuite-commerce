// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('Example.ExamplePageTypes.ExampleLandingPage.View'
, [
    'PageType.Base.View'

  , 'example_page_types_example_landing_page.tpl'
  ]
, function
  (
    PageType

  , example_page_types_example_landing_page_tpl
  )
{
  'use strict';

  return PageType.PageTypeBaseView.extend
  ({
    template: example_page_types_example_landing_page_tpl

  , initialize: function initialize (options)
    {
      // pageInfo will return be undefined (and therefore cause an error with loading) if your page is improperly defined or created
      this.pageInfo = options.pageInfo;
    }

  , getContext: function getContext ()
    {
      // if you just want to send the whole object with no modifications then you could use:
      // return this.pageInfo
      // But this method lets you return the entire object plus an object with your own additions/modifications
      // Alternatively, you could just use the normal method of manually adding the properties that you want returned
      return _.extend(this.pageInfo
    , {
        myTestString: 'This is a test string I added in the view'
      });
    }
  });
});