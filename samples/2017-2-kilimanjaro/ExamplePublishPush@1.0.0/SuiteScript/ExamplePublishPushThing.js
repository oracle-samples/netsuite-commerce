// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('ExamplePublishPushThing'
, [
    'Configuration'
  ]
, function ExamplePublishPushThing
  (
     Configuration
  )
{
  'use strict';

  Configuration.publish = Configuration.publish || [];

  Configuration.publish.push({
    key: 'ExamplePublishPush'
  , model: 'ExamplePublishPush.Model'
  , call: 'setSomeValueOrSomething'
  });
});