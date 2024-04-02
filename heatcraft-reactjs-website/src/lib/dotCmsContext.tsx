let path;
let editMode;
let searchQuery;
if (window.parent && window.parent.location.pathname === '/dotAdmin/' && window.parent.location.hash.startsWith('#/edit-page/content')) {
    let search = window.parent.location.hash.replace('#/edit-page/content', '');
    let parsed = require('query-string').parse(search);
    path = parsed.url;
    searchQuery = ''; // TODO: fix this
    editMode = true;
} else {
    path = window.location.pathname;
    searchQuery = window.location.search;
    editMode = false;
}

export const dotCmsContext = {path, searchQuery, editMode}
