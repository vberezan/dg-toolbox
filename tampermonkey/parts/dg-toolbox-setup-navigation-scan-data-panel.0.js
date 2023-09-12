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
        let populationTbody = document.createElement('tbody');
        let populationRow = document.createElement('tr');
        populationRow.classList.add('dgt-navigation-scan-population-data');

        let workersIcon = document.createElement('td');
        workersIcon.classList.add('dgt-navigation-scan-workers-icon');
        workersIcon.innerHTML = '<fa-icon class="ng-fa-icon" style="color: rgb(255, 220, 45);"><svg role="img" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="person-digging" class="svg-inline--fa fa-person-digging" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M208 64a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM9.8 214.8c5.1-12.2 19.1-18 31.4-12.9L60.7 210l22.9-38.1C99.9 144.6 129.3 128 161 128c51.4 0 97 32.9 113.3 81.7l34.6 103.7 79.3 33.1 34.2-45.6c6.4-8.5 16.6-13.3 27.2-12.8s20.3 6.4 25.8 15.5l96 160c5.9 9.9 6.1 22.2 .4 32.2s-16.3 16.2-27.8 16.2H288c-11.1 0-21.4-5.7-27.2-15.2s-6.4-21.2-1.4-31.1l16-32c5.4-10.8 16.5-17.7 28.6-17.7h32l22.5-30L22.8 246.2c-12.2-5.1-18-19.1-12.9-31.4zm82.8 91.8l112 48c11.8 5 19.4 16.6 19.4 29.4v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V405.1l-60.6-26-37 111c-5.6 16.8-23.7 25.8-40.5 20.2S-3.9 486.6 1.6 469.9l48-144 11-33 32 13.7z"></path></svg></fa-icon>';
        let workersValue = document.createElement('td');
        workersValue.classList.add('dgt-navigation-scan-workers-value');

        let soldiersIcon = document.createElement('td');
        soldiersIcon.classList.add('dgt-navigation-scan-soldiers-icon');
        soldiersIcon.innerHTML = '<fa-icon class="ng-fa-icon" style="color: rgb(223, 74, 74);"><svg role="img" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="person-rifle" class="svg-inline--fa fa-person-rifle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M265.2 192c25.4 0 49.8 7.1 70.8 19.9V512H144V337.7L90.4 428.3c-11.2 19-35.8 25.3-54.8 14.1s-25.3-35.8-14.1-54.8L97.7 258.8c24.5-41.4 69-66.8 117.1-66.8h50.4zM160 80a80 80 0 1 1 160 0A80 80 0 1 1 160 80zM448 0c8.8 0 16 7.2 16 16V132.3c9.6 5.5 16 15.9 16 27.7V269.3l16-5.3V208c0-8.8 7.2-16 16-16h16c8.8 0 16 7.2 16 16v84.5c0 6.9-4.4 13-10.9 15.2L480 325.3V352h48c8.8 0 16 7.2 16 16v16c0 8.8-7.2 16-16 16H484l23 92.1c2.5 10.1-5.1 19.9-15.5 19.9H432c-8.8 0-16-7.2-16-16V400H400c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32V160c0-11.8 6.4-22.2 16-27.7V32c-8.8 0-16-7.2-16-16s7.2-16 16-16h16 16z"></path></svg></fa-icon>';
        let soldiersValue = document.createElement('td');
        soldiersValue.classList.add('dgt-navigation-scan-soldiers-value');

        populationRow.append(workersIcon, workersValue, soldiersIcon, soldiersValue);
        populationTbody.append(populationRow);
        populationTable.append(populationTbody);
        planet.append(populationTable);
        populationTable.style.display = 'none';

        let invasionDiv = document.createElement('div');
        invasionDiv.classList.add('dgt-navigation-scan-invasion-data');
        invasionDiv.innerHTML = '<span class="dgt-navigation-scan-invasion-label">Required: </span><fa-icon class="ng-fa-icon" style="color: rgb(223, 74, 74);"><svg role="img" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="person-rifle" class="svg-inline--fa fa-person-rifle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M265.2 192c25.4 0 49.8 7.1 70.8 19.9V512H144V337.7L90.4 428.3c-11.2 19-35.8 25.3-54.8 14.1s-25.3-35.8-14.1-54.8L97.7 258.8c24.5-41.4 69-66.8 117.1-66.8h50.4zM160 80a80 80 0 1 1 160 0A80 80 0 1 1 160 80zM448 0c8.8 0 16 7.2 16 16V132.3c9.6 5.5 16 15.9 16 27.7V269.3l16-5.3V208c0-8.8 7.2-16 16-16h16c8.8 0 16 7.2 16 16v84.5c0 6.9-4.4 13-10.9 15.2L480 325.3V352h48c8.8 0 16 7.2 16 16v16c0 8.8-7.2 16-16 16H484l23 92.1c2.5 10.1-5.1 19.9-15.5 19.9H432c-8.8 0-16-7.2-16-16V400H400c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32V160c0-11.8 6.4-22.2 16-27.7V32c-8.8 0-16-7.2-16-16s7.2-16 16-16h16 16z"></path></svg></fa-icon>';
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
