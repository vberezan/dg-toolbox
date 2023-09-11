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

// change default images with cooler ones
function replacePlanetsImages() {
    const images = [
        'https://i.imgur.com/7emDo7u.png', 'https://i.imgur.com/h645Sbz.png', 'https://i.imgur.com/jhDgAcf.png', 'https://i.imgur.com/hPmLTR0.png', 'https://i.imgur.com/sxNM2IU.png',
        'https://i.imgur.com/bBaVWvQ.png', 'https://i.imgur.com/X3AAaY8.png', 'https://i.imgur.com/4pf1Tju.png', 'https://i.imgur.com/IGzscND.png', 'https://i.imgur.com/xMtcWah.png',
        'https://i.imgur.com/DFtD4vX.png', 'https://i.imgur.com/brVnILl.png', 'https://i.imgur.com/TzTNSTy.png', 'https://i.imgur.com/QxAY3M7.png', 'https://i.imgur.com/HOkGrou.png',
        'https://i.imgur.com/ohkn0L3.png', 'https://i.imgur.com/cToV8VJ.png', 'https://i.imgur.com/6t8hPGr.png', 'https://i.imgur.com/7h7NOT4.png', 'https://i.imgur.com/vb0X7Ps.png',
        'https://i.imgur.com/a6X4pJs.png', 'https://i.imgur.com/HnEtjvk.png', 'https://i.imgur.com/SVJscff.png', 'https://i.imgur.com/BWRsjql.png', 'https://i.imgur.com/st8RPjI.png',
        'https://i.imgur.com/z0jUerc.png', 'https://i.imgur.com/x9hcGDC.png', 'https://i.imgur.com/XrQ9CUA.png', 'https://i.imgur.com/QqOjXY9.png', 'https://i.imgur.com/y0X6gqm.png',
        'https://i.imgur.com/AXYzFQH.png', 'https://i.imgur.com/3lA6hpV.png', 'https://i.imgur.com/dnyDoql.png', 'https://i.imgur.com/2tGXfQS.png', 'https://i.imgur.com/3cEusRW.png',
        'https://i.imgur.com/DObtztm.png', 'https://i.imgur.com/XDePZDB.png', 'https://i.imgur.com/ISLm7xG.png', 'https://i.imgur.com/adl759C.png', 'https://i.imgur.com/1BDs4cu.png',
        'https://i.imgur.com/NDpaU0U.png', 'https://i.imgur.com/nOwnoFN.png', 'https://i.imgur.com/lwHfvbV.png', 'https://i.imgur.com/c0N2U9t.png', 'https://i.imgur.com/a5V22XU.png',
        'https://i.imgur.com/HdJHwHM.png', 'https://i.imgur.com/5mqo2Gj.png', 'https://i.imgur.com/t1KAgBM.png', 'https://i.imgur.com/VahvzeQ.png', 'https://i.imgur.com/TEItueF.png',
        'https://i.imgur.com/FBepye3.png'
    ];


    const imgIdPattern = /\/([\d]+)\./;
    const replaceImage = function (img) {
        const [,id] = img.src.match(imgIdPattern);
        img.src = images[id];
    };

    if (location.href.match(/planet\/[0-9]+/)) { // on single planet overview use big image
        Array.from(document.querySelectorAll('#planetImage > img')).forEach((img) => replaceImage(img));
    } else { // small images for anything else (planet list, nav other planets, nav own planets)
        Array.from(document.querySelectorAll('.planetImage img, .planets > img, .planets > a > img')).forEach((img) => replaceImage(img, 'icon'));
    }
}

////

function replaceImgWithFontAwsome(imgSrc, fontAwsomeHTML) {
    document.querySelectorAll('img[src="' + imgSrc + '"').forEach((img) => {
        img.parentElement.innerHTML = fontAwsomeHTML;
    });
}

