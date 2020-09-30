// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('ExampleSuiteScript'
, [
    'ExampleSuiteScript.Router'

  , 'SC.Configuration'
  ]
, function
  (
    Router

  , Configuration
  )
{
  'use strict';

  if (Configuration.exampleSuiteScript.enabled)
  {
    return {
      mountToApp: function (application)
      {
        return new Router(application)
      }
    }
  }
});