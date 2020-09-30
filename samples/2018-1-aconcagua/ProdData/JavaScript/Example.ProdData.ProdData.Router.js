// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('Example.ProdData.ProdData.Router'
, [
    'Backbone'

  , 'Item.Collection'

  , 'Example.ProdData.ProdData.List.View'
  ]
, function
  (
    Backbone

  , ItemCollection

  , ProdDataListView
  )
{
  'use strict';

  return Backbone.Router.extend(
  {
    routes:
    {
      // Going to #proddata does nothing, but adding a / and a keyword will call the prodData function
      'proddata/:keyword': 'prodData'
    }

  , initialize: function initialize (application)
    {
      this.application = application
    }

    // Note how we pass the keyword
  , prodData: function prodData (keyword)
    {
      // Rather than create our own collection, we're just using one of the ones built into SuiteCommerce. It's already configured to call the items API using the correct base URL and send the right parameter
      var collection = new ItemCollection()

    , view = new ProdDataListView(
      {
        application: this.application
      , collection: collection
      })

    , query = {
        // Remember, it doesn't need to be a keyword. Check out the documentation for all the other possible parameter you can use with the item search API (eg commercecategoryurl for a particular category)
        q: keyword
        // You should create and use an optimized fieldset for your specific purposes to make API calls quicker. We're using details because it has a lot of item data already exposed, so is useful for tinkering
      , fieldset: 'details'
      };

      collection.fetch({data: query})
      .done(function ()
      {
        // We constructed the view above, already passing it the collection. So when the data's received, it'll instatiate the view using the data already
        view.showContent();
      });
    }
  })
});