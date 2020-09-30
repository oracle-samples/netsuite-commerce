// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

function service(request) {
  var Application = require('Application');
  var method = request.getMethod();
  var action = request.getParameter('action');

  try {
    switch (method) {

    case 'GET':

      switch (action) {

        case 'forbidden':
          Application.sendError(forbiddenError);

          break;

        case 'internal':
          Application.sendError({
            status: 500,
            code: 'ERR_INTERNAL_SERVER_ERROR',
            message: 'Internal Error'
          });

          break;

        default:
          Application.sendError(methodNotAllowedError);
      }

      break;

    default:
      Application.sendError(methodNotAllowedError);
    }

  } catch (e) {
      Application.sendError(e);
  }
}