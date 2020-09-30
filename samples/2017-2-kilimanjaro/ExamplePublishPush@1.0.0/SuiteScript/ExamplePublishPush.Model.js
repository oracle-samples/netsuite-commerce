// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('ExamplePublishPush.Model'
, [
    'SC.Model'
  ]
, function
  (
    SCModel
  )
{
  'use strict';

  return SCModel.extend({
    name: 'ExamplePublishPush'

  , setSomeValueOrSomething: function ()
    {
      // Call my thing, do some work, etc
      return 'Looks like everything loaded just fine'
    }
  })
});