
function setUpLocalStorageManager() {
    document.body.prepend(document.createElement('dgt-local-storage-manager'));
}
function setUpUiParser() {
    document.body.prepend(document.createElement('dgt-darkgalaxy-ui-parser'));
}

function setUpNavbarReplacement() {
    if (document.getElementById('content')) {
        document.getElementById('content').prepend(document.createElement('dgt-navbar'));
        document.getElementById('tabpanel').remove();
    }
}

function setUpAllianceOrdersManagerPanel(windowURL) {
    if (windowURL[1] === 'alliances') {
        if (document.querySelector('.allianceBox')) {
            document.querySelectorAll('.allianceBox').forEach((allianceBox) => {
                if (allianceBox.querySelector('.plainHeader') &&
                    allianceBox.querySelector('.plainHeader').childNodes[0].textContent.trim().toLowerCase() === 'member list') {
                    allianceBox.querySelector('.playerList').style.display = 'none';
                    allianceBox.querySelector('.plainHeader').style.display = 'none';

                    allianceBox.append(document.createElement('dgt-alliance-orders-manager-panel'));
                } else if (allianceBox.querySelector('.plainHeader') &&
                    allianceBox.querySelector('.plainHeader').childNodes[0].textContent.trim().toLowerCase() === 'alliance announcement') {
                    allianceBox.querySelector('.plainHeader').style.display = 'none';

                    if (allianceBox.querySelector('.allianceAnnouncement')) {
                        allianceBox.querySelector('.allianceAnnouncement').parentElement.classList.add('allianceAnnouncementBox');
                    }
                }
            });
        }
    }
}

function setUpFleetOrdersListPanel(windowURL) {
    if (windowURL[1] === 'fleets') {
        if (document.querySelector('#contentBox>.header') && document.querySelector('#contentBox>.ofHidden')) {
            document.querySelector('#contentBox')
                .insertBefore(
                    document.createElement('dgt-fleet-orders-list-panel'),
                    document.querySelector('#contentBox>.ofHidden')
                );
        }
    }
}

function setUpSharedScansCollector(windowURL) {
    if (windowURL[1] === 'planet' && (windowURL.length === 5 && windowURL[3]) === 'comms') {
        document.querySelector('.opacDarkBackground form').parentElement.append(document.createElement('dgt-shared-scans-collector'));
    }
}

function setUpPlanetListStatsPanel(windowURL) {
    if (windowURL[1] === 'planets') {
        document.getElementById('planetList').prepend(document.createElement('dgt-planet-list-stats-panel'));
    }
}

function setUpNavigationScanDataPanel(windowURL) {
    if (windowURL[1] === 'navigation' && (windowURL.length === 6 && !isNaN(+windowURL[2]) && !isNaN(+windowURL[3]) && !isNaN(+windowURL[4]))) {
        document.querySelector('div.navigation').append(document.createElement('dgt-navigation-scan-data-panel'));
        document.querySelector('.opacBackground.ofHidden.padding').classList.add('disable-overflow');

        document.querySelectorAll('div.navigation .row .planets').forEach((planet) => {
            // -- resources
            let surfaceTable = document.createElement('table');
            surfaceTable.classList.add('dgt-navigation-scan');
            surfaceTable.innerHTML =
                '<tbody>' +
                '<tr class="dgt-navigation-scan-coords">' +
                '<td class="dgt-navigation-scan-coords-label"><img src="https://i.imgur.com/F0Vdyzn.png" width="17" height="17"></td>' +
                '<td class="dgt-navigation-scan-coords-value"></td>' +
                '</tr>' +
                '<tr class="dgt-navigation-scan-turn">' +
                '<td class="dgt-navigation-scan-turn-label">Turn: </td>' +
                '<td class="dgt-navigation-scan-turn-value"></td>' +
                '</tr>' +
                '<tr class="dgt-navigation-scan-resource metal">' +
                '<td class="abundance"></td>' +
                '<td class="production"></td>' +
                '</tr>' +
                '<tr class="dgt-navigation-scan-resource mineral">' +
                '<td class="abundance"></td>' +
                '<td class="production"></td>' +
                '</tr>' +
                '<tr class="dgt-navigation-scan-resource food">' +
                '<td class="abundance"></td>' +
                '<td class="production"></td>' +
                '</tr>' +
                '<tr class="dgt-navigation-scan-resource energy">' +
                '<td class="abundance"></td>' +
                '<td class="production"></td>' +
                '</tr>' +
                '</tbody>';

            planet.insertBefore(surfaceTable, planet.querySelector('div.text'));
            planet.querySelector('.dgt-navigation-scan-coords-value').textContent =
                planet.querySelector('.coords>span').textContent.trim();

            // -- remove useless empty lines
            planet.querySelectorAll('br').forEach((br) => {
                br.remove();
            })

            //-- population
            let populationTable = document.createElement('table');
            populationTable.classList.add('dgt-navigation-scan-population');
            populationTable.innerHTML =
                '<tbody>' +
                '<tr class="dgt-navigation-scan-population-data">' +
                '<td class="dgt-navigation-scan-workers-icon"><img src="https://i.imgur.com/7u6VnpE.png" title="Workers" width="17" height="17" /></td>' +
                '<td class="dgt-navigation-scan-workers-value"></td>' +
                '<td class="dgt-navigation-scan-workers-gr"></td>' +
                '</tr>' +
                '<tr class="dgt-navigation-scan-population-data">' +
                '<td class="dgt-navigation-scan-soldiers-icon"><img src="https://i.imgur.com/FHlHgxL.png" title="Soldiers" width="17" height="17" /></td>' +
                '<td class="dgt-navigation-scan-soldiers-value"></td>' +
                '<td class="dgt-navigation-scan-soldiers-ab"></td>' +
                '</tr>' +
                '</tbody>'

            populationTable.style.display = 'none';
            planet.append(populationTable);

            // -- structures
            let structuresTable = document.createElement('table');
            structuresTable.classList.add('dgt-navigation-scan-structures');
            structuresTable.innerHTML =
                '<tbody>' +
                '<tr class="dgt-navigation-scan-structures-data">' +
                '<td colspan="2" class="invasion-label">Invade:</td>' +
                '<td colspan="2" class="invasion-value"></td>' +
                '</tr>' +
                '<tr class="dgt-navigation-scan-structures-data">' +
                '<td class="hb"></td>' +
                '<td class="jg"></td>' +
                '<td class="cs"></td>' +
                '<td class="hg"></td>' +
                '</tr>' +
                '<tr class="dgt-navigation-scan-structures-data">' +
                '<td class="lw"></td>' +
                '<td class="sy"></td>' +
                '<td class="hw"></td>' +
                '<td class="sd"></td>' +
                '</tr>' +
                '</tbody>';

            structuresTable.style.display = 'none';
            planet.append(structuresTable);
        });
    }
}