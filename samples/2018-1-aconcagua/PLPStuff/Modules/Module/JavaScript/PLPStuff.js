// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('PLPStuff'
, [
    'PLPStuff.View'
  ]
, function
  (
    PLPStuffView
  )
{
  'use strict';

  return {
    mountToApp: function mountToApp (container)
    {
      // Don't make PLP a global variable (window.PLP) for anything other than testing purposes!
      var PLP = window.PLP = container.getComponent('PLP');

      PLP.__addFilters = function (newFilters)
      {
        // store current filters
        var filters = {}
        PLP.getFilters().forEach(function (filter)
        {
          filters[filter.id] = filter.value
        });

        // add new filters
        _.extend(filters, newFilters);

        // apply the filters
        return PLP.setFilters({filters: filters});
      }

      PLP.__deleteFilters = function (oldFilters)
      {
        // store current filters
        var filters = {}
        PLP.getFilters().forEach(function (filter)
        {
          filters[filter.id] = filter.value
        });

        // remove old filters from current object
        oldFilters.forEach(function (key)
        {
          delete filters[key]
        });

        // apply the filters
        return PLP.setFilters({filters: filters});
      }

      PLP.cancelableOn('beforeShowContent', function ()
      {
        // First target the main, 'container' PLP view
        PLP.addChildViews(PLP.PLP_VIEW,
        {
          // Then the child view within that
          'Facets.Items':
          {
            // Then set the name of our new view
            'PLPStuff.View':
            {
              // This'll render it at the top
              childViewIndex: 1
            , childViewConstructor: function ()
              {
                // We're gonna pass it the PLP component so that we can use it to work out whether to show a banner or not
                return new PLPStuffView({PLP: PLP})
              }
            }
          }
        })
      });

      // This is really not advisable: every time you run these PLP methods, it makes an items API call (thus two additional ones)
      PLP.cancelableOn('beforeShowContent', function ()
      {
        if (PLP.getCategoryInfo() && PLP.getCategoryInfo().urlfragment == 'orange-things')
        {
          PLP.setPageSize({pageSize: '12'});
          if (PLP.getPageSize().id == '12')
          {
            PLP.setDisplay({display: 'table'})
          }
        }
      });
    }
  }
});