// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('ExampleSuiteScript.Model'
, [
    'Models.Init'
  , 'SC.Model'
  ]
, function
  (
    CommerceAPI
  , SCModel
  )
{

  'use strict';

  return SCModel.extend({
    name: 'ExampleSuiteScript'

  , get: function (id)
    {
      return {
        internalid: '0'
      , faveColor: 'red'
      , faveNumber: '7'
      , faveFruit: 'apple'
      }
    }

  , update: function (id, data)
    {
      return null
    }

  , create: function (data)
    {
      return null
    }

  , remove: function (id)
    {
      return null
    }
  })
});