// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('UserPreferences.Details.View'
, [
    'Backbone'
  , 'user_preferences_details.tpl'
  ]
, function
  (
    Backbone
  , user_preferences_details_tpl
  )
{
  'use strict';

  // Details views are used for displaying the results of a specific model. Which model to use is determined by the model passed it when it is constructed by the router.
  return Backbone.View.extend({
    // Every view needs a template
    template: user_preferences_details_tpl

    // The getContext function is there to pass data to the template in the form of the object. Each key can be referenced in the template like this: '{{internalid}}'.
    // Before you return the context object, you can perform some other stuff, like generate results or perform transformations. Generally speaking, it's good to do those before returning them because it keeps the object a bit cleaner.
  , getContext: function ()
    {
      return {
        'internalid': this.model.get('internalid')
      , 'type': this.model.get('type')
      , 'value': this.model.get('value')
      }
    }
  })
});