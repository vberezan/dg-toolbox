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
