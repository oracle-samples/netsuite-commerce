<tr class="user-preferences-details-table-row">
    <td class="user-preferences-details-id">
        <span class="user-preferences-details-label">{{translate 'Internal ID'}}: </span>{{internalid}}
    </td>
    <td class="user-preferences-details-type">
        <span class="user-preferences-details-label">{{translate 'Type'}}: </span>{{type}}
    </td>
    <td class="user-preferences-details-value">
        <span class="user-preferences-details-label">{{translate 'Value'}}: </span>{{value}}
    </td>
    <td><a class="user-preferences-details-edit" href="/preferences/{{internalid}}">{{translate 'Edit'}}</a></td>
    <td><button class="user-preferences-details-delete" data-action="delete" data-id="{{internalid}}">{{translate 'Delete'}}</button></td>
</tr>