function replaceIcons() {
    replaceImgWithFontAwsome(
        '/images/icons/news_small.png',
        '<fa-icon class="ng-fa-icon" style="color: rgb(223, 74, 74);"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#ffffff}</style><path d="M96 96c0-35.3 28.7-64 64-64H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H80c-44.2 0-80-35.8-80-80V128c0-17.7 14.3-32 32-32s32 14.3 32 32V400c0 8.8 7.2 16 16 16s16-7.2 16-16V96zm64 24v80c0 13.3 10.7 24 24 24H296c13.3 0 24-10.7 24-24V120c0-13.3-10.7-24-24-24H184c-13.3 0-24 10.7-24 24zm208-8c0 8.8 7.2 16 16 16h48c8.8 0 16-7.2 16-16s-7.2-16-16-16H384c-8.8 0-16 7.2-16 16zm0 96c0 8.8 7.2 16 16 16h48c8.8 0 16-7.2 16-16s-7.2-16-16-16H384c-8.8 0-16 7.2-16 16zM160 304c0 8.8 7.2 16 16 16H432c8.8 0 16-7.2 16-16s-7.2-16-16-16H176c-8.8 0-16 7.2-16 16zm0 96c0 8.8 7.2 16 16 16H432c8.8 0 16-7.2 16-16s-7.2-16-16-16H176c-8.8 0-16 7.2-16 16z"/></svg></fa-icon>'
    );

    replaceImgWithFontAwsome(
        '/images/units/small/soldier.png',
        '<fa-icon class="ng-fa-icon" style="color: rgb(223, 74, 74);"><svg role="img" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="person-rifle" class="svg-inline--fa fa-person-rifle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M265.2 192c25.4 0 49.8 7.1 70.8 19.9V512H144V337.7L90.4 428.3c-11.2 19-35.8 25.3-54.8 14.1s-25.3-35.8-14.1-54.8L97.7 258.8c24.5-41.4 69-66.8 117.1-66.8h50.4zM160 80a80 80 0 1 1 160 0A80 80 0 1 1 160 80zM448 0c8.8 0 16 7.2 16 16V132.3c9.6 5.5 16 15.9 16 27.7V269.3l16-5.3V208c0-8.8 7.2-16 16-16h16c8.8 0 16 7.2 16 16v84.5c0 6.9-4.4 13-10.9 15.2L480 325.3V352h48c8.8 0 16 7.2 16 16v16c0 8.8-7.2 16-16 16H484l23 92.1c2.5 10.1-5.1 19.9-15.5 19.9H432c-8.8 0-16-7.2-16-16V400H400c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32V160c0-11.8 6.4-22.2 16-27.7V32c-8.8 0-16-7.2-16-16s7.2-16 16-16h16 16z"></path></svg></fa-icon>'
    );

    replaceImgWithFontAwsome(
        '/images/units/small/worker.png',
        '<fa-icon class="ng-fa-icon" style="color: rgb(255, 220, 45);"><svg role="img" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="person-digging" class="svg-inline--fa fa-person-digging" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M208 64a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM9.8 214.8c5.1-12.2 19.1-18 31.4-12.9L60.7 210l22.9-38.1C99.9 144.6 129.3 128 161 128c51.4 0 97 32.9 113.3 81.7l34.6 103.7 79.3 33.1 34.2-45.6c6.4-8.5 16.6-13.3 27.2-12.8s20.3 6.4 25.8 15.5l96 160c5.9 9.9 6.1 22.2 .4 32.2s-16.3 16.2-27.8 16.2H288c-11.1 0-21.4-5.7-27.2-15.2s-6.4-21.2-1.4-31.1l16-32c5.4-10.8 16.5-17.7 28.6-17.7h32l22.5-30L22.8 246.2c-12.2-5.1-18-19.1-12.9-31.4zm82.8 91.8l112 48c11.8 5 19.4 16.6 19.4 29.4v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V405.1l-60.6-26-37 111c-5.6 16.8-23.7 25.8-40.5 20.2S-3.9 486.6 1.6 469.9l48-144 11-33 32 13.7z"></path></svg></fa-icon>'
    );

    replaceImgWithFontAwsome(
        '/images/units/small/food.gif',
        '<fa-icon class="ng-fa-icon" style="color: rgb(123, 189, 26);"><svg role="img" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="carrot" class="svg-inline--fa fa-carrot" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M346.7 6C337.6 17 320 42.3 320 72c0 40 15.3 55.3 40 80s40 40 80 40c29.7 0 55-17.6 66-26.7c4-3.3 6-8.2 6-13.3s-2-10-6-13.2c-11.4-9.1-38.3-26.8-74-26.8c-32 0-40 8-40 8s8-8 8-40c0-35.7-17.7-62.6-26.8-74C370 2 365.1 0 360 0s-10 2-13.3 6zM244.6 136c-40 0-77.1 18.1-101.7 48.2l60.5 60.5c6.2 6.2 6.2 16.4 0 22.6s-16.4 6.2-22.6 0l-55.3-55.3 0 .1L2.2 477.9C-2 487-.1 497.8 7 505s17.9 9 27.1 4.8l134.7-62.4-52.1-52.1c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0L199.7 433l100.2-46.4c46.4-21.5 76.2-68 76.2-119.2C376 194.8 317.2 136 244.6 136z"></path></svg></fa-icon>'
    );

    replaceImgWithFontAwsome(
        '/images/units/small/mineral.gif',
        '<fa-icon class="ng-fa-icon" style="color: rgb(255, 132, 132);"><svg role="img" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="cubes-stacked" class="svg-inline--fa fa-cubes-stacked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M192 64v64c0 17.7 14.3 32 32 32h64c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32H224c-17.7 0-32 14.3-32 32zM82.7 207c-15.3 8.8-20.5 28.4-11.7 43.7l32 55.4c8.8 15.3 28.4 20.5 43.7 11.7l55.4-32c15.3-8.8 20.5-28.4 11.7-43.7l-32-55.4c-8.8-15.3-28.4-20.5-43.7-11.7L82.7 207zM288 192c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32h64c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32H288zm64 160c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32h64c17.7 0 32-14.3 32-32V384c0-17.7-14.3-32-32-32H352zM160 384v64c0 17.7 14.3 32 32 32h64c17.7 0 32-14.3 32-32V384c0-17.7-14.3-32-32-32H192c-17.7 0-32 14.3-32 32zM32 352c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32H96c17.7 0 32-14.3 32-32V384c0-17.7-14.3-32-32-32H32z"></path></svg></fa-icon>'
    );

    replaceImgWithFontAwsome(
        '/images/units/small/metal.gif',
        '<fa-icon class="ng-fa-icon" style="color: rgb(204, 204, 204);"><svg role="img" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="coins" class="svg-inline--fa fa-coins" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M512 80c0 18-14.3 34.6-38.4 48c-29.1 16.1-72.5 27.5-122.3 30.9c-3.7-1.8-7.4-3.5-11.3-5C300.6 137.4 248.2 128 192 128c-8.3 0-16.4 .2-24.5 .6l-1.1-.6C142.3 114.6 128 98 128 80c0-44.2 86-80 192-80S512 35.8 512 80zM160.7 161.1c10.2-.7 20.7-1.1 31.3-1.1c62.2 0 117.4 12.3 152.5 31.4C369.3 204.9 384 221.7 384 240c0 4-.7 7.9-2.1 11.7c-4.6 13.2-17 25.3-35 35.5c0 0 0 0 0 0c-.1 .1-.3 .1-.4 .2l0 0 0 0c-.3 .2-.6 .3-.9 .5c-35 19.4-90.8 32-153.6 32c-59.6 0-112.9-11.3-148.2-29.1c-1.9-.9-3.7-1.9-5.5-2.9C14.3 274.6 0 258 0 240c0-34.8 53.4-64.5 128-75.4c10.5-1.5 21.4-2.7 32.7-3.5zM416 240c0-21.9-10.6-39.9-24.1-53.4c28.3-4.4 54.2-11.4 76.2-20.5c16.3-6.8 31.5-15.2 43.9-25.5V176c0 19.3-16.5 37.1-43.8 50.9c-14.6 7.4-32.4 13.7-52.4 18.5c.1-1.8 .2-3.5 .2-5.3zm-32 96c0 18-14.3 34.6-38.4 48c-1.8 1-3.6 1.9-5.5 2.9C304.9 404.7 251.6 416 192 416c-62.8 0-118.6-12.6-153.6-32C14.3 370.6 0 354 0 336V300.6c12.5 10.3 27.6 18.7 43.9 25.5C83.4 342.6 135.8 352 192 352s108.6-9.4 148.1-25.9c7.8-3.2 15.3-6.9 22.4-10.9c6.1-3.4 11.8-7.2 17.2-11.2c1.5-1.1 2.9-2.3 4.3-3.4V304v5.7V336zm32 0V304 278.1c19-4.2 36.5-9.5 52.1-16c16.3-6.8 31.5-15.2 43.9-25.5V272c0 10.5-5 21-14.9 30.9c-16.3 16.3-45 29.7-81.3 38.4c.1-1.7 .2-3.5 .2-5.3zM192 448c56.2 0 108.6-9.4 148.1-25.9c16.3-6.8 31.5-15.2 43.9-25.5V432c0 44.2-86 80-192 80S0 476.2 0 432V396.6c12.5 10.3 27.6 18.7 43.9 25.5C83.4 438.6 135.8 448 192 448z"></path></svg></fa-icon>'
    );

    replaceImgWithFontAwsome(
        '/images/units/small/energy.gif',
        '<fa-icon class="ng-fa-icon" style="color: rgb(12, 161, 225);"><svg role="img" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bolt" class="svg-inline--fa fa-bolt" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M349.4 44.6c5.9-13.7 1.5-29.7-10.6-38.5s-28.6-8-39.9 1.8l-256 224c-10 8.8-13.6 22.9-8.9 35.3S50.7 288 64 288H175.5L98.6 467.4c-5.9 13.7-1.5 29.7 10.6 38.5s28.6 8 39.9-1.8l256-224c10-8.8 13.6-22.9 8.9-35.3s-16.6-20.7-30-20.7H272.5L349.4 44.6z"></path></svg></fa-icon>'
    );

    replaceImgWithFontAwsome(
        '/images/units/small/ground.gif',
        '<fa-icon class="ng-fa-icon" style="color: rgb(255, 255, 255);"><svg role="img" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="tree-city" class="svg-inline--fa fa-tree-city" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M288 48c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48V192h40V120c0-13.3 10.7-24 24-24s24 10.7 24 24v72h24c26.5 0 48 21.5 48 48V464c0 26.5-21.5 48-48 48H432 336c-26.5 0-48-21.5-48-48V48zm64 32v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V80c0-8.8-7.2-16-16-16H368c-8.8 0-16 7.2-16 16zm16 80c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V176c0-8.8-7.2-16-16-16H368zM352 272v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H368c-8.8 0-16 7.2-16 16zm176-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H528zM512 368v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V368c0-8.8-7.2-16-16-16H528c-8.8 0-16 7.2-16 16zM224 160c0 6-1 11-2 16c20 14 34 38 34 64c0 45-36 80-80 80H160V480c0 18-15 32-32 32c-18 0-32-14-32-32V320H80c-45 0-80-35-80-80c0-26 13-50 33-64c-1-5-1-10-1-16c0-53 42-96 96-96c53 0 96 43 96 96z"></path></svg></fa-icon>'
    );

    replaceImgWithFontAwsome(
        '/images/units/small/orbit.gif',
        '<fa-icon class="ng-fa-icon" style="color: rgb(255, 255, 255);"><svg role="img" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="satellite" class="svg-inline--fa fa-satellite" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M233 7c-9.4-9.4-24.6-9.4-33.9 0l-96 96c-9.4 9.4-9.4 24.6 0 33.9l89.4 89.4-15.5 15.5C152.3 230.4 124.9 224 96 224c-31.7 0-61.5 7.7-87.8 21.2c-9 4.7-10.3 16.7-3.1 23.8L112.7 376.7 96.3 393.1c-2.6-.7-5.4-1.1-8.3-1.1c-17.7 0-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32c0-2.9-.4-5.6-1.1-8.3l16.4-16.4L242.9 506.9c7.2 7.2 19.2 5.9 23.8-3.1C280.3 477.5 288 447.7 288 416c0-28.9-6.4-56.3-17.8-80.9l15.5-15.5L375 409c9.4 9.4 24.6 9.4 33.9 0l96-96c9.4-9.4 9.4-24.6 0-33.9l-89.4-89.4 55-55c12.5-12.5 12.5-32.8 0-45.3l-48-48c-12.5-12.5-32.8-12.5-45.3 0l-55 55L233 7zm159 351l-72.4-72.4 62.1-62.1L454.1 296 392 358.1zM226.3 192.4L153.9 120 216 57.9l72.4 72.4-62.1 62.1z"></path></svg></fa-icon>'
    );

    replaceImgWithFontAwsome(
        '/images/units/small/coords.gif',
        '<fa-icon class="ng-fa-icon" style="color: rgb(238, 238, 238);"><svg role="img" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chess-board" class="svg-inline--fa fa-chess-board" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm64 64v64h64V96h64v64h64V96h64v64H320v64h64v64H320v64h64v64H320V352H256v64H192V352H128v64H64V352h64V288H64V224h64V160H64V96h64zm64 128h64V160H192v64zm0 64V224H128v64h64zm64 0H192v64h64V288zm0 0h64V224H256v64z"></path></svg></fa-icon>'
    );
}

