<!-- Copyright (c) 2021, Oracle and/or its affiliates. All rights reserved. -->
<!-- Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl. -->
<tr class="user-preferences-list-table-row">
    <td><span class="user-preferences-list-table-cell-label">{{translate 'Internal ID'}}: </span>{{model.internalid}}</td>
    <td>
        {{#each typeOptions}}
            {{#ifEquals internalid ../model.type}}<span class="user-preferences-list-table-cell-label">{{translate 'Type'}}: </span>{{name}}{{/ifEquals}}
        {{/each}}
    </td>
    <td><span class="user-preferences-list-table-cell-label">{{translate 'Value'}}: </span>{{model.value}}</td>
    <td><span class="user-preferences-list-table-cell-label">{{translate 'Actions'}}: </span><a class="user-preferences-table-edit-link" href="/preferences/{{model.internalid}}">{{translate 'Edit'}}</a> <button class="user-preferences-table-delete-button" data-action="delete" data-id="{{model.internalid}}">{{translate 'Delete'}}</button></td>
</tr>