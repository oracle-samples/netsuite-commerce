<section class="user-preferences-edit">
    <header class="user-preferences-edit-header">
        <h1>
            <!--
                Handlebars is generally logicless, but allows for basic truthy/falsy evaluations. Thus, if you can send those kinds of values to the template via the getContext() method, you can perform work on them.
                This one checks if the model is new (or if it contains data already) and then displays different text.
            -->
            {{#if isNew}}
                {{translate 'Add User Preference'}}
            {{else}}
                {{translate 'Update User Preference'}}
            {{/if}}
        </h1>
    </header>
    <form>
        <!-- Validation errors will be sent here -->
        <div data-type="alert-placeholder"></div>
        <fieldset>
            <small>Required <span class="user-preferences-edit-required">*</span></small>
            <!-- note the attributes used for validation -->
            <div class="user-preferences-edit-control-group" data-input="type" data-validation="control-group">
                <label class="user-preferences-edit-label" for="type">
                    {{translate 'Type'}}
                    <small><span class="user-preferences-edit-required">*</span></small>
                </label>
                <span data-validation="control">
                    <select class="user-preferences-edit-select" name="type" id="type">
                        <!-- To generate the dropdown options, iterate over the array using another built-in helper -->
                        {{#each typeOptions}}
                            <option {{#if isSelected}}selected{{/if}}
                            >{{name}}</option>
                        {{/each}}
                    </select>
                </span>
            </div>

            <div class="user-preferences-edit-control-group" data-input="value" data-validation="control-group">
                <label class="user-preferences-edit-label" for="value">
                    {{translate 'Value'}}
                    <small><span class="user-preferences-edit-required">*</span></small>
                </label>
                <span data-validation="control">
                    <input class="user-preferences-edit-input" type="text" name="value" id="value" value="{{value}}">
                </span>
            </div>
        </fieldset>
        <div class="user-preferences-edit-control-group">
            <button class="user-preferences-edit-submit" type="submit">
                {{#if isNew}}
                    {{translate 'Add'}}
                {{else}}
                    {{translate 'Update'}}
                {{/if}}
            </button>
        </div>
    </form>
</section>