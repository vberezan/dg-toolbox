function detach(node) {
    return node.parentElement.removeChild(node);
}
function applyCustomStyling() {
    if (document.querySelector('#queue .researchTitle')) {
        document.querySelectorAll('#queue .researchTitle')[document.querySelectorAll('#queue .researchTitle').length - 1].style.height = '120px';
    }

    if (document.querySelector('#addQueue .left.padding:last-child') &&
        document.querySelector('#addQueue .left.padding:last-child').textContent.trim().toLocaleLowerCase().startsWith('you are currently unable to')) {
        document.querySelector('#addQueue .left.padding:last-child').style.width = '455px';
    }

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

    if (document.querySelector('#completed .tableHeader')) {
        document.querySelector('#completed .tableHeader').remove();
        document.querySelectorAll('.queueDestroyButton, .queueRemoveButton, .addQueue').forEach((button) => {
            button.id = button.name + (button.value ? button.value : '');
            let label = document.createElement('label');
            label.htmlFor = button.id;
            label.classList.add('queueDestroyButton');
            if (button.classList.contains('addQueue')) label.classList.add('rotation45');
            if (button.classList.contains('prequeue')) label.classList.add('researchQueue');
            label.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><style>svg{fill:#535353}</style><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>';
            button.parentNode.insertBefore(label, button.nextSibling);
            button.style.display = 'none';
        });
        document.querySelectorAll('.queueDownButton').forEach((button) => {
            button.id = button.name + (button.value ? button.value : '');
            let label = document.createElement('label');
            label.htmlFor = button.id;
            label.classList.add('queueDownButton');
            label.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M256 464a208 208 0 1 1 0-416 208 208 0 1 1 0 416zM256 0a256 256 0 1 0 0 512A256 256 0 1 0 256 0zM376.9 294.6c4.5-4.2 7.1-10.1 7.1-16.3c0-12.3-10-22.3-22.3-22.3H304V160c0-17.7-14.3-32-32-32l-32 0c-17.7 0-32 14.3-32 32v96H150.3C138 256 128 266 128 278.3c0 6.2 2.6 12.1 7.1 16.3l107.1 99.9c3.8 3.5 8.7 5.5 13.8 5.5s10.1-2 13.8-5.5l107.1-99.9z"/></svg>';
            button.parentNode.insertBefore(label, button.nextSibling);
            button.style.display = 'none';
        });
        document.querySelectorAll('.queueUpButton').forEach((button) => {
            button.id = button.name + (button.value ? button.value : '');
            let label = document.createElement('label');
            label.htmlFor = button.id;
            label.classList.add('queueUpButton');
            label.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM135.1 217.4c-4.5 4.2-7.1 10.1-7.1 16.3c0 12.3 10 22.3 22.3 22.3H208v96c0 17.7 14.3 32 32 32h32c17.7 0 32-14.3 32-32V256h57.7c12.3 0 22.3-10 22.3-22.3c0-6.2-2.6-12.1-7.1-16.3L269.8 117.5c-3.8-3.5-8.7-5.5-13.8-5.5s-10.1 2-13.8 5.5L135.1 217.4z"/></svg>';
            button.parentNode.insertBefore(label, button.nextSibling);
            button.style.display = 'none';
        });

        document.querySelectorAll('#completed .upkeepList').forEach((building) => {
            building.querySelector('.width65').remove();
            building.querySelector('.ground:last-child').classList.add('orbit');
            building.querySelector('.ground:last-child').classList.remove('ground');
            building.querySelectorAll('.left').forEach((part) => {
                if (part.textContent.trim().length == 0) part.remove();
                if (part.classList.contains('width25') || part.classList.contains('width50')) {
                    part.classList.remove('width25');
                    part.classList.remove('width50');
                    part.classList.add('width100');
                }
                if (part.classList.contains('metal')) {
                    part.innerHTML = '<img alt="Metal" src="https://i.imgur.com/FPuGoOV.png" width="17" height="17"><span>' + part.innerHTML + '</span>';
                }
                if (part.classList.contains('mineral')) {
                    part.innerHTML = '<img alt="Minteral" src="https://i.imgur.com/OTTk4eY.png" title="Mineral" width="17" height="17"><span>' + part.innerHTML + '</span>';
                }
                if (part.classList.contains('food')) {
                    part.innerHTML = '<img src="https://i.imgur.com/7gmDfoF.png" title="Food" width="17" height="17"><span>' + part.innerHTML + '</span>';
                }
                if (part.classList.contains('energy')) {
                    part.innerHTML = '<img alt="Energy" src="https://i.imgur.com/DEv8NW9.png" width="17" height="17"><span>' + part.innerHTML + '</span>';
                }
                if (part.classList.contains('ground')) {
                    part.innerHTML = '<img src="https://i.imgur.com/HesibsH.png" title="Ground Space" width="17" height="17"><span>' + part.innerHTML + '</span>';
                }
                if (part.classList.contains('orbit')) {
                    part.innerHTML = '<img src="https://i.imgur.com/KKdM7BA.png" title="Orbit Space" width="17" height="17"><span>' + part.innerHTML + '</span>';
                }
            });
        });
    }

    if (document.querySelector('a.right.navigation') || document.querySelector('a.left.navigation')) {
        let righNav = document.querySelector('a.right.navigation');
        let leftNav = document.querySelector('a.left.navigation');

        if (righNav) {
            righNav = detach(righNav);
            document.querySelector('.header.border.pageTitle').append(righNav);
        } else {
            document.querySelector('#navWrapper>div>div:last-child').remove();
        }

        if (leftNav) {
            leftNav = detach(leftNav);
            document.querySelector('.header.border.pageTitle').append(leftNav);
        } else {
            document.querySelector('#navWrapper>div>div:nth-child(1)').remove();
        }
    }

    if (document.querySelector('#buttonBlock')) {
        document.querySelector('#buttonBlock a:first-child span').textContent = 'Structures';
        document.querySelector('#buttonBlock #converter span').textContent = 'Energy Converter';
    }

    if(document.querySelector('#header')) {
        let credits = document.createElement('div');
        credits.id = 'dgt-credits';
        credits.innerHTML = '<span>Theme revamped by DGT</span>';
        document.querySelector('#header').append(credits);
    }

    //// -- changelog
    let windowURL = window.location.pathname.split(/\//g);
    if (windowURL.length === 2 && windowURL[1].trim().length === 0) {
        document.querySelector('#contentBox .rightContent').id = 'home-stats';
        document.querySelector('#contentBox .leftContent').id = 'news-list';

        let changelog = document.createElement('div');
        changelog.id = 'dgt-changelog';

        changelog.innerHTML =
            '<h2>DGT Changelog <span style="font-style: italic; font-size: 13px !important;">v0.0.5.beta</span></h2>' +
            '<div id="dgt-to-implement-features">' +
                '<div><span>Future changes:</span></div>' +
                '<ul>' +
                    '<li>Compress images - speed up loading</li>' +
                    '<li>Stylize <span style="font-style: italic">Fleet</span> page</li>' +
                    '<li>Button to copy planets stats to clipboard</li>' +
                    '<li>Button to copy planet details to clipboard</li>' +
                    '<li>NAP alliances - display NAP planets/fleets/players with yellow</li>' +
                    '<li>Stylize <span style="font-style: italic">Navigation</span> page</li>' +
                    '<li>Stylize <span style="font-style: italic">Alliances</span> page</li>' +
                    '<li>Combined Radars - see if this will align with DG rules</li>' +
                '</ul>' +
            '</div>'
            + '<div id="dgt-implemented-features">' +
                '<div><span>Implemented:</span></div>' +
                '<ul>' +
                    '<li>Stylize <span style="font-style: italic">Home</span> page</li>' +
                    '<li>Stylize <span style="font-style: italic">Planets</span> page</li>' +
                    '<li>Stylize <span style="font-style: italic">Planet/Building</span> page</li>' +
                    '<li>Stylize <span style="font-style: italic">Research</span> page</li>' +
                    '<li>Stylize <span style="font-style: italic">Player Box</span></li>' +
                    '<li>Stylize <span style="font-style: italic">Main Menu</span></li>' +
                    '<li>Replace old icons/images with new ones</li>' +
                    '<li>Display overall planet stats in <span style="font-style: italic">Planets Page</span></li>' +
                    '<li>Cloud Scans - retain the last scan of any planet and display all important info in Navigation screen - this is a private feature that works only with a DGT account</li>' +
                    '<li>Alliance Orders - ability for designated users to send fleet orders to other players - this is a private feature that works only with a DGT account</li>' +
                '</ul>' +
            '</div>';

        let generalInfo = document.createElement('div');
        generalInfo.id = 'general-info';
        generalInfo.prepend(detach(document.querySelector('#contentBox .leftContent>h2').nextElementSibling));
        generalInfo.prepend(detach(document.querySelector('#contentBox .leftContent>h2')));

        let knownIssues = document.createElement('div');
        knownIssues.id = 'known-issues';
        knownIssues.prepend(detach(document.querySelector('#contentBox .leftContent>h2').nextElementSibling));
        knownIssues.prepend(detach(document.querySelector('#contentBox .leftContent>h2')));

        document.querySelector('#contentBox br').remove();
        let welcome = document.createElement('div');
        welcome.id = 'welcome';
        welcome.append(detach(document.querySelector('#contentBox .leftContent>.plainHeader')));
        while (document.querySelector('#contentBox .leftContent>p')) {
            if (document.querySelector('#contentBox .leftContent>p').innerHTML.trim().length > 0) {
                welcome.append(detach(document.querySelector('#contentBox .leftContent>p')));
            } else {
                document.querySelector('#contentBox .leftContent>p').remove();
            }
        }

        document.querySelector('#contentBox .leftContent').prepend(changelog);
        document.querySelector('#contentBox .leftContent').prepend(knownIssues);
        document.querySelector('#contentBox .leftContent').prepend(generalInfo);
        document.querySelector('#contentBox .leftContent').prepend(welcome);
    }
}
