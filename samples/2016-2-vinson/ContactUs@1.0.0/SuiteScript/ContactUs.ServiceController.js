// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('ContactUs.ServiceController'
, [
    'ServiceController'
  , 'Application'
  , 'ContactUs.Model'
  ]
, function
  (
    ServiceController
  , Application
  , ContactUsModel
  )
{
  'use strict';

  return ServiceController.extend({
    name: 'ContactUs.ServiceController'

  , post: function()
    {
      this.sendContent(ContactUsModel.create(this.data));
    }
  });
});