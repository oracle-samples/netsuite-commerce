{{!
    © 2016 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
}}

<div class="error-management-page-not-found">
    <div id="main-banner" class="error-management-page-not-found-main-banner">
        <img src="{{errorImage}}">
    </div>

    <div id="page-not-found-content" class="error-management-page-not-found-content">
        <div class="error-management-page-not-found-header">
        {{#if pageHeader}}
            <h1>{{pageHeader}}</h1>
        {{/if}}
        </div>
        <p>Sorry, we couldn't find the page you were looking for.</p>
        <p>This is usually because of either:</p>
        <ul>
            <li>A mistyped address, or</li>
            <li>An out-of-date link.</li>
        </ul>
        <p>If you typed the URL, check for spelling mistakes.</p>
        <p>If you tried to reach a product, use the search box to search for it.</p>
        <p>Finally, you can simply <a href="/">return to the homepage</a>.</p>
    </div>
</div>