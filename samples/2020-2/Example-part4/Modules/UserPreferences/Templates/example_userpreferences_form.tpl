<!-- Copyright (c) 2021, Oracle and/or its affiliates. All rights reserved. -->
<!-- Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl. -->
<div class="alert-placeholder" data-type="alert-placeholder"></div>
<form>
    <fieldset>
        <div data-validation="control-group">
            <label for="type">{{translate 'Type'}}</label>
            <div data-validation="control">
                <select name="type" id="type">
                    {{#each typeOptions}}
                        <option value="{{internalid}}" {{#ifEquals internalid ../model.type}}selected{{/ifEquals}}>{{name}}</option>
                    {{/each}}
                </select>
            </div>
        </div>

        <div data-validation="control-group">
            <label for="value">{{translate 'Value'}}</label>
            <div data-validation="control">
                <input type="text" name="value" id="value" value="{{model.value}}">
            </div>
        </div>
    </fieldset>
    <button type="submit">{{translate 'Add/Update'}}</button>
</form>