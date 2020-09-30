// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('UserPreferences.Model'
, [
    'Backbone'
  , 'underscore'
  ]
, function
  (
    Backbone
  , _
  )
{
  'use strict';

  // Models are what handle the data of a site. Note that there are backend and frontend models. This is the frontend model.
  return Backbone.Model.extend({
    // Connects the model to the service you want to use.
    urlRoot: _.getAbsoluteUrl('services/UserPreferences.Service.ss')

    // Validation is built into SCA models, so all you need to do is pass it an object of the data you want to validate.
    // See http://thedersen.com/projects/backbone-validation/
  , validation:
    {
      'type':
      {
        required: true
      , msg: 'Please select a type'
      }
    , 'value':
      {
        required: true
      , msg: 'Please enter a value'
      }
    }
  });
});