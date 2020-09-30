<section class="artist-list">
    <header class="artist-list-header">
        <h1 class="artist-list-title">Artists</h1>
        <a href="artists/new" class="artist-list-header-button-new">Create New Artist</a>
    </header>

    <div class="artist-list-results-container">
        <table class="artist-list-results-table">
            <thead class="artist-list-results-table-header">
                <tr class="artist-list-results-table-header-row">
                    <th class="artist-list-results-table-header-row-id">Internal ID</th>
                    <th class="artist-list-results-table-header-row-artist">Artist</th>
                    <th class="artist-list-results-table-header-row-genre">Genre</th>
                    <th class="artist-list-results-table-header-row-actions" colspan="2">Actions</th>
                </tr>
            </thead>
            <tbody data-view="Artist.Collection"></tbody>
        </table>
    </div>
</section>