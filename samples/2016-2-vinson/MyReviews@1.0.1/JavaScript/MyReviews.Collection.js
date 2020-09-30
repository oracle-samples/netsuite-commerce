// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('MyReviews.Collection'
, [
    'Backbone'
  , 'MyReviews.Model'
  , 'underscore'
  ]
, function
  (
    Backbone
  , Model
  , _
  )
{
  return Backbone.Collection.extend({
    model: Model
  , url: _.getAbsoluteUrl('services/MyReviews.Service.ss')
  })
});