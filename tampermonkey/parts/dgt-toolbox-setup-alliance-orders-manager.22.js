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
                        '<td class="comment"><textarea placeholder="Ex: min 100xFighter"></textarea></td>' +
                        '<td class="submit"><button onclick="populateAngularForm(\'' + ordersTable.id + '\')">Send</button></td>' +
                    '</tr>' +
                '</tbody>';

            player.append(ordersTable);
        });
    }
}

function populateAngularForm(orderTableId) {
    let angularForm = document.getElementById('dgt-orders-panel-data-form');
    let playerTable = document.getElementById(orderTableId);

    angularForm.querySelector('td.galaxy>input').value = playerTable.querySelector('td.galaxy>input').value;
    angularForm.querySelector('td.galaxy>input').dispatchEvent(new Event('input'));
    playerTable.querySelector('td.galaxy>input').value = '';
    playerTable.querySelector('td.galaxy>input').dispatchEvent(new Event('input'));

    angularForm.querySelector('td.sector>input').value = playerTable.querySelector('td.sector>input').value;
    angularForm.querySelector('td.sector>input').dispatchEvent(new Event('input'));
    playerTable.querySelector('td.sector>input').value = '';
    playerTable.querySelector('td.sector>input').dispatchEvent(new Event('input'));

    angularForm.querySelector('td.system>input').value = playerTable.querySelector('td.system>input').value;
    angularForm.querySelector('td.system>input').dispatchEvent(new Event('input'));
    playerTable.querySelector('td.system>input').value = '';
    playerTable.querySelector('td.system>input').dispatchEvent(new Event('input'));

    angularForm.querySelector('td.planet>input').value = playerTable.querySelector('td.planet>input').value;
    angularForm.querySelector('td.planet>input').dispatchEvent(new Event('input'));
    playerTable.querySelector('td.planet>input').value = '';
    playerTable.querySelector('td.planet>input').dispatchEvent(new Event('input'));

    angularForm.querySelector('td.wait>input').value = playerTable.querySelector('td.wait>input').value;
    angularForm.querySelector('td.wait>input').dispatchEvent(new Event('input'));
    playerTable.querySelector('td.wait>input').value = '';
    playerTable.querySelector('td.wait>input').dispatchEvent(new Event('input'));

    angularForm.querySelector('td.comment>textarea').value = playerTable.querySelector('td.comment>textarea').value;
    angularForm.querySelector('td.comment>textarea').dispatchEvent(new Event('input'));
    playerTable.querySelector('td.comment>textarea').value = '';
    playerTable.querySelector('td.comment>textarea').dispatchEvent(new Event('input'));

    angularForm.querySelector('td.user>input').value = playerTable.parentElement.querySelector('div.left.name').childNodes[0].textContent.trim();
    angularForm.querySelector('td.user>input').dispatchEvent(new Event('input'));

    angularForm.querySelector('td.submit>button').click();
}
