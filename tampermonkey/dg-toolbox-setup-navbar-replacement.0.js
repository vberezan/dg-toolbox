function setUpNavbarReplacement() {
    if (document.getElementById('content')) {
        document.getElementById('content').prepend(document.createElement('dgt-navbar'));
        document.getElementById('tabpanel').remove();
    }
}
