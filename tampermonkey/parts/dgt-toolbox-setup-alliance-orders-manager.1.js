function setUpAllianceOrdersManagerPanel() {
    if (windowURL[1] === 'planets') {
        if (document.querySelector('.allianceBox > .playerList')) {
            document.querySelector('.allianceBox > .playerList').append(document.createElement('dgt-alliance-orders-manager-panel'));
        }
    }
}
