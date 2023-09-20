function setUpAllianceOrdersManagerPanel(windowURL) {
    if (windowURL[1] === 'alliances') {
        if (document.querySelector('.allianceBox > .playerList')) {
            document.querySelector('.allianceBox > .playerList').append(document.createElement('dgt-alliance-orders-manager-panel'));
        }

        document.querySelectorAll('.allianceBox > .playerList > .player').forEach((player, idx) => {
            let ordersTable = document.createElement('table');
            ordersTable.classList.add('dgt-orders-table');
            ordersTable.id = 'dgt-orders-table-' + idx;

            ordersTable.innerHTML =
                '<tbody>' +
                    '<tr class="dgt-orders-data">' +
                        '<td class="target-label"><span>Target:</span></td>' +
                        '<td class="galaxy"><input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*?)\\..*/g, \'$1\').replace(/^0[^.]/, \'0\');" /></td>' +
                        '<td class="sector"><input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*?)\\..*/g, \'$1\').replace(/^0[^.]/, \'0\');" /></td>' +
                        '<td class="system"><input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*?)\\..*/g, \'$1\').replace(/^0[^.]/, \'0\');" /></td>' +
                        '<td class="planet"><input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*?)\\..*/g, \'$1\').replace(/^0[^.]/, \'0\');" /></td>' +
                        '<td class="wait-label"><span>Wait:</span></td>' +
                        '<td class="wait"><input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*?)\\..*/g, \'$1\').replace(/^0[^.]/, \'0\');" /></td>' +
                        '<td class="wait-label"><span>Comment:</span></td>' +
                        '<td class="wait"><textarea placeholder="Ex: minim 100 fighters"></textarea></td>' +
                        '<td class="submit"><button onclick="populateAngularForm("' + ordersTable.id + '")">Send</button></td>' +
                    '</tr>' +
                '</tbody>';

            player.append(ordersTable);
        });
    }
}

function populateAngularForm(orderTableId) {
    console.log(orderTableId)
}
