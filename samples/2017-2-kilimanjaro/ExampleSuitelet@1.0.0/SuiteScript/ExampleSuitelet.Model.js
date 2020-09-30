// Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
// Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.

define('ExampleSuitelet.Model'
, [
    'SC.Model'
  ]
, function
  (
    SCModel
  )
{

  'use strict';

  return SCModel.extend({
    name: 'ExampleSuitelet'

  , get: function () {
      var stSuiteletUrl = nlapiResolveURL('SUITELET', 'customscript_example_suitelet','customdeploy_example_suitelet', true);
      stSuiteletUrl = stSuiteletUrl + '&customer=' + nlapiGetUser();

      var headers = new Array();
      headers['Content-Type'] = 'application/json';
      headers['User-Agent-x'] = 'SuiteScript-Call';

      var response = nlapiRequestURL(stSuiteletUrl, null, headers, 'GET');

      return response.getBody();
    }
  })
});