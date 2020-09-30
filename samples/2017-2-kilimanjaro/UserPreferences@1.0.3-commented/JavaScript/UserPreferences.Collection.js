// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('UserPreferences.Collection'
, [
    'Backbone'
  , 'UserPreferences.Model'
  , 'underscore'
  ]
, function
  (
    Backbone
  , UserPreferencesModel
  , _
  )
{
  'use strict';

  // Collections are used to handle data for multiple records. They are ideal for lists and tables because you want to display each record the same way - with the same view, template and styling.
  return Backbone.Collection.extend({
    model: UserPreferencesModel
    // Note that we use 'url' here rather than 'urlroot' like we do in frontend models
  , url: _.getAbsoluteUrl('services/UserPreferences.Service.ss')
  });
});