// ==UserScript==
// @name         DarkGalaxy Toolbox
// @version      0.0.1.alpha
// @namespace    dg-toolbox
// @homepage     https://github.com/vberezan/dg-toolbox
// @supportURL   https://github.com/vberezan/dg-toolbox
// @downloadURL  https://raw.githubusercontent.com/vberezan/dg-toolbox/development/tampermonkey/dg-toolbox-development.user.js
// @updateURL    https://raw.githubusercontent.com/vberezan/dg-toolbox/development/tampermonkey/dg-toolbox-development.user.js
// @description  Revamp DarkGalaxy UI and some additional crafts. All of this to combine the classical DG experience with the modern web experience. This toolbox is supported only by modern browsers.
// @match        https://*.darkgalaxy.com
// @match        https://*.darkgalaxy.com/*
// @author       Vlad Berezan
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// ==/UserScript==

function loadResource(tagName, href, rel) {
    let node = document.createElement(tagName);
    node.href = href;
    node.rel = rel;
    document.head.appendChild(node);
}

function loadSetups(windowURL) {
    setups = [{
        tagName: 'script',
        href: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox@development/tampermonkey/dg-toolbox-setup-navbar-replacement.0.js',
        rel: 'text/javascript',
        execute: setUpNavbarReplacement()
    }, {
        tagName: 'script',
        href: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox@development/tampermonkey/dg-toolbox-setup-planet-list-panel.0.js',
        rel: 'text/javascript',
        execute: setUpPlanetListStatsPanel()
    }, {
        tagName: 'script',
        href: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox@development/tampermonkey/dg-toolbox-setup-shared-scans-collector.0.js',
        rel: 'text/javascript',
        execute: setUpSharedScansCollector(windowURL)
    }, {
        tagName: 'script',
        href: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox@development/tampermonkey/dg-toolbox-navigation-scan-data-panel.0.js',
        rel: 'text/javascript',
        execute: setUpNavigationScanDataPanel(windowURL)
    }];

    setups.forEach((setup) => {
        loadResource(setup);
        setup.execute();
    });
}

function loadAngular() {
    angular = [{
        tagName: 'link',
        href: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox@development/angular/toolbox-app/dist/toolbox-app/styles.8d77f56fabf3803d.css',
        rel: 'stylesheet'
    }, {
        tagName: 'script',
        href: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox@development/angular/toolbox-app/dist/toolbox-app/runtime.79543c56c927dd9a.js',
        rel: 'module'
    }, {
        tagName: 'script',
        href: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox@development/angular/toolbox-app/dist/toolbox-app/polyfills.fccd34e7614ee531.js',
        rel: 'module'
    }, {
        tagName: 'script',
        href: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox@development/angular/toolbox-app/dist/toolbox-app/main.cf4755632e65d99e.js',
        rel: 'module'
    }];

    angular.forEach((ang) => {
        loadResource(ang);
    });
}

function loadCustomStyling() {
    stylings = [{
        tagName: 'script',
        href: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox@development/tampermonkey/dg-toolbox-apply-custom-styling.0.js',
        rel: 'text/javascript',
        execute: applyCustomStyling()
    },{
        tagName: 'script',
        href: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox@development/tampermonkey/dg-toolbox-replace-icons-with-fa-icons.0.js',
        rel: 'text/javascript',
        execute: replaceIconsWithFAIcons()
    },{
        tagName: 'script',
        href: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox@development/tampermonkey/dg-toolbox-replace-planets-images.0.js',
        rel: 'text/javascript',
        execute: replacePlanetsImages()
    },{
        tagName: 'script',
        href: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox@development/tampermonkey/dg-toolbox-replace-structures-images.0.js',
        rel: 'text/javascript',
        execute: replaceStructuresImages()
    }];

    stylings.forEach((styling) => {
        loadResource(styling);
    });
}

(function () {

    document.addEventListener("DOMContentLoaded", function (event) {
        document.body.style.visibility = 'hidden';
        let windowURL = window.location.pathname.split(/\//g);

        console.log("%cDarkGalaxy Toolbox - DGT", "font-size: 16px; font-weight: bold;");

        loadResource('script', 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox@development/tampermonkey/dg-toolbox-utils.0.js', 'text/javascript')
        loadSetups(windowURL);
        loadAngular();
        loadCustomStyling();
    });
})();
