<!-- Copyright (c) 2021, Oracle and/or its affiliates. All rights reserved. -->
<!-- Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl. -->
<tr>
    <td>{{model.internalid}}</td>
    <td>
        {{#each typeOptions}}
            {{#ifEquals internalid ../model.type}}{{name}}{{/ifEquals}}
        {{/each}}
    </td>
    <td>{{model.value}}</td>
    <td>
        <a class="user-preferences-table-edit-link" href="/preferences/{{model.internalid}}">{{translate 'Edit'}}</a>
        <button class="user-preferences-table-delete-button" data-action="delete" data-id="{{model.internalid}}">{{translate 'Delete'}}</button>
    </td>
</tr>