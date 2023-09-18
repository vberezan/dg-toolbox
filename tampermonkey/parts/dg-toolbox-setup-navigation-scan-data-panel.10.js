function setUpNavigationScanDataPanel(windowURL) {
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
                '</tr>' +
                '<tr class="dgt-navigation-scan-population-data">' +
                    '<td class="dgt-navigation-scan-soldiers-icon"><img src="https://i.imgur.com/FHlHgxL.png" title="Soldiers" width="17" height="17" /></td>' +
                    '<td class="dgt-navigation-scan-soldiers-value"></td>' +
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
                    '<td colspan="2" class="invasion-label">Invasion:</td>' +
                    '<td colspan="2" class="invasion-value"></td>' +
                '</tr>' +
                '<tr class="dgt-navigation-scan-structures-data">' +
                    '<td class="hb"></td>' +
                    '<td class="jg"></td>' +
                    '<td class="ab"></td>' +
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

    if (windowURL[1] === 'navigation' && (windowURL.length === 6 && !isNaN(+windowURL[2]) && !isNaN(+windowURL[3]) && !isNaN(+windowURL[4]))) {
        document.querySelector('div.navigation').append(document.createElement('dgt-navigation-scan-data-panel'));
    }
}
