function detach(node) {
    if (node != null) {
        return node.parentElement.removeChild(node);
    }

    return null;
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

            if (righNav != null) {
                document.querySelector('.header.border.pageTitle').append(righNav);
            }
        } else {
            document.querySelector('#navWrapper>div>div:last-child').remove();
        }

        if (leftNav) {
            leftNav = detach(leftNav);

            if (leftNav != null) {
                document.querySelector('.header.border.pageTitle').append(leftNav);
            }
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
        credits.innerHTML = '<span>DarkGalaxy Tools <i>' + localStorage.getItem('version') + '</i></span>';
        document.querySelector('#header .left').append(credits);
    }

    //// -- changelog
    let windowURL = window.location.pathname.split(/\//g);
    if (windowURL.length === 2 && windowURL[1].trim().length === 0) {
        let generalInfo = document.createElement('div');
        generalInfo.id = 'general-info';

        let infoPart = detach(document.querySelector('#contentBox .leftContent>h2').nextElementSibling);
        if (infoPart != null) {
            generalInfo.prepend(infoPart);
        }

        infoPart = detach(document.querySelector('#contentBox .leftContent>h2'));
        if (infoPart != null) {
            generalInfo.prepend(infoPart);
        }

        let knownIssues = document.createElement('div');
        knownIssues.id = 'known-issues';

        let issuesPart = detach(document.querySelector('#contentBox .leftContent>h2').nextElementSibling);
        if (issuesPart != null) {
            knownIssues.prepend(issuesPart);
        }

        issuesPart = detach(document.querySelector('#contentBox .leftContent>h2'));
        if (issuesPart != null) {
            knownIssues.prepend(issuesPart);
        }

        document.querySelector('#contentBox br').remove();
        let welcome = document.createElement('div');
        welcome.id = 'welcome';

        let welcomePart = detach(document.querySelector('#contentBox .leftContent>.plainHeader'));
        if (welcomePart != null) {
            welcome.append(welcomePart);
        }

        while (document.querySelector('#contentBox .leftContent>p')) {
            if (document.querySelector('#contentBox .leftContent>p').innerHTML.trim().length > 0) {
                let part = detach(document.querySelector('#contentBox .leftContent>p'));

                if (part != null) {
                    welcome.append(part);
                }
            } else {
                document.querySelector('#contentBox .leftContent>p').remove();
            }
        }

        document.querySelector('#contentBox .leftContent').prepend(knownIssues);
        document.querySelector('#contentBox .leftContent').prepend(generalInfo);
        document.querySelector('#contentBox .leftContent').prepend(welcome);

        let changelog = detach(document.querySelector('dgt-changelog'));
        if (changelog != null) {
            document.querySelector('#contentBox .leftContent').prepend(changelog);
        }
    }

    // -- scan
    if (windowURL[1] === 'planet' && (windowURL.length === 5 && windowURL[3]) === 'comms') {
        let scanForm = document.querySelector('.opacBackground .opacDarkBackground>form');

        if (scanForm) {
            let newButton = document.createElement('button');
            newButton.type = 'submit';
            newButton.innerHTML = '<fa-icon _ngcontent-ng-c2638986096="" class="ng-fa-icon"><svg role="img" aria-hidden="true" focusable="false" data-prefix="far" data-icon="circle-right" class="svg-inline--fa fa-circle-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM294.6 135.1c-4.2-4.5-10.1-7.1-16.3-7.1C266 128 256 138 256 150.3V208H160c-17.7 0-32 14.3-32 32v32c0 17.7 14.3 32 32 32h96v57.7c0 12.3 10 22.3 22.3 22.3c6.2 0 12.1-2.6 16.3-7.1l99.9-107.1c3.5-3.8 5.5-8.7 5.5-13.8s-2-10.1-5.5-13.8L294.6 135.1z"></path></svg></fa-icon>';
            scanForm.querySelector('input[type="submit"]').parentElement.append(newButton);
            scanForm.querySelector('input[type="submit"]').remove();

            let submit = detach(scanForm.querySelector('.coordsInput>div:nth-child(3)'));
            let label = detach(scanForm.querySelector('.coordsInput>div:nth-child(1)'));
            scanForm.querySelector('.coordsInput').prepend(submit);
            scanForm.querySelector('.coordsInput').append(label);

            scanForm.querySelector('.coordsInput .coords .left:last-child').remove();

            scanForm.querySelector('.coordsInput>div:nth-child(2)').innerHTML =
                scanForm.querySelector('.coordsInput>div:nth-child(2) input:nth-child(1)').outerHTML +
                ':' +
                scanForm.querySelector('.coordsInput>div:nth-child(2) input:nth-child(2)').outerHTML +
                ':' +
                scanForm.querySelector('.coordsInput>div:nth-child(2) input:nth-child(3)').outerHTML +
                ':' +
                scanForm.querySelector('.coordsInput>div:nth-child(2) input:nth-child(4)').outerHTML;
        }
    }

    if (windowURL[1] === 'rankings' && (windowURL.length >= 4 && windowURL[2]) === 'players') {
        document.querySelectorAll('span.allied').forEach((allied=> {
            allied.parentElement.parentElement.classList.add('allied-bg','rank-row');
        }));

        document.querySelectorAll('span.hostile').forEach((hostile=> {
            hostile.parentElement.parentElement.classList.add('hostile-bg','rank-row');
            if (hostile.innerText.trim().length === 0) {
                hostile.innerTex = '-';
            }
        }));

        document.querySelectorAll('span.friendly').forEach((friendly=> {
            friendly.parentElement.parentElement.classList.add('friendly-bg','rank-row');
            friendly.parentElement.parentElement.parentElement.classList.add('friendly-bg','playerRankingsList');
        }));
    }
}
