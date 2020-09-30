// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('UserPreferences.ServiceController'
, [
    'ServiceController'
  , 'UserPreferences.Model'
  ]
, function
  (
    ServiceController
  , UserPreferencesModel
  )
{
  'use strict';

  return ServiceController.extend({
    name: 'UserPreferences.ServiceController'

  , get: function ()
    {
      var id = this.request.getParameter('internalid');
      return id ? UserPreferencesModel.get(id) : UserPreferencesModel.list();
    }

  , post: function()
    {
      this.sendContent(UserPreferencesModel.create(this.data), {'status': 201});
    }

  , put: function ()
    {
      var id = this.request.getParameter('internalid');
      UserPreferencesModel.update(id, this.data);
      return UserPreferencesModel.get(id);
    }

  , delete: function ()
    {
      var id = this.request.getParameter('internalid');
      UserPreferencesModel.delete(id);
      return {'status': 'ok'}
    }
  })
});