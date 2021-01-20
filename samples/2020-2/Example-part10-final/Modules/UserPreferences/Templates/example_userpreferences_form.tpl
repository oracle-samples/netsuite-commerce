<!-- Copyright (c) 2021, Oracle and/or its affiliates. All rights reserved. -->
<!-- Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl. -->
<div class="alert-placeholder" data-type="alert-placeholder"></div>
<form class="user-preferences-form">
    <fieldset>
        <small>Required <span class="user-preferences-form-required">*</span></small>
        <div class="user-preferences-form-control-group" data-validation="control-group">
            <label for="type">
                {{translate 'Type'}}
                <small class="user-preferences-form-required">*</small>
            </label>
            <div data-validation="control">
                <select class="user-preferences-form-select" name="type" id="type">
                    {{#each typeOptions}}
                        <option value="{{internalid}}" {{#ifEquals internalid ../model.type}}selected{{/ifEquals}}>{{name}}</option>
                    {{/each}}
                </select>
            </div>
        </div>

        <div class="user-preferences-form-control-group" data-validation="control-group">
            <label for="value">
                {{translate 'Value'}}
                <small class="user-preferences-form-required">*</small>
            </label>
            <div data-validation="control">
                <input class="user-preferences-form-input" type="text" name="value" id="value" value="{{model.value}}">
            </div>
        </div>
    </fieldset>
    <div class="user-preferences-form-control-group">
        <button class="user-preferences-form-submit" type="submit">{{#if isNew}}{{translate 'Add'}}{{else}}{{translate 'Update'}}{{/if}}</button>
    </div>
</form>