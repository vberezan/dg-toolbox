// ==UserScript==
// @name         DarkGalaxy Toolbox
// @version      2.x.x
// @namespace    dg-toolbox
// @homepage     https://github.com/vberezan/dg-toolbox
// @supportURL   https://github.com/vberezan/dg-toolbox
// @downloadURL  https://raw.githubusercontent.com/vberezan/dg-toolbox/development/dev-unstable/dg-toolbox-development.user.js
// @updateURL    https://raw.githubusercontent.com/vberezan/dg-toolbox/development/dev-unstable/dg-toolbox-development.user.js
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
  if (localStorage.getItem('js-version')) return JSON.parse(localStorage.getItem('js-version')).value;
  else return 'v2.0.8';
}

function loadSetups(windowURL) {
  console.log("%cDGT%c - assembling platform environment", "font-size: 12px; font-weight: bold;", "font-size: 12px;");

  loadResource({
    tagName: 'script',
    src: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox@development/dev-unstable/parts/dgt-toolbox-setup-dgt-placeholders.20.js',
    rel: 'text/javascript'
  }).onload = function () {
    setupPlaceHolders(windowURL);
  }
}

function loadCustomStyling(windowURL) {
  console.log("%cDGT%c - applying custom theme", "font-size: 12px; font-weight: bold;", "font-size: 12px;");

  loadResource({
    tagName: 'script',
    src: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox@development/dev-unstable/parts/dg-toolbox-custom-styling.42.js',
    rel: 'text/javascript'
  }).onload = function () {
    applyCustomStyling(windowURL);

    loadResource({
      tagName: 'script',
      src: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox@development/dev-unstable/parts/dg-toolbox-replace-icons-with-fa-icons.10.js',
      rel: 'text/javascript'
    }).onload = function () {
      replaceIconsWithFAIcons();
    }

    loadResource({
      tagName: 'script',
      src: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox@development/dev-unstable/parts/dg-toolbox-replace-icons-with-images.32.js',
      rel: 'text/javascript'
    }).onload = function () {
      replaceIconsWithImages();
    }

    loadResource({
      tagName: 'script',
      src: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox@development/dev-unstable/parts/dg-toolbox-replace-planets-images.6.js',
      rel: 'text/javascript'
    }).onload = function () {
      replacePlanetsImages();
    }

    loadResource({
      tagName: 'script',
      src: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox@development/dev-unstable/parts/dg-toolbox-replace-structures-images.8.js',
      rel: 'text/javascript'
    }).onload = function () {
      replaceStructuresImages(window.location.origin);
    }

    loadResource({
      tagName: 'script',
      src: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox@development/dev-unstable/parts/dg-toolbox-replace-ships-images.17.js',
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
    src: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox@development/angular/toolbox-app/dist/toolbox-app/runtime.926d433ed3f5f1cc.js',
    rel: 'module'
  }, {
    tagName: 'script',
    src: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox@development/angular/toolbox-app/dist/toolbox-app/polyfills.8e8b88e65f8eb80f.js',
    rel: 'module'
  }, {
    tagName: 'script',
    src: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox@development/angular/toolbox-app/dist/toolbox-app/main.1f6540edb3956901.js',
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
    href: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox@development/angular/toolbox-app/dist/toolbox-app/styles.5dd0a0650f6ddaf3.css',
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
      src: 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox@development/dev-unstable/parts/dg-toolbox-utils.4.js',
      rel: 'text/javascript'
    }).onload = function () {
      if (document.getElementById('playerBox')) {
        document.getElementById('playerBox').append(document.createElement('dgt-authentication'));

        loadSetups(windowURL);
        loadAngular();
        loadCustomStyling(windowURL);
        setTimeout(() => document.body.style.visibility = 'visible', 250);
      } else setTimeout(() => document.body.style.visibility = 'visible', 250);
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
