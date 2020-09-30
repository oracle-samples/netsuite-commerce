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

  return Backbone.View.extend({
    template: user_preferences_list_tpl

  , events:
    {
      'click button[data-action="delete"]': 'removeUserPreference'
    }

  , removeModel: function (options)
    {
      var model = options.context.collection.get(options.id);
      model.destroy();
    }

  , removeUserPreference: function (e)
    {
      e.preventDefault();

      var view = new ConfirmationView
      ({
        title: 'Remove Preference'
      , body: 'Are you sure you want to remove this preference?'
      , callBack: this.removeModel
      , callBackParameters:
        {
          context: this
        , id: jQuery(e.target).data('id')
        }
      , autohide: true
      });

      this.application.getLayout().showInModal(view);
    }

  , initialize: function (options)
    {
      this.application = options.application
    , this.collection = options.collection

      var self = this;
      this.collection.on('reset sync add remove change destroy', function() {
        self.render();
      });
    }

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
  })
});