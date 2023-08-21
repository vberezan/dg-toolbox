// ==UserScript==
// @name         DarkGalaxy Toolbox
// @version      0.0.1.alpha
// @namespace    dg-toolbox
// @homepage     https://github.com/vberezan/dg-toolbox
// @downloadURL  https://raw.githubusercontent.com/vberezan/dg-toolbox/main/tampermonkey/dg-toolbox.main.js
// @updateURL    https://raw.githubusercontent.com/vberezan/dg-toolbox/main/tampermonkey/dg-toolbox.main.js
// @description  Revamp DarkGalaxy UI and some additional crafts. All of this to combine the classical DG experience with the modern web experience. This toolbox is supported only by modern browsers.
// @match        https://*.darkgalaxy.com
// @match        https://*.darkgalaxy.com/*
// @copyright    2023 Vlad Berezan
// @grant        GM_xmlhttpRequest
// ==/UserScript==

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

function prepareAngularEnvironment() {
    let style = document.createElement('link');
    style.href = 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox/angular/toolbox-app/dist/toolbox-app/styles.53797446567d94e9.css';
    style.rel = 'stylesheet';
    document.head.appendChild(style);

    let runtime = document.createElement('script');
    runtime.src = 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox/angular/toolbox-app/dist/toolbox-app/runtime.7f7a1c1514cf4fd2.js';
    runtime.type = 'module';
    document.head.appendChild(runtime);

    let polyfills = document.createElement('script');
    polyfills.src = 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox/angular/toolbox-app/dist/toolbox-app/polyfills.8e8b88e65f8eb80f.js';
    polyfills.type = 'module';
    document.head.appendChild(polyfills);

    let main = document.createElement('script');
    main.src = 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox/angular/toolbox-app/dist/toolbox-app/main.c2007b952a982b71.js';
    main.type = 'module';
    document.head.appendChild(main);
}

function preparePlanetsStats() {
    document.getElementById('planetList').prepend(document.createElement('dg-toolbox-stats-panel'));
}

(function() {
    replacePlanetsImages();
    prepareAngularEnvironment();
    preparePlanetsStats();
})();
