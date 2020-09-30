// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('Example.RemoveAll.RemoveAll'
, [
    'LiveOrder.Model'
  , 'LiveOrder.ServiceController'
  , 'SC.Models.Init'
  ]
, function
  (
    LiveOrderModel
  , LiveOrderServiceController
  , ModelsInit
  )
{
  'use strict';

  LiveOrderModel.removeAllLines = function ()
  {
    ModelsInit.order.removeAllItems();
  }

  LiveOrderServiceController.delete = function ()
  {
    LiveOrderModel.removeAllLines();
    return LiveOrderModel.get() || {}
  }
});