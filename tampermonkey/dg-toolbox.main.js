// ==UserScript==
// @name	 DG Toolbox v0.1 Beta
// @namespace    ROF
// @version      0.1.1
// @description  Revamp DarkGalaxy UI and additional tools that increase the game experience
// @match        https://*.darkgalaxy.com
// @match        https://*.darkgalaxy.com/*
// @copyright    2023 Vlad Berezan
// @grant        none
// ==/UserScript==

// Theme related changes

// change default images with cooler ones
function replacePlanetsImages() {
    const images = ['https://i.imgur.com/j1zNxcQ.png', 'https://i.imgur.com/6MgxGGq.png', 'https://i.imgur.com/oAbNyce.png', 'https://i.imgur.com/3qLpUXw.png', 'https://i.imgur.com/v7okzfK.png',
                    'https://i.imgur.com/J6tgFgr.png', 'https://i.imgur.com/IlR9Gu5.png', 'https://i.imgur.com/K3Ql8bd.png', 'https://i.imgur.com/ylW5li6.png','https://i.imgur.com/uBnJ3NC.png',
                    'https://i.imgur.com/W5YogBX.png', 'https://i.imgur.com/DGBzdwA.png'];


    const imgIdPattern = /\/([\d]+)\./;
    const replaceImage = function (img) {
        const [,id] = img.src.match(imgIdPattern);
        img.src = images[id % images.length];
    };

    if (location.href.match(/planet\/[0-9]+/)) { // on single planet overview use big image
        Array.from(document.querySelectorAll('#planetImage > img')).forEach((img) => replaceImage(img));
    } else { // small images for anything else (planet list, nav other planets, nav own planets)
        Array.from(document.querySelectorAll('.planetImage img, .planets > img, .planets > a > img')).forEach((img) => replaceImage(img, 'icon'));
    }
}

// change default 1 planet / row display to 2 planets / row
function displayPlanetsAsGrid() {

}

(function() {
    replacePlanetsImages();
    displayPlanetsAsGrid();
})();
