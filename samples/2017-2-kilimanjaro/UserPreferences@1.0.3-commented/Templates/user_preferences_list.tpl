<section class="user-preferences-list">
    <header class="user-preferences-list-header">
        <h1 class="user-preferences-list-title">{{translate 'User Preferences'}}</h1>
        <a class="user-preferences-list-button-new" href="/preferences/add">{{translate 'Add New'}}</a>
    </header>
    <table class="user-preferences-list-table">
        <thead class="user-preferences-list-table-header">
          <tr>
              <th class="user-preferences-list-table-header-id">{{translate 'Internal ID'}}</th>
              <th class="user-preferences-list-table-header-type">{{translate 'Type'}}</th>
              <th class="user-preferences-list-table-header-value">{{translate 'Value'}}</th>
              <th class="user-preferences-list-table-header-actions" colspan="2">{{translate 'Actions'}}</th>
          </tr>
        </thead>
        <tbody data-view="UserPreferences.Collection"></tbody>
    </table>
</section>