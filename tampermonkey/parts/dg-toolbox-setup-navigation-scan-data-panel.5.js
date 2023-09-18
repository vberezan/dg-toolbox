function setUpNavigationScanDataPanel(windowURL) {
    document.querySelectorAll('div.navigation .row .planets').forEach((planet) => {

        // -- resources
        let resources = ['metal', 'mineral', 'food', 'energy'];
        let surfaceTable = document.createElement('table');
        let surfaceTbody = document.createElement('tbody');
        surfaceTable.classList.add('dgt-navigation-scan');
        surfaceTable.append(surfaceTbody);

        let turnRow = document.createElement('tr');
        turnRow.classList.add('dgt-navigation-scan-turn');
        let turnLabel = document.createElement('td');
        turnLabel.textContent = 'Turn:'
        turnLabel.classList.add('dgt-navigation-scan-turn-label');
        let turnValue = document.createElement('td');
        turnValue.classList.add('dgt-navigation-scan-turn-value');

        turnRow.append(turnLabel);
        turnRow.append(turnValue);
        surfaceTbody.append(turnRow);

        resources.forEach((resource) => {
            let row = document.createElement('tr');
            let abundance = document.createElement('td');
            let production = document.createElement('td');

            row.classList.add('dgt-navigation-scan-resource', resource);
            abundance.classList.add('abundance');
            production.classList.add('production');

            row.append(abundance, production);

            surfaceTbody.append(row);
        });

        let surfaceMetalColumn = document.createElement('td')
        surfaceMetalColumn.classList.add('dgt-navigation-scan-resource', 'metal');
        let surfaceMineralColumn = document.createElement('td')
        surfaceMineralColumn.classList.add('dgt-navigation-scan-resource', 'mineral');
        let surfaceFoodColumn = document.createElement('td')
        surfaceFoodColumn.classList.add('dgt-navigation-scan-resource', 'food');
        let surfaceEnergyColumn = document.createElement('td')
        surfaceEnergyColumn.classList.add('dgt-navigation-scan-resource', 'energy');

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
                    '<td class="pg"></td>' +
                    '<td class="st"></td>' +
                    '<td class="hb"></td>' +
                    '<td class="jg"></td>' +
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
        /////

        let invasionDiv = document.createElement('div');
        invasionDiv.classList.add('dgt-navigation-scan-invasion-data');
        invasionDiv.innerHTML = '<span class="dgt-navigation-scan-invasion-label">Invasion: </span>';
        let invasionValueSpan = document.createElement('span');
        invasionValueSpan.classList.add('dgt-navigation-scan-invasion-value');
        invasionDiv.append(invasionValueSpan);

        planet.append(invasionDiv);
        invasionDiv.style.display = 'none';
    });

    if (windowURL[1] === 'navigation' && (windowURL.length === 6 && !isNaN(+windowURL[2]) && !isNaN(+windowURL[3]) && !isNaN(+windowURL[4]))) {
        document.querySelector('div.navigation').append(document.createElement('dgt-navigation-scan-data-panel'));
    }
}