function applyCustomStyling() {
    document.querySelectorAll('#planetList > #planetList').forEach((planet) => {
        planet.querySelector('.planetImage img').setAttribute('width', 75);
        planet.querySelector('.planetImage img').setAttribute('height', 75);

        if (planet.querySelectorAll('.planetHeadSection').length > 3) {
            planet.querySelector('.planetImage').classList.add('dgt-no-bottom-radius');
        }

    });

    document.querySelectorAll('.resource span').forEach((resource) => {
        resource.innerHTML = resource.innerHTML.replace(/\(/g, '[').replace(/\)/g, ']');
    });

    if (document.querySelector('#fleetHeader')) {
        document.querySelector('#fleetHeader').parentElement.querySelector('div.opacDarkBackground.left:nth-child(2)').style.marginRight = '3px';
    }
}

///////////
function setUpNgZone() {
    let style = document.createElement('link');
    style.href = 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox@development/angular/toolbox-app/dist/toolbox-app/styles.af811e7d5e605117.css';
    style.rel = 'stylesheet';
    document.head.appendChild(style);

    let runtime = document.createElement('script');
    runtime.src = 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox@development/angular/toolbox-app/dist/toolbox-app/runtime.79543c56c927dd9a.js';
    runtime.type = 'module';
    document.head.appendChild(runtime);

    let polyfills = document.createElement('script');
    polyfills.src = 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox@development/angular/toolbox-app/dist/toolbox-app/polyfills.fccd34e7614ee531.js';
    polyfills.type = 'module';
    document.head.appendChild(polyfills);

    let main = document.createElement('script');
    main.src = 'https://cdn.jsdelivr.net/gh/vberezan/dg-toolbox@development/angular/toolbox-app/dist/toolbox-app/main.8d3478965328ef48.js';
    main.type = 'module';
    document.head.appendChild(main);
}


