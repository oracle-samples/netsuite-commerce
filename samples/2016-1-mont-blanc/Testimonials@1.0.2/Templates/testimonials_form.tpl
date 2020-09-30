<div class="testimonials-form">
    <header class="testimonials-form-header">
        <h1 class="testimonials-form-title">
            {{translate 'New Testimonial'}}
        </h1>
    </header>
    <div data-confirm-message></div>
    <div class="testimonials-form-content">
        <form id="testimonials-form-new" class="testimonials-form-new">
            <fieldset class="testimonials-form-fieldset">
                <div data-type="alert-placeholder"></div>

                <div class="testimonial-form-content-groups">
                    <div class="testimonials-form-content-group" data-validation="control-group" data-input="writerName">
                        <label class="testimonials-form-content-group-label" for="text">{{translate 'Your Name'}} <span class="testimonials-form-content-required">*</span></label>
                        <div class="testimonials-form-controls" data-validation="control">
                            <input type="text" class="testimonials-form-content-group-input" id="writerName" name="writerName" maxlength="50" value="{{writerName}}">
                        </div>
                    </div>
                    <div data-view="Testimonial.StarRating" data-validation="control-group" name="rating" class="testimonial-form-global-star-rating"></div>
                    <div class="testimonials-form-content-group" data-input="title" data-validation="control-group" data-input="title">
                        <label class="testimonials-form-content-group-label" for="title">
                            {{translate 'Title'}} <span class="testimonials-form-content-required">*</span>
                        </label>
                        <div class="testimonials-form-controls" data-validation="control">
                            <input type="text" class="testimonials-form-content-group-input" id="title" name="title" maxlength="255" value="{{title}}">
                        </div>
                    </div>
                    <div class="testimonials-form-content-group" data-validation="control-group" data-input="text">
                        <label class="testimonials-form-content-group-label" for="text">{{translate 'Write your testimonial'}} <span class="testimonials-form-content-required">*</span></label>
                        <div class="testimonials-form-controls" data-validation="control">
                            <textarea id="text" class="testimonials-form-content-group-text" name="text">{{text}}</textarea>
                        </div>
                    </div>
                </div>
            </fieldset>
            <div class="testimonials-form-actions">
                <button type="submit" class="testimonials-form-actions-button-submit">{{translate 'Submit'}}</button>
            </div>
        </form>
    </div>
</div>
