define('CCTOnSaleBanner.View'
, [
    'CustomContentType.Base.View'

  , 'SC.Configuration'

  , 'cct_onsale_banner.tpl'
  ]
, function
  (
    BaseView

  , Configuration

  , Template
  )
{
  'use strict';

  return BaseView.extend({
    template: Template

  , contextDataRequest: ['item']

  , getContext: function ()
    {
      var item = this.contextData.item()
      , field = this.settings.custrecord_cct_onsale_field

      return {
        onsale: item.get(field)
      , banner: this.settings.custrecord_cct_onsale_img
      , searchURL: Configuration.get('defaultSearchUrl') + '?' + field + '=true'
      }
    }
  });
});