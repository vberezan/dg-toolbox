function setUpSharedScansCollector(windowURL) {
    if(windowURL[1] === 'planet' && (windowURL.length === 5 && windowURL[3]) === 'comms') {
        document.querySelector('.opacDarkBackground form').parentElement.append(document.createElement('dgt-shared-scans-collector'));
    }
}
