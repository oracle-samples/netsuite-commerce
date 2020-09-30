// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('ModuleTwo'
, [
    'ModuleOne.View'
  ]
, function
  (
    ModuleOneView
  )
{
  'use strict';

  return {
    name: 'ModuleTwo'

  , mountToApp: function (container)
    {
      console.log(this.name + ' loaded!');
      var Layout = container.getComponent('Layout');

      var self = this;
      Layout.addChildView('cms:header_banner_top', function ()
      {
        return new ModuleOneView({moduleName: self.name});
      });
    }
  }
})