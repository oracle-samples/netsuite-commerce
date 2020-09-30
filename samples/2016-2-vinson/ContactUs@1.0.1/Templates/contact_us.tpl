<section class="contactus-container">
    <h2>{{translate 'Contact Us'}}</h2>
    <p>{{translate 'Use this form to submit a question or query to us and we\'ll get back to you as soon as possible.'}}</p>

    <small class="contactus-required">{{translate 'Required'}}*</small>

    <form class="contactus-form">
        <fieldset>
            <div class="contactus-firstname" data-input="firstname" data-validation="control-group">
                <label for="firstname">{{translate 'First Name'}}<small class="contactus-required">*</small></label>
                <span data-validation="control">
                    <input name="firstname" type="text" id="firstname">
                </span>
            </div>
            <div class="contactus-lastname" data-input="lastname" data-validation="control-group">
                <label for="lastname">{{translate 'Last Name'}}<small class="contactus-required">*</small></label>
                <span data-validation="control">
                    <input name="lastname" type="text" id="lastname">
                </span>
            </div>
            <div class="contactus-email" data-input="email" data-validation="control-group">
                <label for="email">{{translate 'Email'}}<small class="contactus-required">*</small></label>
                <span data-validation="control">
                    <input name="email" type="text" id="email">
                </span>
            </div>
            <div class="contactus-subject" data-input="title" data-validation="control-group">
                <label for="title">{{translate 'Subject'}}<small class="contactus-required">*</small></label>
                <span data-validation="control">
                    <input name="title" type="text" id="title">
                </span>
            </div>
            <div class="contactus-message" data-input="incomingmessage" data-validation="control-group">
                <label for="incomingmessage">{{translate 'Message'}}<small class="contactus-required">*</small></label>
                <span data-validation="control">
                    <textarea name="incomingmessage" type="text" id="incomingmessage"></textarea>
                </span>
            </div>
        </fieldset>

        <div class="contactus-button-container">
            <button class="contactus-button-submit" type="submit">{{translate 'Submit'}}</button>
        </div>
    </form>
</section>