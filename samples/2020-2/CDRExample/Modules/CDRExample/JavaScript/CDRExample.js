// Copyright (c) 2021, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.
define('CDRExample', [
    'CDRExample.View'
], function (
    CDRExampleView
) {
    'use strict';

    return {
        mountToApp: function mountToApp (container) {
            var PLP = container.getComponent('PLP');

            if (PLP) {
                // Using verbose addChildViews method for extra specificity
                // Since safe mode was introduced, only valid view targets are found on the component
                PLP.addChildViews(PLP.PLP_VIEW, {
                    'ItemViews.Price': {
                        'CDRExample.View': {
                            childViewIndex: 0,
                            childViewConstructor: function () {
                                return new CDRExampleView({PLP: PLP})
                            }
                        }
                    } 
                })
            }
        }
    }
})