function setUpNavbarReplacement() {
    if (document.getElementById('content')) {
        document.getElementById('content').prepend(document.createElement('dgt-navbar'));
        document.getElementById('tabpanel').remove();
    }
}

function setUpPlanetListStatsPanel() {
    if (document.getElementById('planetList')) {
        document.getElementById('planetList').prepend(document.createElement('dgt-planet-list-stats-panel'));
    }
}

function setUpSharedScansCollector(windowURL) {
    if(windowURL[1] === 'planet' && (windowURL.length === 5 && windowURL[3]) === 'comms') {
        document.querySelector('.opacDarkBackground form').parentElement.append(document.createElement('dgt-shared-scans-collector'));
    }
}

function setUpNavigationScanDataPanel(windowURL) {
    document.querySelectorAll('div.navigation .row .planets').forEach((planet) => {

        // -- resources
        let resources = ['metal', 'mineral', 'food', 'energy'];
        let surfaceTable = document.createElement('table');
        let surfaceTbody = document.createElement('tbody');
        surfaceTable.classList.add('dgt-navigation-scan');
        surfaceTable.append(surfaceTbody);

        let turnRow = document.createElement('tr');
        turnRow.classList.add('dgt-navigation-scan-turn');
        let turnLabel = document.createElement('td');
        turnLabel.textContent = 'Turn:'
        turnLabel.classList.add('dgt-navigation-scan-turn-label');
        let turnValue = document.createElement('td');
        turnValue.classList.add('dgt-navigation-scan-turn-value');

        turnRow.append(turnLabel);
        turnRow.append(turnValue);
        surfaceTbody.append(turnRow);

        resources.forEach((resource) => {
            let row = document.createElement('tr');
            let abundance = document.createElement('td');
            let production = document.createElement('td');

            row.classList.add('dgt-navigation-scan-resource', resource);
            abundance.classList.add('abundance');
            production.classList.add('production');

            row.append(abundance, production);

            surfaceTbody.append(row);
        });

        let surfaceMetalColumn = document.createElement('td')
        surfaceMetalColumn.classList.add('dgt-navigation-scan-resource', 'metal');
        let surfaceMineralColumn = document.createElement('td')
        surfaceMineralColumn.classList.add('dgt-navigation-scan-resource', 'mineral');
        let surfaceFoodColumn = document.createElement('td')
        surfaceFoodColumn.classList.add('dgt-navigation-scan-resource', 'food');
        let surfaceEnergyColumn = document.createElement('td')
        surfaceEnergyColumn.classList.add('dgt-navigation-scan-resource', 'energy');

        planet.insertBefore(surfaceTable, planet.querySelector('div.text'));

        // -- remove useless empty lines
        planet.querySelectorAll('br').forEach((br) => {
            br.remove();
        })

        //-- population
        let populationTable = document.createElement('table');
        populationTable.classList.add('dgt-navigation-scan-population');
        let populationTbody = document.createElement('tbody');
        let populationRow = document.createElement('tr');
        populationRow.classList.add('dgt-navigation-scan-population-data');

        let workersIcon = document.createElement('td');
        workersIcon.classList.add('dgt-navigation-scan-workers-icon');
        workersIcon.innerHTML = '<fa-icon class="ng-fa-icon" style="color: rgb(255, 220, 45);"><svg role="img" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="person-digging" class="svg-inline--fa fa-person-digging" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M208 64a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM9.8 214.8c5.1-12.2 19.1-18 31.4-12.9L60.7 210l22.9-38.1C99.9 144.6 129.3 128 161 128c51.4 0 97 32.9 113.3 81.7l34.6 103.7 79.3 33.1 34.2-45.6c6.4-8.5 16.6-13.3 27.2-12.8s20.3 6.4 25.8 15.5l96 160c5.9 9.9 6.1 22.2 .4 32.2s-16.3 16.2-27.8 16.2H288c-11.1 0-21.4-5.7-27.2-15.2s-6.4-21.2-1.4-31.1l16-32c5.4-10.8 16.5-17.7 28.6-17.7h32l22.5-30L22.8 246.2c-12.2-5.1-18-19.1-12.9-31.4zm82.8 91.8l112 48c11.8 5 19.4 16.6 19.4 29.4v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V405.1l-60.6-26-37 111c-5.6 16.8-23.7 25.8-40.5 20.2S-3.9 486.6 1.6 469.9l48-144 11-33 32 13.7z"></path></svg></fa-icon>';
        let workersValue = document.createElement('td');
        workersValue.classList.add('dgt-navigation-scan-workers-value');

        let soldiersIcon = document.createElement('td');
        soldiersIcon.classList.add('dgt-navigation-scan-soldiers-icon');
        soldiersIcon.innerHTML = '<fa-icon class="ng-fa-icon" style="color: rgb(223, 74, 74);"><svg role="img" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="person-rifle" class="svg-inline--fa fa-person-rifle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M265.2 192c25.4 0 49.8 7.1 70.8 19.9V512H144V337.7L90.4 428.3c-11.2 19-35.8 25.3-54.8 14.1s-25.3-35.8-14.1-54.8L97.7 258.8c24.5-41.4 69-66.8 117.1-66.8h50.4zM160 80a80 80 0 1 1 160 0A80 80 0 1 1 160 80zM448 0c8.8 0 16 7.2 16 16V132.3c9.6 5.5 16 15.9 16 27.7V269.3l16-5.3V208c0-8.8 7.2-16 16-16h16c8.8 0 16 7.2 16 16v84.5c0 6.9-4.4 13-10.9 15.2L480 325.3V352h48c8.8 0 16 7.2 16 16v16c0 8.8-7.2 16-16 16H484l23 92.1c2.5 10.1-5.1 19.9-15.5 19.9H432c-8.8 0-16-7.2-16-16V400H400c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32V160c0-11.8 6.4-22.2 16-27.7V32c-8.8 0-16-7.2-16-16s7.2-16 16-16h16 16z"></path></svg></fa-icon>';
        let soldiersValue = document.createElement('td');
        soldiersValue.classList.add('dgt-navigation-scan-soldiers-value');


        populationRow.append(workersIcon, workersValue, soldiersIcon, soldiersValue);
        populationTbody.append(populationRow);
        populationTable.append(populationTbody);
        planet.append(populationTable);
        populationTable.style.display = 'none';

        let invasionDiv = document.createElement('div');
        invasionDiv.classList.add('dgt-navigation-scan-invasion-data');
        invasionDiv.innerHTML = '<span class="dgt-navigation-scan-invasion-label">Required: </span><fa-icon class="ng-fa-icon" style="color: rgb(223, 74, 74);"><svg role="img" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="person-rifle" class="svg-inline--fa fa-person-rifle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M265.2 192c25.4 0 49.8 7.1 70.8 19.9V512H144V337.7L90.4 428.3c-11.2 19-35.8 25.3-54.8 14.1s-25.3-35.8-14.1-54.8L97.7 258.8c24.5-41.4 69-66.8 117.1-66.8h50.4zM160 80a80 80 0 1 1 160 0A80 80 0 1 1 160 80zM448 0c8.8 0 16 7.2 16 16V132.3c9.6 5.5 16 15.9 16 27.7V269.3l16-5.3V208c0-8.8 7.2-16 16-16h16c8.8 0 16 7.2 16 16v84.5c0 6.9-4.4 13-10.9 15.2L480 325.3V352h48c8.8 0 16 7.2 16 16v16c0 8.8-7.2 16-16 16H484l23 92.1c2.5 10.1-5.1 19.9-15.5 19.9H432c-8.8 0-16-7.2-16-16V400H400c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32V160c0-11.8 6.4-22.2 16-27.7V32c-8.8 0-16-7.2-16-16s7.2-16 16-16h16 16z"></path></svg></fa-icon>';
        let invasionValueSpan = document.createElement('span');
        invasionValueSpan.classList.add('dgt-navigation-scan-invasion-value');
        invasionDiv.append(invasionValueSpan);

        planet.append(invasionDiv);
        invasionDiv.style.display = 'none';
    });

    if (windowURL[1] === 'navigation' && (windowURL.length === 6 && !isNaN(+windowURL[2]) && !isNaN(+windowURL[3]) && !isNaN(+windowURL[4]))) {
        document.querySelector('div.navigation').append(document.createElement('dgt-navigation-scan-data-panel'));
    }
}

(function() {
    document.addEventListener("DOMContentLoaded", function(event) {
        document.body.style.visibility = 'hidden';
        let windowURL = window.location.pathname.split(/\//g);

        console.log("%cDarkGalaxy Toolbox - DGT", "font-size: 16px; font-weight: bold;");

        // -- angular modules
        setUpNavbarReplacement();
        setUpPlanetListStatsPanel();
        setUpSharedScansCollector(windowURL);
        setUpNavigationScanDataPanel(windowURL);
        setUpNgZone();

        // -- vanilla stuff
        applyCustomStyling();
        console.log("%cDGT%c - installed custom styles...", "font-size: 12px; font-weight: bold;", "font-size: 12px;");

        replaceIcons();
        console.log("%cDGT%c - installed FontAwsome icons...", "font-size: 12px; font-weight: bold;", "font-size: 12px;");

        replacePlanetsImages();
        console.log("%cDGT%c - installed planets images...", "font-size: 12px; font-weight: bold;", "font-size: 12px;");
    });
})();
