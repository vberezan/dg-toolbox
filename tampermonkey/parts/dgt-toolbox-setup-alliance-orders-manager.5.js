function setUpAllianceOrdersManagerPanel(windowURL) {
    if (windowURL[1] === 'alliances') {
        if (document.querySelector('.allianceBox > .playerList')) {
            document.querySelector('.allianceBox > .playerList').append(document.createElement('dgt-alliance-orders-manager-panel'));
        }

        document.querySelectorAll('.allianceBox > .playerList > .player').forEach((player) => {
            let ordersTable = document.createElement('table');
            ordersTable.classList.add('dgt-orders-table');

            ordersTable.innerHTML =
                '<tbody>' +
                    '<tr class="dgt-orders-data">' +
                        '<td class="target-label"><span>Target:</span></td>' +
                        '<td class="galaxy"><input/></td>' +
                        '<td class="sector"><input/></td>' +
                        '<td class="system"><input/></td>' +
                        '<td class="planet"><input/></td>' +
                        '<td class="wait-label"><span>Wait:</span></td>' +
                        '<td class="wait"><input/></td>' +
                        '<td class="wait-label"><span>Comment:</span></td>' +
                        '<td class="wait"><textarea></textarea></td>' +
                    '</tr>' +
                '</tbody>';

            player.append(ordersTable);
        });
    }
}
