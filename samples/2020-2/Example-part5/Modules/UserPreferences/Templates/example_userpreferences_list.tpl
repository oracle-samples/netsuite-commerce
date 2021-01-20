<header class="user-preferences-list-header">
    <h1 class="user-preferences-list-title">{{translate 'User Preferences'}}</h1>
    <a class="user-preferences-list-button-new" href="preferences/add">{{translate 'Add New'}}</a>
</header>
<div class="userpreferences-list-table">
    <table>
        <thead>
            <tr>
                <th>{{translate 'Internal ID'}}</th>
                <th>{{translate 'Type'}}</th>
                <th>{{translate 'Value'}}</th>
                <th>{{translate 'Actions'}}</th>
            </tr>
        </thead>
        <tbody data-view="Example.UserPreferences.Collection.View"></tbody>
    </table>
</div>