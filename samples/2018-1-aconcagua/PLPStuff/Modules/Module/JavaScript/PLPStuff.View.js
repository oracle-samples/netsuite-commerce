// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('PLPStuff.View'
, [
    'plpstuff_banner.tpl'

  , 'underscore'
  ]
, function
  (
    plpstuff_banner_tpl

  , _
  )
{
  'use strict';

  return Backbone.View.extend({
    template: plpstuff_banner_tpl

  , initialize: function initialize (options)
    {
      // The PLP variable is not (or shouldn't be!) available globally, so we've passed it in the view constructor to the initialize statement so that it can be referenced in this view
      this.PLP = options.PLP
    }

    // We need a function to determine when to show the banner; it needs to be conditional on whether a particular filter is currently applied to the search results or not
  , showBanner: function showBanner ()
    {
      // PLP.getFilters() will return a collection of all the filters
      // So, we wrap in it in an Underscore find() method to track down a particular filter, which then returns an object
      // Once we have that object, we check whether it is not empty; not being empty means that it found at least one filter that matches our requirements
      return !_.isEmpty(_.find(this.PLP.getFilters(), function (filter)
      {
        return filter.value == 'orange'
      }))
    }

  , getContext: function getContext ()
    {
      return {
        bannerUrl: 'img/lookingfororangethings.png'
      , showBanner: this.showBanner()
      }
    }
  })
});