// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('Example.RemoveAll.RemoveAll.View'
, [
    'Backbone'

  , 'GlobalViews.Confirmation.View'
  , 'LiveOrder.Model'

  , 'example_removeall_removeall.tpl'
  ]
, function
  (
    Backbone

  , GlobalViewsConfirmationView
  , LiveOrderModel

  , example_removeall_removeall_tpl
  )
{
  'use strict';

  return Backbone.View.extend({
    template: example_removeall_removeall_tpl

  , events:
    {
      'click [data-action="remove-all"]': 'removeAll' // Create a listener for when the user clicks our button
    }

    // This public method will be called when the user clicks the button. We're using it to create a modal confirmation dialog
  , removeAll: function removeAll ()
    {
      var removeAllLinesConfirmationView = new GlobalViewsConfirmationView
      ({
        callBack: this._removeAll // If the user confirms, this is the function that's called – note that we just put its name, not this._removeAll() (ie with its brackets)
      , title: _('Remove All Items').translate()
      , body: _('Are you sure you want to remove all items from your cart?').translate()
      , autohide: true
      });

      // Use the layout component to create the modal dialog
      // Pre-Aconcagua sites will need to pass the application to the view constructor in the entry point file and then use this.options.application.getLayout().showInModal(removeAllLinesConfirmationView); 
      return this.options.Layout.showContent(removeAllLinesConfirmationView, {showInModal:true});
    }

    // This is a private method, essentially the one that does all the work
  , _removeAll: function _removeAll ()
    {
      var model = LiveOrderModel.getInstance() // The model we use for cart contents is a singleton – one, and only one, version of it may exist throughout the whole site

      // Trigger the DELETE request and then re-render the page with whatever it sends back (it should be empty!)
      return model.destroy().done(function (attributes)
      {
        model.set(attributes);
      });
    }
  });
});