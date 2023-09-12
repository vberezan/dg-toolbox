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

function loadResource(element) {
    let node = document.createElement(element.tagName);

    if (element.href) {
        node.href = element.href;
    }

    if (element.src) {
        node.src = element.src;
    }

    node.rel = element.rel;
    document.head.appendChild(node);

    return node;
}

function loadSetups(windowURL) {
    loadResource({
        tagName: 'script',
        src: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox@development/tampermonkey/parts/dg-toolbox-setup-navbar-replacement.0.js',
        rel: 'text/javascript'
    }).onload = function () {
        setUpNavbarReplacement();
    }

    loadResource({
        tagName: 'script',
        src: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox@development/tampermonkey/parts/dg-toolbox-setup-planet-list-panel.0.js',
        rel: 'text/javascript'
    }).onload = function () {
        setUpPlanetListStatsPanel();
    }

    loadResource({
        tagName: 'script',
        src: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox@development/tampermonkey/parts/dg-toolbox-setup-shared-scans-collector.0.js',
        rel: 'text/javascript'
    }).onload = function () {
        setUpSharedScansCollector(windowURL);
    }

    loadResource({
        tagName: 'script',
        src: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox@development/tampermonkey/parts/dg-toolbox-setup-navigation-scan-data-panel.0.js',
        rel: 'text/javascript'
    }).onload = function () {
        setUpNavigationScanDataPanel(windowURL);
    }
}

function loadCustomStyling() {
    loadResource({
        tagName: 'script',
        src: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox@development/tampermonkey/parts/dg-toolbox-custom-styling.3.js',
        rel: 'text/javascript'
    }).onload = function () {
        applyCustomStyling();
    }

    loadResource({
        tagName: 'script',
        src: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox@development/tampermonkey/parts/dg-toolbox-replace-icons-with-fa-icons.0.js',
        rel: 'text/javascript'
    }).onload = function () {
        replaceIconsWithFAIcons();
    }

    loadResource({
        tagName: 'script',
        src: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox@development/tampermonkey/parts/dg-toolbox-replace-icons-with-images.1.js',
        rel: 'text/javascript'
    }).onload = function () {
        replaceIconsWithImages();
    }

    loadResource({
        tagName: 'script',
        src: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox@development/tampermonkey/parts/dg-toolbox-replace-planets-images.0.js',
        rel: 'text/javascript'
    }).onload = function () {
        replacePlanetsImages();
    }

    loadResource({
        tagName: 'script',
        src: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox@development/tampermonkey/parts/dg-toolbox-replace-structures-images.0.js',
        rel: 'text/javascript'
    }).onload = function () {
        replaceStructuresImages();
    }
}

function loadAngular() {
    let angular = [{
        tagName: 'link',
        href: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox@development/angular/toolbox-app/dist/toolbox-app/styles.0c5a3c9eca00aa87.css',
        rel: 'stylesheet'
    }, {
        tagName: 'script',
        src: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox@development/angular/toolbox-app/dist/toolbox-app/runtime.79543c56c927dd9a.js',
        rel: 'module'
    }, {
        tagName: 'script',
        src: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox@development/angular/toolbox-app/dist/toolbox-app/polyfills.fccd34e7614ee531.js',
        rel: 'module'
    }, {
        tagName: 'script',
        src: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox@development/angular/toolbox-app/dist/toolbox-app/main.1039d67f3fbd43df.js',
        rel: 'module'
    }];

    angular.forEach((ang) => {
        loadResource(ang);
    });
}

(function () {

    document.addEventListener("DOMContentLoaded", function (event) {
        document.body.style.visibility = 'hidden';
        let windowURL = window.location.pathname.split(/\//g);

        console.log("%cDarkGalaxy Toolbox - DGT", "font-size: 16px; font-weight: bold;");

        loadResource({
            tagName: 'script',
            src: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox@development/tampermonkey/parts/dg-toolbox-utils.1.js',
            rel: 'text/javascript'
        }).onload = function () {
            document.body.prepend(document.createElement('dgt-authentication'));
            console.log("%cDGT%c - cooking environment", "font-size: 12px; font-weight: bold;", "font-size: 12px;");
            loadSetups(windowURL);
            console.log("%cDGT%c - cooking additional components", "font-size: 12px; font-weight: bold;", "font-size: 12px;");
            loadAngular();
            console.log("%cDGT%c - cooking custom theme", "font-size: 12px; font-weight: bold;", "font-size: 12px;");
            loadCustomStyling();

            console.log("%cDGT%c - all done", "font-size: 12px; font-weight: bold;", "font-size: 12px;");
            console.log("%cDGT%c - 2023 ©nobody - do whatever you want with this code", "font-size: 12px; font-weight: bold;", "font-size: 12px;");
        }
    });
})();
