function detach(node) {
  if (node != null) {
    return node.parentElement.removeChild(node);
  }

  return null;
}

function applyCustomStyling(windowURL) {
  if (document.getElementById('home-stats')) {
    document.querySelector('#home-stats>div:nth-child(2)>div>div:nth-child(2)').remove();
    document.querySelector('#home-stats>div:nth-child(2)>div>div:nth-child(2)').remove();
  }

  if (document.querySelector('#queue .researchTitle')) {
    document.querySelectorAll('#queue .researchTitle')[document.querySelectorAll('#queue .researchTitle').length - 1].style.height = '120px';
  }

  if (document.querySelector('#addQueue .left.padding:last-child') &&
    document.querySelector('#addQueue .left.padding:last-child').textContent.trim().toLocaleLowerCase().startsWith('you are currently unable to')) {
    document.querySelector('#addQueue .left.padding:last-child').style.width = '455px';
  }

  if (windowURL[1] === 'planets') {
    document.querySelectorAll('#planetList > #planetList').forEach((planet) => {
      planet.querySelector('.planetImage img').setAttribute('width', 75);
      planet.querySelector('.planetImage img').setAttribute('height', 75);

      let coords = planet.querySelector('.nameRow .coords span').textContent.trim();
      planet.querySelector('.nameRow .coords').style.display = 'none';
      let newCoords = document.createElement('span');
      newCoords.innerHTML = coords;
      newCoords.classList.add('dgt-planet-new-coords');

      planet.querySelector('.planetImage a').prepend(newCoords);

      if (planet.querySelectorAll('.planetHeadSection').length > 3) {
        planet.querySelector('.planetImage').classList.add('dgt-no-bottom-radius');
      }
    });

    document.querySelectorAll('.resource span, em.neutral').forEach((resource) => {
      resource.innerHTML = resource.innerHTML.replace(/\(/g, '[').replace(/\)/g, ']');
    });

    document.querySelectorAll('#planetList > #planetList .planetHeadSection:nth-child(4) .right').forEach((news) => {
      let coords = news.parentElement.parentElement.parentElement.querySelector('.coords span').textContent.trim().split(/\./);

      let linkToNavigation = document.createElement('div');
      linkToNavigation.classList.add('dgt-link-to-navigation', 'right', 'resource');

      if (coords[0] !== '0') {
        linkToNavigation.innerHTML = '<a target="_blank" title="Navigation" href="/navigation/' + coords[0] + '/' + coords[1] + '/' + coords[2] + '/' + '"><img src="https://i.imgur.com/HcC4l22.png" width="16" height="16"></a>';
        news.parentElement.append(linkToNavigation);
      }
    });
  }

  if (document.querySelector('#fleetHeader')) {
    document.querySelector('#fleetHeader').parentElement.querySelector('div.opacDarkBackground.left:nth-child(2)').style.marginRight = '3px';
  }

  if (document.querySelector('#fleetQueue form .queueButtons')) {
    document.querySelectorAll('#fleetQueue form .queueButtons .queueRemoveButton').forEach((button) => {
      button.id = button.name + (button.value ? button.value : '');
      let label = document.createElement('label');
      label.htmlFor = button.id;
      label.classList.add('queueDestroyButton');
      label.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><style>svg{fill:#535353}</style><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>';
      button.parentNode.insertBefore(label, button.nextSibling);
      button.style.display = 'none';
    });
    document.querySelectorAll('#fleetQueue form .queueButtons .queueDownButton').forEach((button) => {
      button.id = button.name + (button.value ? button.value : '');
      let label = document.createElement('label');
      label.htmlFor = button.id;
      label.classList.add('queueDownButton');
      label.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M256 464a208 208 0 1 1 0-416 208 208 0 1 1 0 416zM256 0a256 256 0 1 0 0 512A256 256 0 1 0 256 0zM376.9 294.6c4.5-4.2 7.1-10.1 7.1-16.3c0-12.3-10-22.3-22.3-22.3H304V160c0-17.7-14.3-32-32-32l-32 0c-17.7 0-32 14.3-32 32v96H150.3C138 256 128 266 128 278.3c0 6.2 2.6 12.1 7.1 16.3l107.1 99.9c3.8 3.5 8.7 5.5 13.8 5.5s10.1-2 13.8-5.5l107.1-99.9z"/></svg>';
      button.parentNode.insertBefore(label, button.nextSibling);
      button.style.display = 'none';
    });
    document.querySelectorAll('#fleetQueue form .queueButtons .queueUpButton').forEach((button) => {
      button.id = button.name + (button.value ? button.value : '');
      let label = document.createElement('label');
      label.htmlFor = button.id;
      label.classList.add('queueUpButton');
      label.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM135.1 217.4c-4.5 4.2-7.1 10.1-7.1 16.3c0 12.3 10 22.3 22.3 22.3H208v96c0 17.7 14.3 32 32 32h32c17.7 0 32-14.3 32-32V256h57.7c12.3 0 22.3-10 22.3-22.3c0-6.2-2.6-12.1-7.1-16.3L269.8 117.5c-3.8-3.5-8.7-5.5-13.8-5.5s-10.1 2-13.8 5.5L135.1 217.4z"/></svg>';
      button.parentNode.insertBefore(label, button.nextSibling);
      button.style.display = 'none';
    });
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
        if (part.textContent.trim().length === 0) part.remove();
        if (part.classList.contains('width25') || part.classList.contains('width50')) {
          part.classList.remove('width25');
          part.classList.remove('width50');
          part.classList.add('width100');
        }
        if (part.classList.contains('metal')) {
          part.innerHTML = '<img alt="Metal" src="https://i.imgur.com/V9Yv4MJ.jpg" width="17" height="17"><span>' + part.innerHTML + '</span>';
        }
        if (part.classList.contains('mineral')) {
          part.innerHTML = '<img alt="Minteral" src="https://i.imgur.com/OdLTSDl.jpg" title="Mineral" width="17" height="17"><span>' + part.innerHTML + '</span>';
        }
        if (part.classList.contains('food')) {
          part.innerHTML = '<img src="https://i.imgur.com/bhfaalb.jpg" title="Food" width="17" height="17"><span>' + part.innerHTML + '</span>';
        }
        if (part.classList.contains('energy')) {
          part.innerHTML = '<img alt="Energy" src="https://i.imgur.com/IkkDId3.jpg" width="17" height="17"><span>' + part.innerHTML + '</span>';
        }
        if (part.classList.contains('ground')) {
          part.innerHTML = '<img src="https://i.imgur.com/cSsBIwv.jpg" title="Ground Space" width="17" height="17"><span>' + part.innerHTML + '</span>';
        }
        if (part.classList.contains('orbit')) {
          part.innerHTML = '<img src="https://i.imgur.com/7wtJcXw.jpg" title="Orbit Space" width="17" height="17"><span>' + part.innerHTML + '</span>';
        }
      });
    });
  }

  if (document.querySelector('a.right.navigation') || document.querySelector('a.left.navigation')) {
    let righNav = document.querySelector('a.right.navigation');
    let leftNav = document.querySelector('a.left.navigation');

    if (righNav) {
      righNav = detach(righNav);
      righNav.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#ffffff}</style><path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM294.6 135.1c-4.2-4.5-10.1-7.1-16.3-7.1C266 128 256 138 256 150.3V208H160c-17.7 0-32 14.3-32 32v32c0 17.7 14.3 32 32 32h96v57.7c0 12.3 10 22.3 22.3 22.3c6.2 0 12.1-2.6 16.3-7.1l99.9-107.1c3.5-3.8 5.5-8.7 5.5-13.8s-2-10.1-5.5-13.8L294.6 135.1z"></path></svg>';

      document.querySelector('.header.border.pageTitle').append(righNav);
    } else {
      document.querySelector('#navWrapper>div>div:last-child').remove();
    }

    if (leftNav) {
      leftNav = detach(leftNav);
      leftNav.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#ffffff}</style><path d="M48 256a208 208 0 1 1 416 0A208 208 0 1 1 48 256zm464 0A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM217.4 376.9c4.2 4.5 10.1 7.1 16.3 7.1c12.3 0 22.3-10 22.3-22.3V304h96c17.7 0 32-14.3 32-32V240c0-17.7-14.3-32-32-32H256V150.3c0-12.3-10-22.3-22.3-22.3c-6.2 0-12.1 2.6-16.3 7.1L117.5 242.2c-3.5 3.8-5.5 8.7-5.5 13.8s2 10.1 5.5 13.8l99.9 107.1z"/></svg>';

      document.querySelector('.header.border.pageTitle').append(leftNav);
    } else {
      document.querySelector('#navWrapper>div>div:nth-child(1)').remove();
    }

    let playerNames = document.querySelectorAll('.text span .playerName');
    if (playerNames) {
      playerNames.forEach(playerName => {
        playerName.innerHTML = playerName.textContent.trim().substring(0, 15);
      })
    }

    if (document.querySelectorAll('.navigation .row .planets').length < 12 && document.querySelectorAll('.navigation .row .planets').length > 0) {
      document.querySelectorAll('.navigation .row').forEach((row) => {
        row.style.paddingLeft = '120px';
      });
    }

    document.querySelectorAll('.navigation .row .planets.hostile').forEach((planet) => {
      const allianceName = planet.querySelector('.allianceName') && planet.querySelector('.allianceName').textContent.trim().toLowerCase();
      if (planet.querySelector('.allianceName') && allianceName === '[sol]') {
        planet.classList.add('nap');
        planet.classList.remove('hostile');
        planet.querySelector('.allianceName').parentElement.classList.add('nap');
        planet.querySelector('.allianceName').parentElement.classList.remove('hostile');
      } else if (planet.querySelector('.allianceName') && allianceName !== '[wp]' && allianceName !== '[skol]' ) {
        planet.classList.add('peaceful');
        planet.classList.remove('hostile');
        planet.querySelector('.allianceName').parentElement.classList.add('peaceful');
        planet.querySelector('.allianceName').parentElement.classList.remove('hostile');
      }
    });
  }


  if (windowURL[1] === 'planet') {
    if (document.querySelector('#buttonBlock')) {
      document.querySelector('#buttonBlock a:first-child span').textContent = 'Structures';
      document.querySelector('#buttonBlock #converter span').textContent = 'Energy Converter';
    }

    if (document.querySelector('.planetName')) {
      let coords = document.querySelector('#planetHeader .coords').textContent.trim();
      document.querySelector('#planetHeader .coords').remove();

      let dgtNewCoords = document.createElement('div');
      dgtNewCoords.classList.add('dgt-planet-new-coords-big');
      dgtNewCoords.innerHTML = '<img src="https://i.imgur.com/HcC4l22.png"><span>' + coords + '</span>';

      document.querySelector('#planetImage').prepend(dgtNewCoords);

      let planetName = document.querySelector('.planetName');
      let name = document.createElement('span');
      name.classList.add('dgt-planet-name');

      let prev = detach(planetName.querySelector('a'));
      let next = detach(planetName.querySelector('a'));

      name.innerHTML = planetName.textContent.trim();

      if (next != null) {
        next.classList.add('dgt-planet-next');
        next.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><style>svg{fill:#ffffff}</style><path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM294.6 135.1c-4.2-4.5-10.1-7.1-16.3-7.1C266 128 256 138 256 150.3V208H160c-17.7 0-32 14.3-32 32v32c0 17.7 14.3 32 32 32h96v57.7c0 12.3 10 22.3 22.3 22.3c6.2 0 12.1-2.6 16.3-7.1l99.9-107.1c3.5-3.8 5.5-8.7 5.5-13.8s-2-10.1-5.5-13.8L294.6 135.1z"></path></svg>';
      }

      if (prev != null) {
        prev.classList.add('dgt-planet-prev');
        prev.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><style>svg{fill:#ffffff}</style><path d="M48 256a208 208 0 1 1 416 0A208 208 0 1 1 48 256zm464 0A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM217.4 376.9c4.2 4.5 10.1 7.1 16.3 7.1c12.3 0 22.3-10 22.3-22.3V304h96c17.7 0 32-14.3 32-32V240c0-17.7-14.3-32-32-32H256V150.3c0-12.3-10-22.3-22.3-22.3c-6.2 0-12.1 2.6-16.3 7.1L117.5 242.2c-3.5 3.8-5.5 8.7-5.5 13.8s2 10.1 5.5 13.8l99.9 107.1z"></path></svg>';
      }

      planetName.innerHTML = '';

      if (prev != null) {
        planetName.append(prev);
      }

      planetName.append(name);

      if (next != null) {
        planetName.append(next);
      }
    }
  }

  if (document.querySelector('#header')) {
    let credits = document.createElement('div');
    let playerRankingsUpdate = 0;
    let playerRankingsVersion = 0;
    let planetsUpdate = 0;
    let planetsVersion = 0;
    let dgtVersion = 'v0.0.0';

    if (localStorage.getItem('local-metadata')) {
      playerRankingsUpdate = JSON.parse(JSON.parse(localStorage.getItem('local-metadata')).value).playersRankingsTurn.turn;
      playerRankingsVersion = JSON.parse(JSON.parse(localStorage.getItem('local-metadata')).value).playersRankingsTurn.version;
      planetsUpdate = JSON.parse(JSON.parse(localStorage.getItem('local-metadata')).value).planetsTurn.turn;
      planetsVersion = JSON.parse(JSON.parse(localStorage.getItem('local-metadata')).value).planetsTurn.version;
      dgtVersion = JSON.parse(JSON.parse(localStorage.getItem('local-metadata')).value).dgtVersion
    }


    credits.id = 'dgt-credits';
    credits.innerHTML =
      '<span>DarkGalaxy Tools <i><b>' + dgtVersion + '</b></i></span>' +
      '<span>Rankings update turn: <i><b>' + playerRankingsUpdate + '.' + playerRankingsVersion + '</b></i></span>' +
      '<span>Planets update turn: <i><b>' + planetsUpdate + '.' + planetsVersion + '</b></i></span>';
    document.querySelector('#header .left').append(credits);
  }

  //// -- changelog
  if (windowURL.length === 2 && windowURL[1].trim().length === 0) {
    let generalInfo = document.createElement('div');
    generalInfo.id = 'general-info';

    if (document.querySelector('#contentBox .leftContent>h2')) {
      let infoPart = detach(document.querySelector('#contentBox .leftContent>h2').nextElementSibling);
      if (infoPart != null) {
        generalInfo.prepend(infoPart);
      }

      infoPart = detach(document.querySelector('#contentBox .leftContent>h2'));
      if (infoPart != null) {
        generalInfo.prepend(infoPart);
      }
    }

    let knownIssues = document.createElement('div');
    knownIssues.id = 'known-issues';

    if (document.querySelector('#contentBox .leftContent>h2')) {
      let issuesPart = detach(document.querySelector('#contentBox .leftContent>h2').nextElementSibling);
      if (issuesPart != null) {
        knownIssues.prepend(issuesPart);
      }

      issuesPart = detach(document.querySelector('#contentBox .leftContent>h2'));
      if (issuesPart != null) {
        knownIssues.prepend(issuesPart);
      }
    }

    document.querySelectorAll('#contentBox br').forEach((br) => {
      br.remove();
    });

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
    let planetScanAdditional = document.querySelector('#planet-scan-additional');

    if (planetScanAdditional) {
      let fleets = planetScanAdditional.querySelectorAll('.dgt-fleet');

      let grouped = new Map();
      fleets.forEach((fleet) => {
        fleet.style.width = '168px';

        let eta = fleet.querySelector('.ofHidden:first-child > .right');
        if (eta) {
          fleet.eta = parseInt(fleet.querySelector('.ofHidden:first-child > .right').textContent.trim().match(/\d+/)[0]);
          eta.innerHTML = 'ETA ' + fleet.eta;
        } else {
          fleet.eta = 0;
        }


        if (grouped.has(fleet.eta)) {
          grouped.get(fleet.eta).push(detach(fleet));
        } else {
          grouped.set(fleet.eta, [detach(fleet)]);
        }

        if (fleet.querySelector('span.friendly')) {
          fleet.classList.add('friendly-fleet');
        }
        if (fleet.querySelector('span.allied')) {
          fleet.classList.add('allied-fleet');
        }
        if (fleet.querySelector('span.hostile')) {
          fleet.classList.add('hostile-fleet');
        }
      });

      let earliestAllied = -1;
      let earliestHostile = -1;
      let battleSimulated = false;
      for (let i = 0; i < 48; i++) {
        let lineBreak = 0;

        if (grouped.has(i)) {
          grouped.get(i).forEach((fleet) => {
            if (earliestAllied < 0 && fleet.querySelectorAll('tr').length > 0 && (fleet.classList.contains('allied-fleet') || fleet.classList.contains('friendly-fleet'))) {
              earliestAllied = i;
            }

            if (earliestHostile < 0 && fleet.querySelectorAll('tr').length > 0 && fleet.classList.contains('hostile-fleet')) {
              earliestHostile = i;
            }

            lineBreak++;
            planetScanAdditional.append(fleet);

            if (lineBreak === 5) {
              lineBreak = 0;
            }
          });

          if (lineBreak > 0) {
            for (let j = 0; j < 5 - lineBreak; j++) {
              let empty = document.createElement('div');
              empty.classList.add('dgt-empty');
              empty.style.width = '168px';
              empty.style.margin = '3px';
              empty.style.float = 'left';
              planetScanAdditional.append(empty);
            }
          }

          let etaSeparator = document.createElement('div');
          etaSeparator.classList.add('dgt-eta-separator');
          planetScanAdditional.append(etaSeparator);


          // if (earliestAllied >= 0 && earliestHostile >= 0 && !battleSimulated) {
          //   battleSimulated = true;
          //   let fightContainer = document.createElement('div');
          //   fightContainer.classList.add('dgt-fight-simulation-container');
          //
          //   fightContainer.innerHTML =
          //     '<div class="dgt-fight-simulation-info">' +
          //       '<span class="dgt-fight-simulation-info-text">Battle Simulator</span>' +
          //       '<span class="dgt-fight-simulation-info-text">Allied ETA: <b>' + earliestAllied + '</b></span>' +
          //       '<span class="dgt-fight-simulation-info-text">Hostile ETA: <b>' + earliestHostile + '</b></span>' +
          //       '<span class="dgt-fight-simulation-info-text">This is just a simulation based on Speed Games data mining. Results should not be seen as the actual result of the battle!</span>' +
          //       '<span class="dgt-fight-simulation-info-text"><b>Attack</b> and <b>Defence</b> bonuses are <b>not</b> applied</span>' +
          //       '<span class="dgt-fight-simulation-info-text"><b>Holo</b> ships are <b>not</b> supported</span>' +
          //       '<span class="dgt-fight-simulation-info-text"><b>Freighter</b>, <b>Merchant</b>, <b>Trader</b>, <b>Hulk</b>, <b>Outpost Ship</b> and <b>Invasion Ship</b> are <b>not</b> supported</span>' +
          //     '</div>' +
          //     '<div class="dgt-fight-simulation">' +
          //       '<table class="dgt-fight-simulator-by-rof">' +
          //           '<tr class="top-header">' +
          //             '<th colspan="1" class="invisible"></th>' +
          //             '<th colspan="2" class="after-invisible">Allied</th>' +
          //             '<th colspan="2">Hostile</th>' +
          //           '</tr>' +
          //           '<tr class="top-header">' +
          //             '<th colspan="1" class="invisible"></th>' +
          //             '<th colspan="1" class="after-invisible">Before</th>' +
          //             '<th colspan="1">After</th>' +
          //             '<th colspan="1">Before</th>' +
          //             '<th colspan="1">After</th>' +
          //           '</tr>'+
          //           '<tr class="fleet-row">' +
          //             '<th colspan="1">Fighter</th>' +
          //             '<td>0</td>' +
          //             '<td>0</td>' +
          //             '<td>0</td>' +
          //             '<td>0</td>' +
          //           '</tr>' +
          //           '<tr class="fleet-row">' +
          //             '<th colspan="1">Bomber</th>' +
          //             '<td>0</td>' +
          //             '<td>0</td>' +
          //             '<td>0</td>' +
          //             '<td>0</td>' +
          //           '</tr>' +
          //           '<tr class="fleet-row">' +
          //             '<th colspan="1">Frigate</th>' +
          //             '<td>0</td>' +
          //             '<td>0</td>' +
          //             '<td>0</td>' +
          //             '<td>0</td>' +
          //           '</tr>' +
          //           '<tr class="fleet-row">' +
          //             '<th colspan="1">Destroyer</th>' +
          //             '<td>0</td>' +
          //             '<td>0</td>' +
          //             '<td>0</td>' +
          //             '<td>0</td>' +
          //           '</tr>' +
          //           '<tr class="fleet-row">' +
          //             '<th colspan="1">Cruiser</th>' +
          //             '<td>0</td>' +
          //             '<td>0</td>' +
          //             '<td>0</td>' +
          //             '<td>0</td>' +
          //           '</tr>' +
          //           '<tr class="fleet-row">' +
          //             '<th colspan="1">Battleship</th>' +
          //             '<td>0</td>' +
          //             '<td>0</td>' +
          //             '<td>0</td>' +
          //             '<td>0</td>' +
          //           '</tr>' +
          //           '<tr class="top-header">' +
          //             '<th colspan="5">Resources Cost (2 metal = 3 mineral)</th>' +
          //           '</tr>' +
          //           '<tr class="resource-row">' +
          //             '<th colspan="1">Metal</th>' +
          //             '<td>0</td>' +
          //             '<td>0</td>' +
          //             '<td>0</td>' +
          //             '<td>0</td>' +
          //           '</tr>' +
          //           '<tr class="resource-row">' +
          //             '<th colspan="1">Mineral</th>' +
          //             '<td>0</td>' +
          //             '<td>0</td>' +
          //             '<td>0</td>' +
          //             '<td>0</td>' +
          //           '</tr>' +
          //           '<tr class="resource-row">' +
          //             '<th colspan="1">Total</th>' +
          //             '<td>0</td>' +
          //             '<td>0</td>' +
          //             '<td>0</td>' +
          //             '<td>0</td>' +
          //           '</tr>' +
          //       '</table>' +
          //     '</div>';
          //
          //   planetScanAdditional.append(fightContainer);
          //
          //   let etaSeparator = document.createElement('div');
          //   etaSeparator.classList.add('dgt-eta-separator');
          //   planetScanAdditional.append(etaSeparator);
          // }
        }
      }

      let lineBreak = 0;
      let line = [];
      let maxOffsetHeight = 0;
      planetScanAdditional.querySelectorAll('.dgt-fleet, .dgt-empty').forEach((wrapper) => {
        if (maxOffsetHeight < wrapper.offsetHeight) {
          maxOffsetHeight = wrapper.offsetHeight;
        }

        line.push(wrapper);

        lineBreak++;
        if (lineBreak === 5) {
          line.forEach((wr) => {
            if (wr.classList.contains('dgt-empty')) {
              wr.style.height = (maxOffsetHeight + 2) + 'px';
            } else {
              wr.style.height = maxOffsetHeight + 'px';
            }
          });

          line = [];
          lineBreak = 0;
          maxOffsetHeight = 0;
        }
      });
    }


    let scanForm = document.querySelector('.opacBackground .opacDarkBackground>form');

    if (scanForm) {
      if (localStorage.getItem('next-scan')) {
        let nextScan = localStorage.getItem('next-scan').split(/\./);

        for (let i = 0; i < nextScan.length; i++) {
          scanForm.querySelector('input[name="coordinate.' + i + '"]').setAttribute('value', nextScan[i]);
        }
      }

      let scanButton = document.createElement('button');
      let scanAndNextButton = document.createElement('button');

      scanButton.onmousedown = () => {
        localStorage.removeItem('next-scan');
      }

      scanAndNextButton.onmousedown = () => {
        let galaxy = parseInt(scanForm.querySelector('input[name="coordinate.0"]').value);
        let sector = parseInt(scanForm.querySelector('input[name="coordinate.1"]').value);
        let system = parseInt(scanForm.querySelector('input[name="coordinate.2"]').value);
        let planet = parseInt(scanForm.querySelector('input[name="coordinate.3"]').value);

        if (galaxy === 1) {
          if (sector < 25) {
            if (system < 4) {
              if (planet < 12) {
                planet++;
              } else {
                planet = 1;
                system++;
              }
            } else {
              if (planet < 12) {
                planet++;
              } else {
                planet = 1;
                system = 1;
                sector++;
              }
            }
          } else {
            if (system < 4) {
              if (planet < 12) {
                planet++;
              } else {
                planet = 1;
                system++;
              }
            } else {
              if (planet < 12) {
                planet++;
              } else {
                planet = 1;
                system = 1;
                sector = 1;
                galaxy++;
              }
            }
          }
        } else if (galaxy >= 2 && galaxy <= 13) {
          if (sector < 6) {
            if (system < 4) {
              if (planet < 9) {
                planet++;
              } else {
                planet = 1;
                system++;
              }
            } else {
              if (planet < 9) {
                planet++;
              } else {
                planet = 1;
                system = 1;
                sector++;
              }
            }
          } else {
            if (system < 4) {
              if (planet < 9) {
                planet++;
              } else {
                planet = 1;
                system++;
              }
            } else {
              if (planet < 9) {
                planet++;
              } else {
                planet = 1;
                system = 1;
                sector = 1;
                galaxy++;
              }
            }
          }
        } else {
          if (sector < 2) {
            if (system < 4) {
              if (planet < 9) {
                planet++;
              } else {
                planet = 1;
                system++;
              }
            } else {
              if (planet < 9) {
                planet++;
              } else {
                planet = 1;
                system = 1;
                sector++;
              }
            }
          } else {
            if (system < 4) {
              if (planet < 9) {
                planet++;
              } else {
                planet = 1;
                system++;
              }
            } else {
              if (planet < 9) {
                planet++;
              } else {
                planet = 1;
                system = 1;
                sector = 1;
                galaxy++;
              }
            }
          }
        }

        localStorage.setItem('next-scan', galaxy + '.' + sector + '.' + system + '.' + planet);
      };

      scanButton.type = 'submit';
      scanButton.innerHTML = 'Scan';
      scanButton.id = 'dgt-scan-button';
      scanForm.querySelector('input[type="submit"]').parentElement.append(scanButton);

      scanAndNextButton.type = 'submit';
      scanAndNextButton.innerHTML = 'Scan & Next';
      scanAndNextButton.id = 'dgt-scan-next-button';
      scanForm.querySelector('input[type="submit"]').parentElement.append(scanAndNextButton);

      scanSystemButton.type = 'button';
      scanSystemButton.innerHTML = 'Scan System';
      scanSystemButton.id = 'dgt-scan-system-button';
      scanForm.querySelector('input[type="submit"]').parentElement.append(scanSystemButton);

      scanForm.querySelector('input[type="submit"]').parentElement.id = 'dgt-scan-buttons-wrapper';
      scanForm.querySelector('input[type="submit"]').remove();

      let submit = detach(scanForm.querySelector('.coordsInput>div:nth-child(3)'));
      let label = detach(scanForm.querySelector('.coordsInput>div:nth-child(1)'));
      scanForm.querySelector('.coordsInput').prepend(submit);
      scanForm.querySelector('.coordsInput').append(label);

      scanForm.querySelector('.coordsInput .coords .left:last-child').remove();

      scanForm.querySelector('.coordsInput>div:nth-child(2)').innerHTML =
        scanForm.querySelector('.coordsInput>div:nth-child(2) input[name="coordinate.0"]').outerHTML +
        ':' +
        scanForm.querySelector('.coordsInput>div:nth-child(2) input[name="coordinate.1"]').outerHTML +
        ':' +
        scanForm.querySelector('.coordsInput>div:nth-child(2) input[name="coordinate.2"]').outerHTML +
        ':' +
        scanForm.querySelector('.coordsInput>div:nth-child(2) input[name="coordinate.3"]').outerHTML;
    }
  }

  // -- rankings
  if (windowURL[1] === 'rankings' && (windowURL.length >= 4 && windowURL[2]) === 'players') {
    document.querySelectorAll('span.allied').forEach((allied => {
      allied.parentElement.parentElement.classList.add('allied-bg', 'rank-row');
    }));

    document.querySelectorAll('span.hostile').forEach((hostile => {
      hostile.parentElement.parentElement.classList.add('hostile-bg', 'rank-row');
    }));

    document.querySelectorAll('span.friendly').forEach((friendly => {
      friendly.parentElement.parentElement.classList.add('friendly-bg', 'rank-row');
    }));

    document.querySelector('.rankingsList').classList.add('playerRankingsList');

    document.querySelector('.rankingsList').nextElementSibling.id = 'ranking-navigation';

    let next = document.querySelector('.rankingsList').nextElementSibling.querySelector('.right.opacBackground:first-child a');
    let prev = document.querySelector('.rankingsList').nextElementSibling.querySelector('.right.opacBackground:last-child a')

    if (next) {
      next.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><style>svg{fill:#ffffff}</style><path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM294.6 135.1c-4.2-4.5-10.1-7.1-16.3-7.1C266 128 256 138 256 150.3V208H160c-17.7 0-32 14.3-32 32v32c0 17.7 14.3 32 32 32h96v57.7c0 12.3 10 22.3 22.3 22.3c6.2 0 12.1-2.6 16.3-7.1l99.9-107.1c3.5-3.8 5.5-8.7 5.5-13.8s-2-10.1-5.5-13.8L294.6 135.1z"></path></svg>';
    }

    if (prev) {
      prev.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><style>svg{fill:#ffffff}</style><path d="M48 256a208 208 0 1 1 416 0A208 208 0 1 1 48 256zm464 0A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM217.4 376.9c4.2 4.5 10.1 7.1 16.3 7.1c12.3 0 22.3-10 22.3-22.3V304h96c17.7 0 32-14.3 32-32V240c0-17.7-14.3-32-32-32H256V150.3c0-12.3-10-22.3-22.3-22.3c-6.2 0-12.1 2.6-16.3 7.1L117.5 242.2c-3.5 3.8-5.5 8.7-5.5 13.8s2 10.1 5.5 13.8l99.9 107.1z"></path></svg>';
    }


  }

  // -- fleet
  if (windowURL[1] === 'fleet') {
    if (document.querySelector('#fleetQueue')) {
      document.querySelector('#fleetQueue').nextElementSibling.id = 'queue-actions-left';
      document.querySelector('#fleetQueue').previousElementSibling.id = 'queue-actions-right';
    }

    if (document.querySelector('#queue-actions-left .coordsInput form input')) {
      let coordsWrapper = document.querySelector('#queue-actions-left .coordsInput form input').parentElement;
      coordsWrapper.id = 'fleet-move-coords';
      coordsWrapper.previousElementSibling.id = 'fleet-move-coords-icon';
      coordsWrapper.nextElementSibling.nextElementSibling.id = 'fleet-radio-check';

      coordsWrapper.innerHTML = coordsWrapper.querySelector('input:nth-child(1)').outerHTML +
        ':' +
        coordsWrapper.querySelector('input:nth-child(2)').outerHTML +
        ':' +
        coordsWrapper.querySelector('input:nth-child(3)').outerHTML +
        ':' +
        coordsWrapper.querySelector('input:nth-child(4)').outerHTML;
    }

    if (document.querySelector('#queue-actions-left .coordsInput form select')) {
      document.querySelector('#queue-actions-left .coordsInput form select').parentElement.id = 'fleet-move-planet';
      document.querySelector('#queue-actions-left .coordsInput form select').parentElement.previousElementSibling.id = 'fleet-move-planet-icon';
    }

    if (document.querySelector('#queue-actions-left .coordsInput form input[name="count"]')) {
      document.querySelector('#queue-actions-left .coordsInput form input[name="count"]').parentElement.id = 'fleet-wait';
      document.querySelector('#queue-actions-left .coordsInput form input[name="count"]').parentElement.previousElementSibling.id = 'fleet-wait-icon';
    }

    document.querySelectorAll('#queue-actions-right .fleetRight:last-child .entry>.structureImage').forEach(structImg => {
      structImg.parentElement.classList.add('ship-entry');
    });

    document.querySelectorAll('#queue-actions-right .fleetRight:last-child .entry>:not(.structureImage):first-child').forEach(structImg => {
      structImg.parentElement.classList.add('resource-entry');
    });

    let leftButtons = document.querySelectorAll('#queue-actions-left form input[type="submit"]');

    if (leftButtons) {
      leftButtons.forEach(button => {
        let newButton = document.createElement('button');
        newButton.type = 'submit';
        newButton.classList.add('text-button');
        newButton.innerHTML = button.attributes['value'].value;

        button.parentElement.append(newButton);
        button.remove();
      })
    }


    let inputs = document.querySelectorAll('#queue-actions-left .transferRow');
    if (inputs) {
      inputs.forEach(input => {
        input.prepend(detach(input.querySelector('.amount').nextElementSibling));
        let actualInput = input.querySelector('input[type="number"]');

        let maxButton = document.createElement('div');
        maxButton.classList.add('dgt-max-button');
        maxButton.innerHTML = '<span><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h50.7L9.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L256 109.3V160c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H160zM576 80a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM448 208a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM400 384a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm48 80a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm128 0a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM272 384a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm48 80a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM144 512a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM576 336a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm-48-80a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/></svg></span>';

        if (actualInput.getAttribute('name') === 'unitMap.197' || actualInput.getAttribute('name') === 'unitMap.196') {
          let splitButton = document.createElement('div');
          splitButton.classList.add('dgt-max-button');
          splitButton.innerHTML = '<span><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M246.6 150.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l96-96c12.5-12.5 32.8-12.5 45.3 0l96 96c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L352 109.3V384c0 35.3 28.7 64 64 64h64c17.7 0 32 14.3 32 32s-14.3 32-32 32H416c-70.7 0-128-57.3-128-128c0-35.3-28.7-64-64-64H109.3l41.4 41.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0l-96-96c-12.5-12.5-12.5-32.8 0-45.3l96-96c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3L109.3 256H224c23.3 0 45.2 6.2 64 17.1V109.3l-41.4 41.4z"/></svg></span>';

          input.insertBefore(splitButton, input.querySelector('.text'));
          input.insertBefore(maxButton, splitButton);

          splitButton.onmousedown = () => {
            if (actualInput.getAttribute('name') === 'unitMap.197') {
              actualInput.value = 40000;
            } else if (actualInput.getAttribute('name') === 'unitMap.196') {
              actualInput.value = 50000;
            }
          }
        } else {
          input.insertBefore(maxButton, input.querySelector('.text'));
        }


        maxButton.onmousedown = () => {
          let actualInput = input.querySelector('input[type="number"]');
          actualInput.value = actualInput.getAttribute('max');
        };
      });
    }

    document.querySelectorAll('#queue-actions-right > .fleetRight').forEach((section) => {
      if (section.querySelector('.header')) {
        section.id = section.querySelector('.header').textContent.trim().toLowerCase().replace(/\s+/g, '-');
      }
    });

    if (document.querySelector('#destroy-fleet')) {
      let newButton = document.createElement('button');
      newButton.type = 'submit';
      newButton.classList.add('text-button');
      newButton.innerHTML = 'Delete';

      document.querySelector('#destroy-fleet input[type="submit"]').parentElement.append(newButton);
      document.querySelector('#destroy-fleet input[type="submit"]').remove();
    }

    if (document.querySelector('#colonise-planet')) {
      let newButton = document.createElement('button');
      newButton.type = 'submit';
      newButton.classList.add('text-button');
      newButton.innerHTML = 'Colonise';

      document.querySelector('#colonise-planet input[type="submit"]').parentElement.append(newButton);
      document.querySelector('#colonise-planet input[type="submit"]').remove();
    }

    if (document.querySelector('#transfer-targets')) {
      let newButton = document.createElement('button');
      newButton.type = 'submit';
      newButton.classList.add('text-button');
      newButton.innerHTML = 'Create';

      document.querySelector('#transfer-targets input[type="submit"]').parentElement.append(newButton);
      document.querySelector('#transfer-targets input[type="submit"]').remove();
    }

    if (document.querySelector('.nextPrevFleet a')) {
      document.querySelectorAll('.nextPrevFleet a').forEach(breacrumb => {
        if (breacrumb.textContent.trim() === '«') {
          breacrumb.id = 'fleet-left-nav';
          breacrumb.parentElement.classList.add('delete-marker');
          breacrumb.parentElement.insertAdjacentElement("afterend", detach(breacrumb));
          breacrumb.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#ffffff}</style><path d="M48 256a208 208 0 1 1 416 0A208 208 0 1 1 48 256zm464 0A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM217.4 376.9c4.2 4.5 10.1 7.1 16.3 7.1c12.3 0 22.3-10 22.3-22.3V304h96c17.7 0 32-14.3 32-32V240c0-17.7-14.3-32-32-32H256V150.3c0-12.3-10-22.3-22.3-22.3c-6.2 0-12.1 2.6-16.3 7.1L117.5 242.2c-3.5 3.8-5.5 8.7-5.5 13.8s2 10.1 5.5 13.8l99.9 107.1z"/></svg>';

          document.querySelector('.delete-marker').remove();
        }

        if (breacrumb.textContent.trim() === '»') {
          breacrumb.id = 'fleet-right-nav';
          breacrumb.parentElement.classList.add('delete-marker');
          breacrumb.parentElement.insertAdjacentElement("afterend", detach(breacrumb));
          breacrumb.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#ffffff}</style><path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM294.6 135.1c-4.2-4.5-10.1-7.1-16.3-7.1C266 128 256 138 256 150.3V208H160c-17.7 0-32 14.3-32 32v32c0 17.7 14.3 32 32 32h96v57.7c0 12.3 10 22.3 22.3 22.3c6.2 0 12.1-2.6 16.3-7.1l99.9-107.1c3.5-3.8 5.5-8.7 5.5-13.8s-2-10.1-5.5-13.8L294.6 135.1z"></path></svg>';

          document.querySelector('.delete-marker').remove();
        }
      });

      document.querySelector('.header.border.pageTitle a').parentElement.innerHTML = document.querySelector('.header.border.pageTitle a').parentElement.textContent.trim();
      let funnySpan = document.createElement('span');
      funnySpan.id = 'dgt-fleet-funny-span';
      funnySpan.innerHTML = 'If you fuck up, you do 20 push ups!';
      document.querySelector('.header.border.pageTitle').append(funnySpan);
    }

    if (document.querySelector('#fleetHeader')) {
      let fleetHeader = document.querySelector('#fleetHeader');

      fleetHeader.nextElementSibling.id = 'target-transfer';
      fleetHeader.nextElementSibling.nextElementSibling.id = 'source-transfer';

      let targetTransfer = document.querySelector('#target-transfer input[type="submit"]');
      let sourceTransfer = document.querySelector('#source-transfer input[type="submit"]');

      if (targetTransfer) {
        let newButton = document.createElement('button');
        newButton.type = 'submit';
        newButton.classList.add('text-button');
        newButton.innerHTML = 'Transfer';

        targetTransfer.parentElement.append(newButton);
        targetTransfer.remove();
      }

      if (sourceTransfer) {
        let newButton = document.createElement('button');
        newButton.type = 'submit';
        newButton.classList.add('text-button');
        newButton.innerHTML = 'Transfer';

        sourceTransfer.parentElement.append(newButton);
        sourceTransfer.remove();
      }

      let inputs = fleetHeader.nextElementSibling.nextElementSibling.querySelectorAll('.transferRow');
      if (inputs) {
        inputs.forEach(input => {
          let detached = detach(input.querySelector('.amount').nextElementSibling);

          if (detached != null) {
            input.prepend(detached);

            let actualInput = input.querySelector('input[type="number"]');

            if (actualInput) {
              let maxButton = document.createElement('div');
              maxButton.classList.add('dgt-max-button');
              maxButton.innerHTML = '<span><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h50.7L9.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L256 109.3V160c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H160zM576 80a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM448 208a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM400 384a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm48 80a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm128 0a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM272 384a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm48 80a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM144 512a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM576 336a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm-48-80a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/></svg></span>';

              if (actualInput.getAttribute('name') === 'unitMap.197' || actualInput.getAttribute('name') === 'unitMap.196') {
                let splitButton = document.createElement('div');
                splitButton.classList.add('dgt-max-button');
                splitButton.innerHTML = '<span><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M246.6 150.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l96-96c12.5-12.5 32.8-12.5 45.3 0l96 96c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L352 109.3V384c0 35.3 28.7 64 64 64h64c17.7 0 32 14.3 32 32s-14.3 32-32 32H416c-70.7 0-128-57.3-128-128c0-35.3-28.7-64-64-64H109.3l41.4 41.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0l-96-96c-12.5-12.5-12.5-32.8 0-45.3l96-96c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3L109.3 256H224c23.3 0 45.2 6.2 64 17.1V109.3l-41.4 41.4z"/></svg></span>';

                input.insertBefore(splitButton, input.querySelector('.text'));
                input.insertBefore(maxButton, splitButton);

                splitButton.onmousedown = () => {
                  if (actualInput.getAttribute('name') === 'unitMap.197') {
                    actualInput.value = 40000;
                  } else if (actualInput.getAttribute('name') === 'unitMap.196') {
                    actualInput.value = 50000;
                  }
                }
              } else {
                input.insertBefore(maxButton, input.querySelector('.text'));
              }


              maxButton.onmousedown = () => {
                let actualInput = input.querySelector('input[type="number"]');
                actualInput.value = 999999999;
              };
            }
          }
        });
      }

      inputs = fleetHeader.nextElementSibling.querySelectorAll('.transferRow');
      if (inputs) {
        inputs.forEach(input => {
          let detached = detach(input.querySelector('.amount'));

          if (detached != null) {
            input.prepend(detached);

            let actualInput = input.querySelector('input[type="number"]');

            if (actualInput) {

              let maxButton = document.createElement('div');
              maxButton.classList.add('dgt-max-button');
              maxButton.innerHTML = '<span><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h50.7L9.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L256 109.3V160c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H160zM576 80a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM448 208a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM400 384a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm48 80a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm128 0a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM272 384a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm48 80a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM144 512a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM576 336a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm-48-80a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/></svg></span>';

              if (actualInput.getAttribute('name') === 'unitMap.197' || actualInput.getAttribute('name') === 'unitMap.196') {
                let splitButton = document.createElement('div');
                splitButton.classList.add('dgt-max-button');
                splitButton.innerHTML = '<span><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M246.6 150.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l96-96c12.5-12.5 32.8-12.5 45.3 0l96 96c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L352 109.3V384c0 35.3 28.7 64 64 64h64c17.7 0 32 14.3 32 32s-14.3 32-32 32H416c-70.7 0-128-57.3-128-128c0-35.3-28.7-64-64-64H109.3l41.4 41.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0l-96-96c-12.5-12.5-12.5-32.8 0-45.3l96-96c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3L109.3 256H224c23.3 0 45.2 6.2 64 17.1V109.3l-41.4 41.4z"/></svg></span>';

                input.prepend(splitButton, input.querySelector('.text'));
                input.insertBefore(maxButton, splitButton);

                splitButton.onmousedown = () => {
                  if (actualInput.getAttribute('name') === 'unitMap.197') {
                    actualInput.value = 40000;
                  } else if (actualInput.getAttribute('name') === 'unitMap.196') {
                    actualInput.value = 50000;
                  }
                }
              } else {
                input.prepend(maxButton, input.querySelector('.text'));
              }


              maxButton.onmousedown = () => {
                let actualInput = input.querySelector('input[type="number"]');
                actualInput.value = 999999999;
              };
            }
          }
        });
      }
    }
  }

  if (windowURL[1] === 'research') {
    document.querySelector('img[src="/images/icons/research.png"]').parentElement.parentElement.id = 'dgt-research-description';
    document.querySelector('img[src="/images/icons/research.png"]').parentElement.remove();
    document.querySelector('form').id = 'dgt-research-form';
    document.querySelectorAll('.researchTitle').forEach((title) => {
      title.parentElement.classList.add('dgt-research-padding');
    });

    let researchDescription = document.querySelector('#dgt-research-description > div');
    researchDescription.innerHTML = researchDescription.innerHTML.replace(researchDescription.innerHTML.match(/\d+/g), '<span class="dgt-research-points">' + researchDescription.innerHTML.match(/\d+/g) + '</span>');

    document.querySelectorAll('.researchTitle > div').forEach((title) => {
      if (title.textContent.trim().toLowerCase().indexOf('planet limit') !== -1) {
        title.parentElement.classList.add('planet-limit');
      }
    });
  }
}
