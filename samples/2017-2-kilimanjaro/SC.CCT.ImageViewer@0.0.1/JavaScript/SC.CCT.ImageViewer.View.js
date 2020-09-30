// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

//@module SC.CCT.ImageViewer
define(
	'SC.CCT.ImageViewer.View'
,	[
		'CustomContentType.Base.View'
	,	'SC.Configuration'

	,	'sc_cct_imageviewer.tpl'

	,	'Utils'
	,	'jQuery'
	]
,	function (
		CustomContentTypeBaseView
	,	Configuration

	,	sc_cct_imageviewer_tpl

	,	Utils
	,	jQuery
	)
{
	'use strict';

	//@class SC.CCT.ImageViewer.View @extends CustomContentType.Base.View
	return CustomContentTypeBaseView.extend({

		template: sc_cct_imageviewer_tpl

		// As an example of the 'install' method, we are going to emulate, for example, a fetch to a service with the setTimeout
		// Until the promise is resolve, you wont be able to edit the settings of this CCT
		// The same could happend with the 'update' method
	,	install: function (settings, context_data)
		{
			this._install(settings, context_data);

			var promise = jQuery.Deferred();

			setTimeout(function()
			{
				promise.resolve();
			}, 4000);

			return promise;
		}

		// @property {Arrray} contextDataRequest
		// The list of contexts that you may need to run the CCT
	,	contextDataRequest: ['item']

		// By default when you drop a CCT in the SMT admin, it will run the 'validateContextDataRequest' method to check that you have
		// all the requested contexts and it will fail if some context is missing.
		// In this case, the 'item' context is optional, so we will override the 'validateContextDataRequest' method to return always true
		// since I want to run the CCT even if I don't have an 'item'
	,	validateContextDataRequest: function()
		{
			return true;
		}

		// Object to map the values of 'custrecord_sc_cct_iv_valign'
	,	valign: {
			'1': 'top'
		,	'2': 'center'
		,	'3': 'bottom'
		}

		// @method getContext
		// @return {SC.CCT.ImageViewer.View.Context}
	,	getContext: function()
		{
			var texts = []
			,	imageUrl = ''
			,	valign = this.valign[this.settings.custrecord_sc_cct_iv_valign] || this.valign['3'];

			if (this.contextData.item)
			{
				var item = this.contextData.item();

				texts = [item.get('_name')];

				var thumbnail = item.get('_thumbnail');
				imageUrl = thumbnail.url ? thumbnail.url : thumbnail;
			}

			var set_text = Utils.trim(this.settings.custrecord_sc_cct_iv_text)
			,	set_texts = set_text ? set_text.split('\n') : []
			,	set_imageUrl = Utils.trim(this.settings.custrecord_sc_cct_iv_imageurl);

			texts = set_texts.length ? set_texts : texts;
			imageUrl = set_imageUrl ? set_imageUrl : imageUrl;


			// @class SC.CCT.ImageViewer.View.Context
			return {
				// @property {Boolean} hasText
				hasText: !!texts.length
				// @property {String} texts
			,	texts: texts
				// @property {Boolean} hasImage
			,	hasImage: !!imageUrl
				// @property {String} imageUrl
			,	imageUrl: imageUrl
				// @property {String} valign
			,	valign: valign
				// @class SC.CCT.ImageViewer.View
			};
		}
	});
});
