// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('UserPreferences.Edit.View'
, [
    'Backbone'
  , 'Backbone.FormView'
  , 'underscore'
  , 'user_preferences_edit.tpl'
  ]
, function
  (
    Backbone
  , FormView
  , _
  , user_preferences_edit_tpl
  )
{
  'use strict';

  // Edit views are there for adding and updating individual records, but they could also be used for viewing individual records too.
  return Backbone.View.extend({
    // Every view needs a template.
    template: user_preferences_edit_tpl

    // An object used to specify what event listeners we want, and what functions we want to run when they're triggered.
    // In our case we're saying to listen for the submit element being clicked in the form we're generating; when it's triggered, run the saveForm function. This function is built into Backbone.FormView and does all the hard work of sending data up to NetSuite.
    // See http://api.jquery.com/on/ and https://developers.suitecommerce.com/get-to-grips-with-backbone-events
  , events:
    {
      'submit form': 'saveForm'
    }

    // This function runs when the file is first loaded. It is available in a number of Backbone files, and can be a useful way of running code before any function runs.
    // In our example, we're adding the model and application objects to the file, which contain a lot of useful functions and data.
    // We're also passing the view to the form view so that we can make use of all its functions (like the aforementioned saveForm function).
  , initialize: function (options)
    {
      this.model = options.model;
      this.application = options.application;
      FormView.add(this);
    }

    // This is custom to our functionality. You can add your own methods to your functionality in this way.
    // In our example, we want to generate the options in the select dropdown before we pass them to the context object.
    // _.translate() is a custom function to convert a string to alternative languages, if they're in a dictionary. See https://developers.suitecommerce.com/add-custom-translation-text
  , typeOptions: function ()
    {
      // Normally you'd get the options straight from the server, but that's a bit complicated for a beginner's tutorial, so we're just providing an array of options.
      // Also, to calculate whether an item is selected in the dropdown (ie for when we're editing an existing record) we're comparing the value of TEXT STRINGS, which is just awful. But yeah, like I said, this all a bit of a hack anyway, so... yeah.
      var options = [
        {internalid: 1, name: _.translate('Color'), isSelected: (this.model.get('type') == 'Color')}
      , {internalid: 2, name: _.translate('Size'), isSelected: (this.model.get('type') == 'Size')}
      ]

      return options
    }

    // A built-in helper function that generates clickable elements showing how deep into a particular part of the site the user is
  , getBreadcrumbPages: function ()
    {
      // isNew() is a useful method on models that allows to determine whether the model is being used for new or existing data. This can be used, for example, to change the text and presentation of the template.
      if (this.model.isNew())
      {
        return [
          {text: 'User Preferences', href: '/preferences'}
        , {text: 'New'}
        ]
      }
      else
      {
        return [
          {text: 'User Preferences', href: '/preferences'}
        , {text: 'Edit'}
        ]
      }
    }

    // A built-in helper function that automatically expands and highlights the menu item most appropriate for the part of the site the user is currently in
  , getSelectedMenu: function ()
    {
      return 'userpreferenceslist'
    }

    // The getContext function is there to pass data to the template in the form of the object. Each key can be referenced in the template like this: '{{internalid}}'.
    // Before you return the context object, you can perform some other stuff, like generate results or perform transformations. Generally speaking, it's good to do those before returning them because it keeps the object a bit cleaner.
  , getContext: function ()
    {
      return {
        typeOptions: this.typeOptions()
      , type: this.model.get('type')
      , value: this.model.get('value')
      , isNew: this.model.isNew()
      }
    }
  })
});