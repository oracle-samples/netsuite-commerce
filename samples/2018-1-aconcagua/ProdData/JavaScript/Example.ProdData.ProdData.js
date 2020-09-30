// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('Example.ProdData.ProdData'
, [
    'Example.ProdData.ProdData.Router'
  ]
, function
  (
    ProdDataRouter
  )
{
  'use strict';

  return {
    mountToApp: function mountToApp (container)
    {
      return new ProdDataRouter(container)
    }
  }
});