// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

function service (request)
{
  'use strict';

  var Application = require('Application');

  try
  {
    if (session.isLoggedIn())
    {
      var method = request.getMethod()
      , id = request.getParameter('internalid')
      , Model = require('ExampleSuiteScript.Model')
      , data = JSON.parse(request.getBody() || '{}');

      switch (method)
      {
        case 'GET':
          Application.sendContent(id ? Model.get(id) : Model.list());
        break;

        case 'PUT':
          Model.update(id, data);
          Application.sendContent(Model.get(id));
        break;

        case 'POST':
          id = Model.create(data);
          Application.sendContent(Model.get(id), {'status': 201});
        break;

        case 'DELETE':
          Model.remove(id);
          Application.sendContent({'status': 'ok'});
        break;

        default:
          Application.sendError(methodNotAllowedError);
      }
    }
    else
    {
      Application.sendError(unauthorizedError);
    }
  }
  catch (e)
  {
    Application.sendError(e);
  }
}