// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('ModuleOne.View'
, [
    'Backbone'
  , 'module_one.tpl'
  ]
, function
  (
    Backbone
  , module_one_tpl
  )
{
  'use strict';

  return Backbone.View.extend({
    template: module_one_tpl

  , getContext: function ()
    {
      return {
        message: 'This is ' + this.options.moduleName
      , image: 'img/' + this.options.moduleName + '/img1.jpg'
      }
    }
  })
})