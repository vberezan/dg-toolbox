function setUpPlanetListStatsPanel(windowURL) {
    if (windowURL[1] === 'planets') {
        document.getElementById('planetList').prepend(document.createElement('dgt-planet-list-stats-panel'));
    }
}
