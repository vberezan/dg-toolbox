function setUpAllianceOrdersManagerPanel(windowURL) {
    if (windowURL[1] === 'alliances') {
        if (document.querySelector('.allianceBox > .playerList')) {
            document.querySelector('.allianceBox > .playerList').parentElement.append(document.createElement('dgt-alliance-orders-manager-panel'));
        }
    }
}
