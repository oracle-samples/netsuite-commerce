<tr class="artist-details-results-table-row">
    <td class="artist-details-results-table-row-id">
        <span class="artist-details-results-table-row-id-label">Internal ID: </span>
        <span class="artist-details-results-table-row-id-value">{{internalid}}</span>
    </td>
    <td class="artist-details-results-table-row-name">
        <span class="artist-details-results-table-row-name-label">Name: </span>
        <span class="artist-details-results-table-row-name-value">{{name}}</span>
    </td>
    <td class="artist-details-results-table-row-genre">
        <span class="artist-details-results-table-row-genre-label">Genre: </span>
        <span class="artist-details-results-table-row-genre-value">{{genre}}</span>
    </td>
    <td class="artist-details-results-table-row-action-edit">
        <a class="artist-details-results-table-row-action-edit-button" href="/artists/{{internalid}}">Edit</a>
    </td>
    <td class="artist-details-results-table-row-action-delete">
        <button class="artist-details-results-table-row-action-delete-button" data-action="remove" data-id="{{internalid}}">Delete</button>
    </td>
</tr>
