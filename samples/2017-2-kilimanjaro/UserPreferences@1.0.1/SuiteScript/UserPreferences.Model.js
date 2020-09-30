// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('UserPreferences.Model'
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
    name: 'UserPreferences'

  , list: function ()
    {
      return [
        {internalid: 1, type: 'Color', value: '7'}
      , {internalid: 2, type: 'Size', value: '5'}
      ]
    }
  })
});