<section class="artist-edit">
    <header class="artist-edit-header">
        <h1 class="artist-edit-header-title">{{#if isNew}}New{{else}}Edit{{/if}} Artist Details</h1>
    </header>
    <form class="artist-edit-form">
        <fieldset>
            <small>Required <span class="artist-edit-form-label-required">*</span></small>
            <div class="artist-edit-form-name" data-input="name" data-validation="control-group">
                <label class="artist-edit-form-label" for="name">Name <span class="artist-edit-form-label-required">*</span></label>
                <span data-validation="control"><input class="artist-edit-form-input" type="text" name="name" id="name" value="{{name}}"></span>
            </div>
            <div class="artist-edit-form-genre" data-input="genre" data-validation="control-group">
                <label class="artist-edit-form-label" for="genre">Genre <span class="artist-edit-form-label-required">*</span></label>
                <span data-validation="control"><input class="artist-edit-form-input" type="text" name="genre" id="genre" value="{{genre}}"></span>
            </div>
        </fieldset>
        <div class="artist-edit-form-submit">
            <button class="artist-edit-form-submit-button" type="submit">{{#if isNew}}Add{{else}}Update{{/if}}</button>
        </div>

        <div data-type="alert-placeholder"></div>
    </form>
</section>