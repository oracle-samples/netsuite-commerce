<h2>{{translate 'New Favorite Thing'}}</h2>
<form>
    <fieldset>
        <div data-input="favething" data-validation="control-group">
            <label for="favething">{{translate 'Favorite Thing'}}</label>
            <span data-validation="control"><input type="text" name="favething" id="favething"></span>
        </div>
        <div data-input="faveReason" data-validation="control-group">
            <label for="faveReason">{{translate 'Reason'}}</label>
            <span data-validation="control"><input type="text" name="favereason" id="favereason"></span>
        </div>
    </fieldset>
    <button type="submit">{{translate 'Add'}}</button>
</form>