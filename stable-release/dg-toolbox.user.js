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

function loadResource(e){let t=document.createElement(e.tagName);return e.href&&(t.href=e.href),e.src&&(t.src=e.src),t.rel=e.rel,document.head.append(t),t}function getVersion(){return localStorage.getItem("local-metadata")?JSON.parse(JSON.parse(localStorage.getItem("local-metadata")).value).dgtVersion:"v2.0.12"}function loadSetups(e){console.log("%cDGT%c - assembling platform environment","font-size: 12px; font-weight: bold;","font-size: 12px;"),loadResource({tagName:"script",src:"https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox/stable-release/"+getVersion()+"/dgt-toolbox-setup-dgt-placeholders.js",rel:"text/javascript"}).onload=function(){setUpPrerequisites(),setUpNavbarReplacement(),setUpChangelog(e),setUpAdminDataLoad(e),setUpPlanetListStatsPanel(e),setUpSharedScansCollector(e),setUpNavigationScanDataPanel(e),setUpAlliancePanel(e),setUpRankings(e),setUpResearchPanel(e)}}function loadCustomStyling(e){console.log("%cDGT%c - applying custom theme","font-size: 12px; font-weight: bold;","font-size: 12px;"),loadResource({tagName:"script",src:"https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox/stable-release/"+getVersion()+"/dg-toolbox-custom-styling.js",rel:"text/javascript"}).onload=function(){applyCustomStyling(e),loadResource({tagName:"script",src:"https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox/stable-release/"+getVersion()+"/dg-toolbox-replace-icons-with-fa-icons.js",rel:"text/javascript"}).onload=function(){replaceIconsWithFAIcons()},loadResource({tagName:"script",src:"https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox/stable-release/"+getVersion()+"/dg-toolbox-replace-icons-with-images.js",rel:"text/javascript"}).onload=function(){replaceIconsWithImages()},loadResource({tagName:"script",src:"https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox/stable-release/"+getVersion()+"/dg-toolbox-replace-planets-images.js",rel:"text/javascript"}).onload=function(){replacePlanetsImages()},loadResource({tagName:"script",src:"https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox/stable-release/"+getVersion()+"/dg-toolbox-replace-structures-images.js",rel:"text/javascript"}).onload=function(){replaceStructuresImages(window.location.origin)},loadResource({tagName:"script",src:"https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox/stable-release/"+getVersion()+"/dg-toolbox-replace-ships-images.js",rel:"text/javascript"}).onload=function(){replaceShipsImages()}}}function loadAngular(){console.log("%cDGT%c - injecting additional components","font-size: 12px; font-weight: bold;","font-size: 12px;");let e=[{tagName:"script",src:"https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox/stable-release/"+getVersion()+"/runtime.js",rel:"module"},{tagName:"script",src:"https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox/stable-release/"+getVersion()+"/polyfills.js",rel:"module"},{tagName:"script",src:"https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox/stable-release/"+getVersion()+"/main.js",rel:"module"}];loadResource(e[0]).onload=function(){console.log("%cDGT%c - setting up runtime","font-size: 12px; font-weight: bold;","font-size: 12px;"),loadResource(e[1]).onload=function(){console.log("%cDGT%c - preparing polyfills","font-size: 12px; font-weight: bold;","font-size: 12px;"),loadResource(e[2]).onload=function(){console.log("%cDGT%c - booting application modules","font-size: 12px; font-weight: bold;","font-size: 12px;")}}}}function loadGlobalAngularStyling(){console.log("%cDarkGalaxy Toolbox - DGT","font-size: 16px; font-weight: bold;");[{tagName:"link",href:"https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox/stable-release/"+getVersion()+"/styles.css",rel:"stylesheet"}].forEach(e=>loadResource(e))}document.addEventListener("DOMContentLoaded",function(e){document.body.style.visibility="hidden";let t=window.location.pathname.split(/\//g);"2.x.x"!==localStorage.getItem("hotfix")&&(localStorage.getItem("post-install-fetch-metadata")||localStorage.clear(),localStorage.setItem("hotfix","2.x.x")),loadGlobalAngularStyling(),loadResource({tagName:"script",src:"https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox/stable-release/"+getVersion()+"/dg-toolbox-utils.js",rel:"text/javascript"}).onload=function(){document.getElementById("playerBox")&&(document.getElementById("playerBox").append(document.createElement("dgt-authentication")),loadSetups(t),loadAngular(),loadCustomStyling(t)),setTimeout(()=>document.body.style.visibility="visible",100)},localStorage.getItem("local-metadata")||localStorage.setItem("local-metadata",'{"ttl":0,"expiry":0,"value":"{\\"dgtVersion\\":\\"'+getVersion()+'\\",\\"allianceMembersTurn\\":{\\"version\\":0,\\"turn\\":0},\\"playersRankingsTurn\\":{\\"version\\":0,\\"turn\\":0},\\"planetsTurn\\":{\\"version\\":0,\\"turn\\":0}}"}'),localStorage.setItem("game-endpoint",'{"ttl":0,"expiry":0,"value":"\\"'+window.location.origin+'\\""}')}),window.unload=function(){document.body.style.visibility="hidden"};
