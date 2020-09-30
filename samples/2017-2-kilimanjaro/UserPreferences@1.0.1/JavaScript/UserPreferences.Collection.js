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

  return Backbone.Collection.extend({
    model: UserPreferencesModel
  , url: _.getAbsoluteUrl('services/UserPreferences.Service.ss')
  });
});