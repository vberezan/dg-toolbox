// ==UserScript==
// @name         DarkGalaxy Toolbox
// @version      2.0.0
// @namespace    dg-toolbox
// @homepage     https://github.com/vberezan/dg-toolbox
// @supportURL   https://github.com/vberezan/dg-toolbox
// @downloadURL  https://raw.githubusercontent.com/vberezan/dg-toolbox/development/install/dg-toolbox.user.js
// @updateURL    https://raw.githubusercontent.com/vberezan/dg-toolbox/development/install/dg-toolbox.user.js
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

function fetchResource(firebase, fallback) {
    if (localStorage.getItem('dev-mode')) return fallback;

    if (!localStorage.getItem('javascript-repository')) return fallback;

    let javascriptRepo = JSON.parse(localStorage.getItem('javascript-repository')).value;

    if (!javascriptRepo) return fallback;

    let dynamicUrl = JSON.parse(javascriptRepo)[firebase];

    if (!dynamicUrl) return fallback;

    return dynamicUrl;
}

function loadSetups(windowURL) {
    loadResource({
        tagName: 'script',
        src: fetchResource('dgtSetupDgtPlaceholders', 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox@development/stable-release/2.0.0/dgt-toolbox-setup-dgt-placeholders.js'),
        rel: 'text/javascript'
    }).onload = function () {
        setUpPrerequisites()
        setUpNavbarReplacement();
        setUpChangelog(windowURL);
        setUpAdminDataLoad(windowURL);
        setUpPlanetListStatsPanel(windowURL);
        setUpSharedScansCollector(windowURL);
        setUpNavigationScanDataPanel(windowURL);
        setUpAlliancePanel(windowURL);
        setUpRankings(windowURL);
        setUpResearchPanel(windowURL);
    }
}

function loadCustomStyling() {
    loadResource({
        tagName: 'script',
        src: fetchResource('dgtCustomStyling','https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox@development/stable-release/2.0.0/dg-toolbox-custom-styling.3.js'),
        rel: 'text/javascript'
    }).onload = function () {
        applyCustomStyling();

        loadResource({
            tagName: 'script',
            src: fetchResource('dgtReplaceIconsWithFaIcons','https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox@development/stable-release/2.0.0/dg-toolbox-replace-icons-with-fa-icons.js'),
            rel: 'text/javascript'
        }).onload = function () {
            replaceIconsWithFAIcons();
        }

        loadResource({
            tagName: 'script',
            src: fetchResource('dgtReplaceIconsWithImages','https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox@development/stable-release/2.0.0/dg-toolbox-replace-icons-with-images.js'),
            rel: 'text/javascript'
        }).onload = function () {
            replaceIconsWithImages();
        }

        loadResource({
            tagName: 'script',
            src: fetchResource('dgtReplacePlanetsImages','https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox@development/stable-release/2.0.0/dg-toolbox-replace-planets-images.js'),
            rel: 'text/javascript'
        }).onload = function () {
            replacePlanetsImages();
        }

        loadResource({
            tagName: 'script',
            src: fetchResource('dgtReplaceStructuresImages','https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox@development/stable-release/2.0.0/dg-toolbox-replace-structures-images.js'),
            rel: 'text/javascript'
        }).onload = function () {
            replaceStructuresImages(window.location.origin);
        }

        loadResource({
            tagName: 'script',
            src: fetchResource('dgtReplaceShipsImages','https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox@development/stable-release/2.0.0/dg-toolbox-replace-ships-images.js'),
            rel: 'text/javascript'
        }).onload = function () {
            replaceShipsImages();
        }
    }
}

function loadAngular() {
    let angular = [{
        tagName: 'script',
        src: fetchResource('angularRuntime','https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox@development/stable-release/2.0.0/runtime.js'),
        rel: 'module'
    }, {
        tagName: 'script',
        src: fetchResource('angularPolyfills','https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox@development/stable-release/2.0.0/polyfills.js'),
        rel: 'module'
    }, {
        tagName: 'script',
        src: fetchResource('angularMain','https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox@development/stable-release/2.0.0/main.js'),
        rel: 'module'
    }];

    loadResource(angular[0]).onload = function () {
        console.log("%cDGT%c - setting up runtime", "font-size: 12px; font-weight: bold;", "font-size: 12px;");
        loadResource(angular[1]).onload = function () {
            console.log("%cDGT%c - preparing polyfills", "font-size: 12px; font-weight: bold;", "font-size: 12px;");
            loadResource(angular[2]).onload = function () {
                console.log("%cDGT%c - booting application modules", "font-size: 12px; font-weight: bold;", "font-size: 12px;");
            }
        }
    }
}

function loadGlobalAngularStyling() {
    let angular = [{
        tagName: 'link',
        href: fetchResource('angularStyles','https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox@development/stable-release/2.0.0/styles.1.css'),
        rel: 'stylesheet'
    }];

    angular.forEach((ang) => {
        loadResource(ang);
    });
}

(function () {
    document.addEventListener("DOMContentLoaded", function (event) {
        localStorage.setItem('dev-mode', true);
        if (localStorage.getItem('hotfix') !== '2.0.0' ) {
            if (!localStorage.getItem('post-install-fetch-metadata')) {
                localStorage.clear();
            }
            localStorage.setItem('hotfix', '2.0.0');
        }

        let windowURL = window.location.pathname.split(/\//g);

        console.log("%cDarkGalaxy Toolbox - DGT", "font-size: 16px; font-weight: bold;");

        loadGlobalAngularStyling();

        loadResource({
            tagName: 'script',
            src: fetchResource('dgtUtils','https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox@development/stable-release/2.0.0/dg-toolbox-utils.js'),
            rel: 'text/javascript'
        }).onload = function () {
            if (document.getElementById('playerBox')) {
                document.getElementById('playerBox').append(document.createElement('dgt-authentication'));

                console.log("%cDGT%c - assembling platform environment", "font-size: 12px; font-weight: bold;", "font-size: 12px;");
                loadSetups(windowURL);
                console.log("%cDGT%c - injecting additional components", "font-size: 12px; font-weight: bold;", "font-size: 12px;");
                loadAngular();
                console.log("%cDGT%c - applying custom theme", "font-size: 12px; font-weight: bold;", "font-size: 12px;");
                loadCustomStyling();
                setTimeout(() => {
                    document.body.style.visibility = 'visible';
                }, 0);
            } else {
                setTimeout(() => {
                    document.body.style.visibility = 'visible';
                }, 0);
            }
        }

        localStorage.setItem('game-endpoint', '{"ttl":0,"expiry":0,"value":"\\"' + window.location.origin + '\\""}');

        if (!localStorage.getItem('local-metadata')) {
            localStorage.setItem('local-metadata', '{"ttl":0,"expiry":0,"value":"{\\"dgtVersion\\":\\"v2.0.0\\",\\"allianceMembersTurn\\":{\\"version\\":0,\\"turn\\":0},\\"playersRankingsTurn\\":{\\"version\\":0,\\"turn\\":0},\\"planetsTurn\\":{\\"version\\":0,\\"turn\\":0}}"}');
        }
    });

    window.unload = function() {
        document.body.style.visibility = 'hidden';
    };
})();
