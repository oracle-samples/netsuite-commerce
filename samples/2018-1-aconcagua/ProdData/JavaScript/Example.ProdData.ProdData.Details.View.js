// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('Example.ProdData.ProdData.Details.View'
, [
    'Backbone'

  , 'example_proddata_proddata_details.tpl'
  ]
, function
  (
    Backbone

  , example_proddata_proddata_details_tpl
  )
{
  'use strict';

  return Backbone.View.extend(
  {
    template: example_proddata_proddata_details_tpl

  , getContext: function ()
    {
      return {
        'displayname': this.model.get('displayname')
      }
    }
  })
});