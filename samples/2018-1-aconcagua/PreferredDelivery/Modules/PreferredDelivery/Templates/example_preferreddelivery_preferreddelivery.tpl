<h2 class="preferreddelivery-title">{{translate 'Preferred Delivery Date'}}</h2>
<div id="preferreddelivery-container" class="preferreddelivery-container">
    {{#if isReview}}
        {{#if model.options.custbody_preferred_date}}
            <p>{{model.options.custbody_preferred_date}}</p>
        {{else}}
            <p>{{translate 'No date selected'}}</p>
        {{/if}}
    {{else}}
        <input class="preferreddelivery-input" type="date" name="custbody_preferred_date" data-todayhighlight="true" value="{{model.options.custbody_preferred_date}}">
    {{/if}}
</div>