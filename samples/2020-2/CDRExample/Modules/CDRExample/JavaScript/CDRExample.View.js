// Copyright (c) 2021, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.
define('CDRExample.View', [
    'SCView',
    'cdr_example.tpl'
], function (
    SCViewModule,
    cdr_example_tpl
) {
    'use strict';

    var SCView = SCViewModule.SCView;

    function CDRExampleView (options) {
        SCView.call(this, options);

        this.template = cdr_example_tpl;
        this.contextDataRequest = ['item'];
        this.displayType = options.PLP.getDisplay().id;
    }

    CDRExampleView.prototype = Object.create(SCView.prototype);
    CDRExampleView.prototype.constructor = CDRExampleView;

    // Protected method that allows us to overwrite it
    // We use it to call the core module's method conditionally
    // We don't use validateContextDataRequest because that method is only to be used absolutely, and not conditionally (ie using it how we want will result in errors in the console for non-list display types)
    CDRExampleView.prototype.render = function () {
        if (this.displayType == 'list') {
            SCView.prototype.render.call(this);
        }
    }

    CDRExampleView.prototype.getContext = function () {
        return {
            storedetaileddescription: this.contextData.item().storedetaileddescription
        }
    }

    return CDRExampleView
})