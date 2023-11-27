// ==UserScript==
// @name         DarkGalaxy Toolbox
// @version      2.x.x
// @namespace    dg-toolbox
// @homepage     https://github.com/vberezan/dg-toolbox
// @supportURL   https://github.com/vberezan/dg-toolbox
// @downloadURL  https://raw.githubusercontent.com/vberezan/dg-toolbox/stable-release/dg-toolbox.user.js
// @updateURL    https://raw.githubusercontent.com/vberezan/dg-toolbox/stable-release/dg-toolbox.user.js
// @description  Revamp DarkGalaxy UI and some additional crafts. All of this to combine the classical DG experience with the modern web experience. This toolbox is supported only by modern browsers.
// @match        https://*.darkgalaxy.com
// @match        https://*.darkgalaxy.com/*
// @author       Vlad Berezan
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// ==/UserScript==

function loadResource(element) {
  let node = document.createElement(element.tagName);
  if (element.href) node.href = element.href;
  if (element.src) node.src = element.src;

  node.rel = element.rel;
  document.head.append(node);

  return node;
}

function getVersion() {
  if (localStorage.getItem('local-metadata'))
    return JSON.parse(JSON.parse(localStorage.getItem('local-metadata')).value).dgtVersion;
  else return 'v2.0.11';

}

function loadSetups(windowURL) {
  console.log("%cDGT%c - assembling platform environment", "font-size: 12px; font-weight: bold;", "font-size: 12px;");

  loadResource({
    tagName: 'script',
    src: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox/stable-release/' + getVersion() + '/dgt-toolbox-setup-dgt-placeholders.js',
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

function loadCustomStyling(windowURL) {
  console.log("%cDGT%c - applying custom theme", "font-size: 12px; font-weight: bold;", "font-size: 12px;");

  loadResource({
    tagName: 'script',
    src: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox/stable-release/' + getVersion() + '/dg-toolbox-custom-styling.js',
    rel: 'text/javascript'
  }).onload = function () {
    applyCustomStyling(windowURL);

    loadResource({
      tagName: 'script',
      src: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox/stable-release/' + getVersion() + '/dg-toolbox-replace-icons-with-fa-icons.js',
      rel: 'text/javascript'
    }).onload = function () {
      replaceIconsWithFAIcons();
    }

    loadResource({
      tagName: 'script',
      src: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox/stable-release/' + getVersion() + '/dg-toolbox-replace-icons-with-images.js',
      rel: 'text/javascript'
    }).onload = function () {
      replaceIconsWithImages();
    }

    loadResource({
      tagName: 'script',
      src: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox/stable-release/' + getVersion() + '/dg-toolbox-replace-planets-images.js',
      rel: 'text/javascript'
    }).onload = function () {
      replacePlanetsImages();
    }

    loadResource({
      tagName: 'script',
      src: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox/stable-release/' + getVersion() + '/dg-toolbox-replace-structures-images.js',
      rel: 'text/javascript'
    }).onload = function () {
      replaceStructuresImages(window.location.origin);
    }

    loadResource({
      tagName: 'script',
      src: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox/stable-release/' + getVersion() + '/dg-toolbox-replace-ships-images.js',
      rel: 'text/javascript'
    }).onload = function () {
      replaceShipsImages();
    }
  }
}

function loadAngular() {
  console.log("%cDGT%c - injecting additional components", "font-size: 12px; font-weight: bold;", "font-size: 12px;");

  let angular = [{
    tagName: 'script',
    src: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox/stable-release/' + getVersion() + '/runtime.js',
    rel: 'module'
  }, {
    tagName: 'script',
    src: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox/stable-release/' + getVersion() + '/polyfills.js',
    rel: 'module'
  }, {
    tagName: 'script',
    src: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox/stable-release/' + getVersion() + '/main.js',
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
  console.log("%cDarkGalaxy Toolbox - DGT", "font-size: 16px; font-weight: bold;");

  let angular = [{
    tagName: 'link',
    href: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox/stable-release/' + getVersion() + '/styles.css',
    rel: 'stylesheet'
  }];

  angular.forEach((ang) => loadResource(ang));
}

(function () {
  document.addEventListener("DOMContentLoaded", function (event) {
    document.body.style.visibility = 'hidden';
    let windowURL = window.location.pathname.split(/\//g);

    if (localStorage.getItem('hotfix') !== '2.x.x') {
      if (!localStorage.getItem('post-install-fetch-metadata')) localStorage.clear();

      localStorage.setItem('hotfix', '2.x.x');
    }

    loadGlobalAngularStyling();

    loadResource({
      tagName: 'script',
      src: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox/stable-release/' + getVersion() + '/dg-toolbox-utils.js',
      rel: 'text/javascript'
    }).onload = function () {
      if (document.getElementById('playerBox')) {
        document.getElementById('playerBox').append(document.createElement('dgt-authentication'));

        loadSetups(windowURL);
        loadAngular();
        loadCustomStyling(windowURL);
        setTimeout(() => document.body.style.visibility = 'visible', 100);
      } else setTimeout(() => document.body.style.visibility = 'visible', 100);
    }

    if (!localStorage.getItem('local-metadata')) {
      localStorage.setItem('local-metadata', '{"ttl":0,"expiry":0,"value":"{\\"dgtVersion\\":\\"' + getVersion() + '\\",\\"allianceMembersTurn\\":{\\"version\\":0,\\"turn\\":0},\\"playersRankingsTurn\\":{\\"version\\":0,\\"turn\\":0},\\"planetsTurn\\":{\\"version\\":0,\\"turn\\":0}}"}');
    }

    localStorage.setItem('game-endpoint', '{"ttl":0,"expiry":0,"value":"\\"' + window.location.origin + '\\""}');
  });

  window.unload = function () {
    document.body.style.visibility = 'hidden';
  };
})();
