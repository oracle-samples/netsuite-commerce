// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('ExampleSuitelet'
, [
    'ExampleSuitelet.Router'
  ]
, function
  (
    Router
  )
{
  'use strict';

  return {
    mountToApp: function (application)
    {
      return new Router(application)
    }
  }
});