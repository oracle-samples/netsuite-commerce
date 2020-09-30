// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('UserPreferences.List.View'
, [
    'Backbone'
  , 'Backbone.CollectionView'

  , 'UserPreferences.Details.View'
  , 'user_preferences_list.tpl'

  , 'GlobalViews.Confirmation.View'
  , 'jQuery'
  ]
, function
  (
    Backbone
  , CollectionView

  , UserPreferencesDetailsView
  , user_preferences_list_tpl

  , ConfirmationView
  , jQuery
  )
{
  'use strict';

  // List views display a list of records. It will contain a collection, which will render individual models, details views and templates for each of the records.
  // Think of these as the page around the rows of a table: you will need the heading, table element, table head, etc, and then your collection will render as the rows of the table
  return Backbone.View.extend({
    // Every view needs a template.
    template: user_preferences_list_tpl

    // An object used to specify what event listeners we want, and what functions we want to run when they're triggered.
    // In our case we're saying to listen for a button (marked up with some special code) being clicked. It will then run some code to perform the action
    // See http://api.jquery.com/on/ and https://developers.suitecommerce.com/get-to-grips-with-backbone-events
  , events:
    {
      'click button[data-action="delete"]': 'removeUserPreference'
    }

    // This function is the specific part that removes the model and thus the record from the system.
    // It is separated because of the nature of the confirmation view: upon confirmation, a function (callback) must be called, so we've split this part off to a separate function.
  , removeModel: function (options)
    {
      var model = options.context.collection.get(options.id);
      model.destroy();
    }

    // Called when triggered by the event
  , removeUserPreference: function (e)
    {
      // Take the event and stop all default actions from being run on it
      e.preventDefault();

      // You'll note, above, that we included a global view in our file. This is built-in SCA functionality that creates a handy little pop-up that asks the user to confirm or cancel their action. We're using it to confirm whether they are sure that they want to delete a record.
      var view = new ConfirmationView
      ({
        title: 'Remove Preference'
      , body: 'Are you sure you want to remove this preference?'
        // Ie, run this function when the user clicks OK
      , callBack: this.removeModel
      , callBackParameters:
        {
          context: this
        , id: jQuery(e.target).data('id')
        }
      , autohide: true
      });

      // A key bit of code that tells the application to load the view in a modal window.
      // See https://developers.suitecommerce.com/add-modals-confirmations-expanders-and-other-messaging-to-your-site
      this.application.getLayout().showInModal(view);
    }

    // This function runs when the file is first loaded. It is available in a number of Backbone files, and can be a useful way of running code before any function runs.
    // In our example, we're adding the model and application objects to the file, which contain a lot of useful functions and data.
  , initialize: function (options)
    {
      this.application = options.application
    , this.collection = options.collection

      // We're also adding a listener to the collection so that when it is modified (eg a model is deleted), we re-render it (ie refresh the list without refreshing the page)
      var self = this;
      this.collection.on('reset sync add remove change destroy', function() {
        self.render();
      });
    }

    // Composite views are views that are made up of more than one view. By default, all views are composite views (this was changed in Elbrus).
    // The name, 'UserPreferences.Collection', can then be used in our template to indiciate where we want the view to render.
  , childViews:
    {
      'UserPreferences.Collection': function ()
      {
        return new CollectionView({
          'childView': UserPreferencesDetailsView
        , 'collection': this.collection
        , 'viewsPerRow': 1
        })
      }
    }

    // This function automatically expands the navigation in the account application to the ID we specify. In other words, it shows the user where they are in the menu.
  , getSelectedMenu: function ()
    {
      return 'userpreferenceslist'
    }

    // Auto-generates bread crumbs at the top of the section to show how deep the user is in a particular section of the site.
  , getBreadcrumbPages: function ()
    {
      return [{text: 'User Preferences'}]
    }
  })
});