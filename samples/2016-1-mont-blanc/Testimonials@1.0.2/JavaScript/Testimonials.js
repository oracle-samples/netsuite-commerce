// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('Testimonials'
, [
    'Testimonials.Router'
  , 'Testimonials.Carousel.View'
  , 'Testimonials.Collection'
  , 'Home.View'
  , 'Backbone.CompositeView'
  , 'PluginContainer'
  , 'underscore'
  ]
, function (
    Router
  , CarouselView
  , Collection
  , Home
  , BackboneCompositeView
  , PluginContainer
  , _
  )
{
  'use strict';

  return {

    plugCarouselIntoView: function plugCarouselIntoView(View, application, afterSelector) {

      if (!View.prototype.visitChildren) {
        View.prototype.initialize = _.wrap(View.prototype.initialize, function wrap(fn) {
            fn.apply(this, _.toArray(arguments).slice(1));
            BackboneCompositeView.add(this);
        });
      }

      View.prototype.preRenderPlugins = View.prototype.preRenderPlugins || new PluginContainer();

      View.prototype.preRenderPlugins.install({
        name: 'Testimonials.Carousel'
      , execute: function execute($el) {
          $el.find(afterSelector)
            .after('<div data-view="Testimonials.Carousel"></div>');
        }
      });

      View.addExtraChildrenViews({
        'Testimonials.Carousel': function wrapperFunction() {
          return function() {
            return new CarouselView({
              application: application
            , collection: new Collection()
            });
          };
        }
      });

    }

  , mountToApp: function(application) {

      this.plugCarouselIntoView(Home, application, '.home-slider-container');

      return new Router(application);
    }

  }
});