// ==UserScript==
// @name         DarkGalaxy Toolbox
// @version      0.0.3.beta
// @namespace    dg-toolbox
// @homepage     https://github.com/vberezan/dg-toolbox
// @supportURL   https://github.com/vberezan/dg-toolbox
// @downloadURL  https://raw.githubusercontent.com/vberezan/dg-toolbox/main/tampermonkey/dg-toolbox.user.js
// @updateURL    https://raw.githubusercontent.com/vberezan/dg-toolbox/main/tampermonkey/dg-toolbox.user.js
// @description  Revamp DarkGalaxy UI and some additional crafts. All of this to combine the classical DG experience with the modern web experience. This toolbox is supported only by modern browsers.
// @match        https://*.darkgalaxy.com
// @match        https://*.darkgalaxy.com/*
// @author       Vlad Berezan
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// ==/UserScript==

function loadResource(element) {
    let node = document.createElement(element.tagName);

    if (element.href) {
        node.href = element.href;
    }

    if (element.src) {
        node.src = element.src;
    }

    node.rel = element.rel;
    document.head.append(node);

    return node;
}

function loadSetups(windowURL) {
    loadResource({
        tagName: 'script',
        src: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox/tampermonkey/parts/dgt-toolbox-setup-dgt-placeholders.17.js',
        rel: 'text/javascript'
    }).onload = function () {
        setUpUiParser();
        setUpLocalStorageManager();
        setUpNavbarReplacement();
        setUpPlanetListStatsPanel(windowURL);
        setUpSharedScansCollector(windowURL);
        setUpNavigationScanDataPanel(windowURL);
        setUpAllianceOrdersManagerPanel(windowURL);
        setUpFleetOrdersListPanel(windowURL);
    }
}

function loadCustomStyling() {
    loadResource({
        tagName: 'script',
        src: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox/tampermonkey/parts/dg-toolbox-custom-styling.14.js',
        rel: 'text/javascript'
    }).onload = function () {
        applyCustomStyling();
    }

    loadResource({
        tagName: 'script',
        src: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox/tampermonkey/parts/dg-toolbox-replace-icons-with-fa-icons.10.js',
        rel: 'text/javascript'
    }).onload = function () {
        replaceIconsWithFAIcons();
    }

    loadResource({
        tagName: 'script',
        src: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox/tampermonkey/parts/dg-toolbox-replace-icons-with-images.12.js',
        rel: 'text/javascript'
    }).onload = function () {
        replaceIconsWithImages();
    }

    loadResource({
        tagName: 'script',
        src: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox/tampermonkey/parts/dg-toolbox-replace-planets-images.3.js',
        rel: 'text/javascript'
    }).onload = function () {
        replacePlanetsImages();
    }

    loadResource({
        tagName: 'script',
        src: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox/tampermonkey/parts/dg-toolbox-replace-structures-images.5.js',
        rel: 'text/javascript'
    }).onload = function () {
        replaceStructuresImages();
    }

    loadResource({
        tagName: 'script',
        src: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox/tampermonkey/parts/dg-toolbox-replace-ships-images.7.js',
        rel: 'text/javascript'
    }).onload = function () {
        replaceShipsImages();
    }
}

function loadAngular() {
    let angular = [{
        tagName: 'script',
        src: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox/angular/toolbox-app/dist/toolbox-app/runtime.7f7a1c1514cf4fd2.js',
        rel: 'module'
    }, {
        tagName: 'script',
        src: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox/angular/toolbox-app/dist/toolbox-app/polyfills.8e8b88e65f8eb80f.js',
        rel: 'module'
    }, {
        tagName: 'script',
        src: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox/angular/toolbox-app/dist/toolbox-app/main.3684da40820df7a0.js',
        rel: 'module'
    }];

    angular.forEach((ang) => {
        loadResource(ang);
    });
}

function loadGlobalAngularStyling() {
    let angular = [{
        tagName: 'link',
        href: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox/angular/toolbox-app/dist/toolbox-app/styles.318ab0d9d8372400.css',
        rel: 'stylesheet'
    }];

    angular.forEach((ang) => {
        loadResource(ang);
    });
}

(function () {
    document.addEventListener("DOMContentLoaded", function (event) {
        let windowURL = window.location.pathname.split(/\//g);

        console.log("%cDarkGalaxy Toolbox - DGT", "font-size: 16px; font-weight: bold;");

        loadGlobalAngularStyling();

        loadResource({
            tagName: 'script',
            src: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox/tampermonkey/parts/dg-toolbox-utils.4.js',
            rel: 'text/javascript'
        }).onload = function () {
            if (document.getElementById('playerBox')) {
                document.getElementById('playerBox').append(document.createElement('dgt-authentication'));

                console.log("%cDGT%c - cooking environment", "font-size: 12px; font-weight: bold;", "font-size: 12px;");
                loadSetups(windowURL);
                console.log("%cDGT%c - cooking additional components", "font-size: 12px; font-weight: bold;", "font-size: 12px;");
                loadAngular();
                console.log("%cDGT%c - cooking custom theme", "font-size: 12px; font-weight: bold;", "font-size: 12px;");
                loadCustomStyling();
                setTimeout(() => {
                    document.body.style.visibility = 'visible';
                }, 0);

                console.log("%cDGT%c - enjoy", "font-size: 12px; font-weight: bold;", "font-size: 12px;");
            } else {
                setTimeout(() => {
                    document.body.style.visibility = 'visible';
                }, 0);
            }
        }
    });

    window.unload = function() {
        document.body.style.visibility = 'hidden';
    };
})();
