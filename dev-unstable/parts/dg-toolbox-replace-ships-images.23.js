function replaceShipsImages() {
    replaceImgWithImg('/images/units/research/merchant.png', 'https://i.imgur.com/ub6WvsQ.jpg');
    replaceImgWithImg('/images/units/research/destroyer.png', 'https://i.imgur.com/h82C4EI.jpg');
    replaceImgWithImg('/images/units/research/trader.png', 'https://i.imgur.com/cO5vLsY.jpg');
    replaceImgWithImg('/images/units/research/cruiser.png', 'https://i.imgur.com/WnN7vst.jpg');
    replaceImgWithImg('/images/units/research/hulk.png', 'https://i.imgur.com/t9bVpKK.jpg');
    replaceImgWithImg('/images/units/research/battleship.png', 'https://i.imgur.com/i2qZbts.jpg');

    replaceImgWithImg('/images/units/small/outpost_ship.gif', 'https://i.imgur.com/kbTDPUp.jpg');
    replaceImgWithImg('/images/units/main/ships/outpost_ship.gif', 'https://i.imgur.com/kbTDPUp.jpg');
    replaceImgWithImg('/images/units/small/colonisation_ship.gif', 'https://i.imgur.com/niEL3PF.jpg');
    replaceImgWithImg('/images/units/main/ships/colonisation_ship.gif', 'https://i.imgur.com/niEL3PF.jpg');
    replaceImgWithImg('/images/units/small/fighter.gif', 'https://i.imgur.com/CHcGyYX.jpg');
    replaceImgWithImg('/images/units/main/ships/fighter.gif', 'https://i.imgur.com/CHcGyYX.jpg');
    replaceImgWithImg('/images/units/small/bomber.gif', 'https://i.imgur.com/fvl7c8r.jpg');
    replaceImgWithImg('/images/units/main/ships/bomber.gif', 'https://i.imgur.com/fvl7c8r.jpg');
    replaceImgWithImg('/images/units/small/frigate.gif', 'https://i.imgur.com/DgHPNSL.jpg');
    replaceImgWithImg('/images/units/main/ships/frigate.gif', 'https://i.imgur.com/DgHPNSL.jpg');
    replaceImgWithImg('/images/units/small/invasion_ship.gif', 'https://i.imgur.com/1MvzSLg.jpg');
    replaceImgWithImg('/images/units/main/ships/invasion_ship.gif', 'https://i.imgur.com/1MvzSLg.jpg');
    replaceImgWithImg('/images/units/small/destroyer.gif', 'https://i.imgur.com/h82C4EI.jpg');
    replaceImgWithImg('/images/units/main/ships/destroyer.gif', 'https://i.imgur.com/h82C4EI.jpg');
    replaceImgWithImg('/images/units/small/cruiser.gif', 'https://i.imgur.com/WnN7vst.jpg');
    replaceImgWithImg('/images/units/main/ships/cruiser.gif', 'https://i.imgur.com/WnN7vst.jpg');
    replaceImgWithImg('/images/units/small/battleship.gif', 'https://i.imgur.com/i2qZbts.jpg');
    replaceImgWithImg('/images/units/main/ships/battleship.gif', 'https://i.imgur.com/i2qZbts.jpg');

    replaceImgWithImg('/images/units/small/holo_projector.gif', 'https://i.imgur.com/HTxwxkb.jpg');
    replaceImgWithImg('/images/units/main/ships/holo_projector.gif', 'https://i.imgur.com/HTxwxkb.jpg');
    replaceImgWithImg('/images/units/small/holo_fighter.gif', 'https://i.imgur.com/7HNtQTE.jpg');
    replaceImgWithImg('/images/units/main/ships/holo_fighter.gif', 'https://i.imgur.com/7HNtQTE.jpg');
    replaceImgWithImg('/images/units/small/holo_bomber.gif', 'https://i.imgur.com/rP6H84i.jpg');
    replaceImgWithImg('/images/units/main/ships/holo_bomber.gif', 'https://i.imgur.com/rP6H84i.jpg');
    replaceImgWithImg('/images/units/small/holo_frigate.gif', 'https://i.imgur.com/3cFcX98.jpg');
    replaceImgWithImg('/images/units/main/ships/holo_frigate.gif', 'https://i.imgur.com/3cFcX98.jpg');
    replaceImgWithImg('/images/units/small/holo_destroyer.gif', 'https://i.imgur.com/UNP7xwd.jpg');
    replaceImgWithImg('/images/units/main/ships/holo_destroyer.gif', 'https://i.imgur.com/UNP7xwd.jpg');
    replaceImgWithImg('/images/units/small/holo_cruiser.gif', 'https://i.imgur.com/IMY1eLs.jpg');
    replaceImgWithImg('/images/units/main/ships/holo_cruiser.gif', 'https://i.imgur.com/IMY1eLs.jpg');
    replaceImgWithImg('/images/units/small/holo_battleship.gif', 'https://i.imgur.com/FrXY4vT.jpg');
    replaceImgWithImg('/images/units/main/ships/holo_battleship.gif', 'https://i.imgur.com/FrXY4vT.jpg');

    replaceImgWithImg('/images/units/small/freighter.gif', 'https://i.imgur.com/XHA898r.jpg');
    replaceImgWithImg('/images/units/main/ships/freighter.gif', 'https://i.imgur.com/XHA898r.jpg');
    replaceImgWithImg('/images/units/small/merchant.gif', 'https://i.imgur.com/ub6WvsQ.jpg');
    replaceImgWithImg('/images/units/main/ships/merchant.gif', 'https://i.imgur.com/ub6WvsQ.jpg');
    replaceImgWithImg('/images/units/small/trader.gif', 'https://i.imgur.com/cO5vLsY.jpg');
    replaceImgWithImg('/images/units/main/ships/trader.gif', 'https://i.imgur.com/cO5vLsY.jpg');
    replaceImgWithImg('/images/units/small/hulk.gif', 'https://i.imgur.com/t9bVpKK.jpg');
    replaceImgWithImg('/images/units/main/ships/hulk.gif', 'https://i.imgur.com/t9bVpKK.jpg');

    document.querySelectorAll('form[action="/fleet/create/"] button').forEach((create) => {
        create.onclick = (e) => {
            document.getElementById('dgt-bts-sound').play();
            setTimeout(() => {
                create.parentElement.submit();
            }, 3000);

            e.preventDefault();
        };
    });
}
