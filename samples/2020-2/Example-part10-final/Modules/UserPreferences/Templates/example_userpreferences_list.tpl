<!-- Copyright (c) 2021, Oracle and/or its affiliates. All rights reserved. -->
<!-- Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl. -->
<header class="user-preferences-list-header">
    <h2 class="user-preferences-list-title">{{translate 'User Preferences'}}</h2>
    <a class="user-preferences-list-button-new" href="preferences/add">{{translate 'Add New'}}</a>
</header>
<table class="user-preferences-list-table">
    <thead class="user-preferences-list-table-header">
        <tr class="user-preferences-list-table-row">
            <th class="user-preferences-list-table-header-internalid">{{translate 'Internal ID'}}</th>
            <th class="user-preferences-list-table-header-type">{{translate 'Type'}}</th>
            <th class="user-preferences-list-table-header-value">{{translate 'Value'}}</th>
            <th class="user-preferences-list-table-header-actions">{{translate 'Actions'}}</th>
        </tr>
    </thead>
    <tbody data-view="Example.UserPreferences.Collection.View"></tbody>
</table>