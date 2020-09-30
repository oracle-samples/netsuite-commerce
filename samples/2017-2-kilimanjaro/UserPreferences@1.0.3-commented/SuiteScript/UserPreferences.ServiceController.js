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

  // Service controllers are a relatively modern creation in terms of SCA. We use them to automatically generate a service file. It simplifies the process, as well as gives us the ability to do some cool stuff (that we're not doing in our module).
  // See https://developers.suitecommerce.com/til-thursday-find-out-about-the-new-service-controllers
  return ServiceController.extend({
    // Every service controller must have a name (usually matching the name of module).
    name: 'UserPreferences.ServiceController'

    // Service controllers must match the HTTP method names (ie GET, POST, PUT, DELETE)
  , get: function ()
    {
      // In our functionality, GETs come in two flavors: get a specific record, or get a list of records. We tell the difference by plucking out the ID from the request - if it exists then we know that the user is searching for a specific record, and so we run the model's .get() method; otherwise, we just get a list of results.
      var id = this.request.getParameter('internalid');
      return id ? UserPreferencesModel.get(id) : UserPreferencesModel.list();
    }

  , post: function()
    {
      // This creates a new record by passing the frontend model's data to the backend model's create() method. A 201 ('created') status is then returned to the user, if successful.
      this.sendContent(UserPreferencesModel.create(this.data), {'status': 201});
    }

  , put: function ()
    {
      // This updates an existing record by taking the internal ID from the request and passing it, along with the data, to the backend model's update() method. It returns a get request, which you can see in your network tab if you inspect the service making the request (this last bit is unnecessary, so you could go without).
      var id = this.request.getParameter('internalid');
      UserPreferencesModel.update(id, this.data);
      return UserPreferencesModel.get(id);
    }

  , delete: function ()
    {
      // This updates an existing record by taking the internal ID from the request and passing it to the backend model's delete() method. It returns an 'OK' status, which, again, you can see in your Network tab.
      var id = this.request.getParameter('internalid');
      UserPreferencesModel.delete(id);
      return {'status': 'ok'}
    }
  })
});