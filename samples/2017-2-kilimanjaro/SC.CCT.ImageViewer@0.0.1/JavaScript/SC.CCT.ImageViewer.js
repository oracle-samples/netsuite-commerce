// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

// @module SC.CCT.ImageViewer
define(
	'SC.CCT.ImageViewer'
,	[
		'SC.CCT.ImageViewer.View'
	]
,	function (
		SCCCTImageViewerView
	)
{
	'use strict';

	//@class SC.CCT.ImageViewer
	return {
		mountToApp: function mountToApp (application)
		{
			application.getComponent('CMS').registerCustomContentType({
				// @property {String} id This property value MUST be lowercase
				id: 'sc_cct_imgageviewer'
				// @property {Backbone.View} view The view to render the CCT
			,	view: SCCCTImageViewerView
			});
		}
	};
});
