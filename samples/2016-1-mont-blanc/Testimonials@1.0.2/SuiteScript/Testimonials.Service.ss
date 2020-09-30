// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

function service (request) {
  'use strict';

  var Application = require('Application');
  var method = request.getMethod();
  var Testimonials = require('Testimonials.Model');
  var requestBody;

  try {
    requestBody = JSON.parse(request.getBody() || '{}');

    switch (method) {

      case 'GET':
        Application.sendContent(Testimonials.list());
        break;

      case 'POST':
        Testimonials.create(requestBody);
        Application.sendContent({message: 'Success'}, {status: '201'});
        break;

      default:
        Application.sendError(methodNotAllowedError);
    }
  } catch (e) {
    Application.sendError(e);
  }
}