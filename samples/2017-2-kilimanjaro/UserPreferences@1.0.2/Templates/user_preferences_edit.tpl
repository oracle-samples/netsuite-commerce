<h1>{{translate 'Add/Update User Preference'}}</h1>
<form>
    <fieldset>
        <label>{{translate 'Type'}}</label>
        <select name="type" id="type">
            {{#each typeOptions}}
                <option {{#if isSelected}}selected{{/if}}>{{name}}</option>
            {{/each}}
        </select>

        <label>{{translate 'Value'}}</label>
        <input type="text" name="value" id="value" value="{{value}}">
    </fieldset>
    <button type="submit">{{translate 'Add/Update'}}</button>
</form>