function setUpPlanetListStatsPanel() {
    if (document.getElementById('planetList')) {
        document.getElementById('planetList').prepend(document.createElement('dgt-planet-list-stats-panel'));
    }
}
