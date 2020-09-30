// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('MyReviews.Details.View'
, [
    'Backbone'
  , 'myreviews_details.tpl'
  ]
, function
  (
    Backbone
  , myreviews_details_tpl
  )
{
  return Backbone.View.extend ({
    template: myreviews_details_tpl

  , getContext: function()
    {
      // return a product image, it doesn't matter which one (so just get the first)
      var images = this.model.get('itemimages_detail')
      , firstImageUrl = images.media[Object.keys(images.media)[0]].urls["0"].url;

      return {
        reviewid: this.model.get('reviewid')
      , rating: this.model.get('rating')
      , text: this.model.get('text')
      , itemid: this.model.get('itemid')
      , created: this.model.get('created')
      , displayname: this.model.get('displayname')
      , urlcomponent: this.model.get('urlcomponent')
      , image: firstImageUrl
      }
    }
  })
});