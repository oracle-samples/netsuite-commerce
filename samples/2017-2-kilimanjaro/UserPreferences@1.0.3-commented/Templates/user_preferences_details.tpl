<tr class="user-preferences-details-table-row">
    <td class="user-preferences-details-id">
        <!--
            The translate function is custom for SCA. It takes a string and then runs it through a dictionary to find a translation for the user's language.
            See https://developers.suitecommerce.com/add-and-use-custom-handlebars-helpers and https://developers.suitecommerce.com/add-custom-translation-text
        -->
        <span class="user-preferences-details-label">{{translate 'Internal ID'}}: </span>{{internalid}}
    </td>
    <td class="user-preferences-details-type">
        <span class="user-preferences-details-label">{{translate 'Type'}}: </span>{{type}}
    </td>
    <td class="user-preferences-details-value">
        <span class="user-preferences-details-label">{{translate 'Value'}}: </span>{{value}}
    </td>
    <td><a class="user-preferences-details-edit" href="/preferences/{{internalid}}">{{translate 'Edit'}}</a></td>
    <!-- Note the data-action="delete" attribute matches the event we set up in the list view -->
    <td><button class="user-preferences-details-delete" data-action="delete" data-id="{{internalid}}">{{translate 'Delete'}}</button></td>
</tr>