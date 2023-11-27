function detach(e){return null!=e?e.parentElement.removeChild(e):null}function applyCustomStyling(e){if(document.getElementById("home-stats")&&(document.querySelector("#home-stats>div:nth-child(2)>div>div:nth-child(2)").remove(),document.querySelector("#home-stats>div:nth-child(2)>div>div:nth-child(2)").remove()),document.querySelector("#queue .researchTitle")&&(document.querySelectorAll("#queue .researchTitle")[document.querySelectorAll("#queue .researchTitle").length-1].style.height="120px"),document.querySelector("#addQueue .left.padding:last-child")&&document.querySelector("#addQueue .left.padding:last-child").textContent.trim().toLocaleLowerCase().startsWith("you are currently unable to")&&(document.querySelector("#addQueue .left.padding:last-child").style.width="455px"),"planets"===e[1]&&(document.querySelectorAll("#planetList > #planetList").forEach(e=>{e.querySelector(".planetImage img").setAttribute("width",75),e.querySelector(".planetImage img").setAttribute("height",75);let t=e.querySelector(".nameRow .coords span").textContent.trim();e.querySelector(".nameRow .coords").style.display="none";let n=document.createElement("span");n.innerHTML=t,n.classList.add("dgt-planet-new-coords"),e.querySelector(".planetImage a").prepend(n),e.querySelectorAll(".planetHeadSection").length>3&&e.querySelector(".planetImage").classList.add("dgt-no-bottom-radius")}),document.querySelectorAll(".resource span, em.neutral").forEach(e=>{e.innerHTML=e.innerHTML.replace(/\(/g,"[").replace(/\)/g,"]")}),document.querySelectorAll("#planetList > #planetList .planetHeadSection:nth-child(4) .right").forEach(e=>{let t=e.parentElement.parentElement.parentElement.querySelector(".coords span").textContent.trim().split(/\./),n=document.createElement("div");n.classList.add("dgt-link-to-navigation","right","resource"),"0"!==t[0]&&(n.innerHTML='<a target="_blank" title="Navigation" href="/navigation/'+t[0]+"/"+t[1]+"/"+t[2]+'/"><img src="https://i.imgur.com/HcC4l22.png" width="16" height="16"></a>',e.parentElement.append(n))})),document.querySelector("#fleetHeader")&&(document.querySelector("#fleetHeader").parentElement.querySelector("div.opacDarkBackground.left:nth-child(2)").style.marginRight="3px"),document.querySelector("#fleetQueue form .queueButtons")&&(document.querySelectorAll("#fleetQueue form .queueButtons .queueRemoveButton").forEach(e=>{e.id=e.name+(e.value?e.value:"");let t=document.createElement("label");t.htmlFor=e.id,t.classList.add("queueDestroyButton"),t.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><style>svg{fill:#535353}</style><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>',e.parentNode.insertBefore(t,e.nextSibling),e.style.display="none"}),document.querySelectorAll("#fleetQueue form .queueButtons .queueDownButton").forEach(e=>{e.id=e.name+(e.value?e.value:"");let t=document.createElement("label");t.htmlFor=e.id,t.classList.add("queueDownButton"),t.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M256 464a208 208 0 1 1 0-416 208 208 0 1 1 0 416zM256 0a256 256 0 1 0 0 512A256 256 0 1 0 256 0zM376.9 294.6c4.5-4.2 7.1-10.1 7.1-16.3c0-12.3-10-22.3-22.3-22.3H304V160c0-17.7-14.3-32-32-32l-32 0c-17.7 0-32 14.3-32 32v96H150.3C138 256 128 266 128 278.3c0 6.2 2.6 12.1 7.1 16.3l107.1 99.9c3.8 3.5 8.7 5.5 13.8 5.5s10.1-2 13.8-5.5l107.1-99.9z"/></svg>',e.parentNode.insertBefore(t,e.nextSibling),e.style.display="none"}),document.querySelectorAll("#fleetQueue form .queueButtons .queueUpButton").forEach(e=>{e.id=e.name+(e.value?e.value:"");let t=document.createElement("label");t.htmlFor=e.id,t.classList.add("queueUpButton"),t.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM135.1 217.4c-4.5 4.2-7.1 10.1-7.1 16.3c0 12.3 10 22.3 22.3 22.3H208v96c0 17.7 14.3 32 32 32h32c17.7 0 32-14.3 32-32V256h57.7c12.3 0 22.3-10 22.3-22.3c0-6.2-2.6-12.1-7.1-16.3L269.8 117.5c-3.8-3.5-8.7-5.5-13.8-5.5s-10.1 2-13.8 5.5L135.1 217.4z"/></svg>',e.parentNode.insertBefore(t,e.nextSibling),e.style.display="none"})),document.querySelector("#completed .tableHeader")&&(document.querySelector("#completed .tableHeader").remove(),document.querySelectorAll(".queueDestroyButton, .queueRemoveButton, .addQueue").forEach(e=>{e.id=e.name+(e.value?e.value:"");let t=document.createElement("label");t.htmlFor=e.id,t.classList.add("queueDestroyButton"),e.classList.contains("addQueue")&&t.classList.add("rotation45"),e.classList.contains("prequeue")&&t.classList.add("researchQueue"),t.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><style>svg{fill:#535353}</style><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>',e.parentNode.insertBefore(t,e.nextSibling),e.style.display="none"}),document.querySelectorAll(".queueDownButton").forEach(e=>{e.id=e.name+(e.value?e.value:"");let t=document.createElement("label");t.htmlFor=e.id,t.classList.add("queueDownButton"),t.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M256 464a208 208 0 1 1 0-416 208 208 0 1 1 0 416zM256 0a256 256 0 1 0 0 512A256 256 0 1 0 256 0zM376.9 294.6c4.5-4.2 7.1-10.1 7.1-16.3c0-12.3-10-22.3-22.3-22.3H304V160c0-17.7-14.3-32-32-32l-32 0c-17.7 0-32 14.3-32 32v96H150.3C138 256 128 266 128 278.3c0 6.2 2.6 12.1 7.1 16.3l107.1 99.9c3.8 3.5 8.7 5.5 13.8 5.5s10.1-2 13.8-5.5l107.1-99.9z"/></svg>',e.parentNode.insertBefore(t,e.nextSibling),e.style.display="none"}),document.querySelectorAll(".queueUpButton").forEach(e=>{e.id=e.name+(e.value?e.value:"");let t=document.createElement("label");t.htmlFor=e.id,t.classList.add("queueUpButton"),t.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM135.1 217.4c-4.5 4.2-7.1 10.1-7.1 16.3c0 12.3 10 22.3 22.3 22.3H208v96c0 17.7 14.3 32 32 32h32c17.7 0 32-14.3 32-32V256h57.7c12.3 0 22.3-10 22.3-22.3c0-6.2-2.6-12.1-7.1-16.3L269.8 117.5c-3.8-3.5-8.7-5.5-13.8-5.5s-10.1 2-13.8 5.5L135.1 217.4z"/></svg>',e.parentNode.insertBefore(t,e.nextSibling),e.style.display="none"}),document.querySelectorAll("#completed .upkeepList").forEach(e=>{e.querySelector(".width65").remove(),e.querySelector(".ground:last-child").classList.add("orbit"),e.querySelector(".ground:last-child").classList.remove("ground"),e.querySelectorAll(".left").forEach(e=>{0===e.textContent.trim().length&&e.remove(),(e.classList.contains("width25")||e.classList.contains("width50"))&&(e.classList.remove("width25"),e.classList.remove("width50"),e.classList.add("width100")),e.classList.contains("metal")&&(e.innerHTML='<img alt="Metal" src="https://i.imgur.com/V9Yv4MJ.jpg" width="17" height="17"><span>'+e.innerHTML+"</span>"),e.classList.contains("mineral")&&(e.innerHTML='<img alt="Minteral" src="https://i.imgur.com/OdLTSDl.jpg" title="Mineral" width="17" height="17"><span>'+e.innerHTML+"</span>"),e.classList.contains("food")&&(e.innerHTML='<img src="https://i.imgur.com/bhfaalb.jpg" title="Food" width="17" height="17"><span>'+e.innerHTML+"</span>"),e.classList.contains("energy")&&(e.innerHTML='<img alt="Energy" src="https://i.imgur.com/IkkDId3.jpg" width="17" height="17"><span>'+e.innerHTML+"</span>"),e.classList.contains("ground")&&(e.innerHTML='<img src="https://i.imgur.com/cSsBIwv.jpg" title="Ground Space" width="17" height="17"><span>'+e.innerHTML+"</span>"),e.classList.contains("orbit")&&(e.innerHTML='<img src="https://i.imgur.com/7wtJcXw.jpg" title="Orbit Space" width="17" height="17"><span>'+e.innerHTML+"</span>")})})),document.querySelector("a.right.navigation")||document.querySelector("a.left.navigation")){let t=document.querySelector("a.right.navigation"),n=document.querySelector("a.left.navigation");t?((t=detach(t)).innerHTML='<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#ffffff}</style><path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM294.6 135.1c-4.2-4.5-10.1-7.1-16.3-7.1C266 128 256 138 256 150.3V208H160c-17.7 0-32 14.3-32 32v32c0 17.7 14.3 32 32 32h96v57.7c0 12.3 10 22.3 22.3 22.3c6.2 0 12.1-2.6 16.3-7.1l99.9-107.1c3.5-3.8 5.5-8.7 5.5-13.8s-2-10.1-5.5-13.8L294.6 135.1z"></path></svg>',document.querySelector(".header.border.pageTitle").append(t)):document.querySelector("#navWrapper>div>div:last-child").remove(),n?((n=detach(n)).innerHTML='<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#ffffff}</style><path d="M48 256a208 208 0 1 1 416 0A208 208 0 1 1 48 256zm464 0A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM217.4 376.9c4.2 4.5 10.1 7.1 16.3 7.1c12.3 0 22.3-10 22.3-22.3V304h96c17.7 0 32-14.3 32-32V240c0-17.7-14.3-32-32-32H256V150.3c0-12.3-10-22.3-22.3-22.3c-6.2 0-12.1 2.6-16.3 7.1L117.5 242.2c-3.5 3.8-5.5 8.7-5.5 13.8s2 10.1 5.5 13.8l99.9 107.1z"/></svg>',document.querySelector(".header.border.pageTitle").append(n)):document.querySelector("#navWrapper>div>div:nth-child(1)").remove();let l=document.querySelectorAll(".text span .playerName");l&&l.forEach(e=>{e.innerHTML=e.textContent.trim().substring(0,15)}),document.querySelectorAll(".navigation .row .planets").length<12&&document.querySelectorAll(".navigation .row .planets").length>0&&document.querySelectorAll(".navigation .row").forEach(e=>{e.style.paddingLeft="120px"}),document.querySelectorAll(".navigation .row .planets.hostile").forEach(e=>{let t=e.querySelector(".allianceName")&&e.querySelector(".allianceName").textContent.trim().toLowerCase();e.querySelector(".allianceName")&&"[sol]"===t?(e.classList.add("nap"),e.classList.remove("hostile"),e.querySelector(".allianceName").parentElement.classList.add("nap"),e.querySelector(".allianceName").parentElement.classList.remove("hostile")):e.querySelector(".allianceName")&&"[wp]"!==t&&"[skol]"!==t&&"[gog]"!==t&&(e.classList.add("peaceful"),e.classList.remove("hostile"),e.querySelector(".allianceName").parentElement.classList.add("peaceful"),e.querySelector(".allianceName").parentElement.classList.remove("hostile"))})}if("planet"===e[1]&&(document.querySelector("#buttonBlock")&&(document.querySelector("#buttonBlock a:first-child span").textContent="Structures",document.querySelector("#buttonBlock #converter span").textContent="Energy Converter"),document.querySelector(".planetName"))){let r=document.querySelector("#planetHeader .coords").textContent.trim();document.querySelector("#planetHeader .coords").remove();let a=document.createElement("div");a.classList.add("dgt-planet-new-coords-big"),a.innerHTML='<img src="https://i.imgur.com/HcC4l22.png"><span>'+r+"</span>",document.querySelector("#planetImage").prepend(a);let s=document.querySelector(".planetName"),o=document.createElement("span");o.classList.add("dgt-planet-name");let i=detach(s.querySelector("a")),c=detach(s.querySelector("a"));o.innerHTML=s.textContent.trim(),null!=c&&(c.classList.add("dgt-planet-next"),c.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><style>svg{fill:#ffffff}</style><path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM294.6 135.1c-4.2-4.5-10.1-7.1-16.3-7.1C266 128 256 138 256 150.3V208H160c-17.7 0-32 14.3-32 32v32c0 17.7 14.3 32 32 32h96v57.7c0 12.3 10 22.3 22.3 22.3c6.2 0 12.1-2.6 16.3-7.1l99.9-107.1c3.5-3.8 5.5-8.7 5.5-13.8s-2-10.1-5.5-13.8L294.6 135.1z"></path></svg>'),null!=i&&(i.classList.add("dgt-planet-prev"),i.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><style>svg{fill:#ffffff}</style><path d="M48 256a208 208 0 1 1 416 0A208 208 0 1 1 48 256zm464 0A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM217.4 376.9c4.2 4.5 10.1 7.1 16.3 7.1c12.3 0 22.3-10 22.3-22.3V304h96c17.7 0 32-14.3 32-32V240c0-17.7-14.3-32-32-32H256V150.3c0-12.3-10-22.3-22.3-22.3c-6.2 0-12.1 2.6-16.3 7.1L117.5 242.2c-3.5 3.8-5.5 8.7-5.5 13.8s2 10.1 5.5 13.8l99.9 107.1z"></path></svg>'),s.innerHTML="",null!=i&&s.append(i),s.append(o),null!=c&&s.append(c)}if(document.querySelector("#header")){let $=document.createElement("div"),_=0,d=0,u=0,p=0,m="v0.0.0";localStorage.getItem("local-metadata")&&(_=JSON.parse(JSON.parse(localStorage.getItem("local-metadata")).value).playersRankingsTurn.turn,d=JSON.parse(JSON.parse(localStorage.getItem("local-metadata")).value).playersRankingsTurn.version,u=JSON.parse(JSON.parse(localStorage.getItem("local-metadata")).value).planetsTurn.turn,p=JSON.parse(JSON.parse(localStorage.getItem("local-metadata")).value).planetsTurn.version,m=JSON.parse(JSON.parse(localStorage.getItem("local-metadata")).value).dgtVersion),$.id="dgt-credits",$.innerHTML="<span>DarkGalaxy Tools <i><b>"+m+"</b></i></span><span>Rankings update turn: <i><b>"+_+"."+d+"</b></i></span><span>Planets update turn: <i><b>"+u+"."+p+"</b></i></span>",document.querySelector("#header .left").append($)}if(2===e.length&&0===e[1].trim().length){let h=document.createElement("div");if(h.id="general-info",document.querySelector("#contentBox .leftContent>h2")){let g=detach(document.querySelector("#contentBox .leftContent>h2").nextElementSibling);null!=g&&h.prepend(g),null!=(g=detach(document.querySelector("#contentBox .leftContent>h2")))&&h.prepend(g)}let f=document.createElement("div");if(f.id="known-issues",document.querySelector("#contentBox .leftContent>h2")){let y=detach(document.querySelector("#contentBox .leftContent>h2").nextElementSibling);null!=y&&f.prepend(y),null!=(y=detach(document.querySelector("#contentBox .leftContent>h2")))&&f.prepend(y)}document.querySelectorAll("#contentBox br").forEach(e=>{e.remove()});let v=document.createElement("div");v.id="welcome";let S=detach(document.querySelector("#contentBox .leftContent>.plainHeader"));for(null!=S&&v.append(S);document.querySelector("#contentBox .leftContent>p");)if(document.querySelector("#contentBox .leftContent>p").innerHTML.trim().length>0){let q=detach(document.querySelector("#contentBox .leftContent>p"));null!=q&&v.append(q)}else document.querySelector("#contentBox .leftContent>p").remove();document.querySelector("#contentBox .leftContent").prepend(f),document.querySelector("#contentBox .leftContent").prepend(h),document.querySelector("#contentBox .leftContent").prepend(v);let L=detach(document.querySelector("dgt-changelog"));null!=L&&document.querySelector("#contentBox .leftContent").prepend(L)}if("planet"===e[1]&&"comms"===(5===e.length&&e[3])){let w=document.querySelector("#planet-scan-additional");if(w){let b=w.querySelectorAll(".dgt-fleet"),x=new Map;b.forEach(e=>{e.style.width="168px",x.has(e.eta)?x.get(e.eta).push(detach(e)):x.set(e.eta,[detach(e)]),e.querySelector("span.friendly")&&e.classList.add("friendly-fleet"),e.querySelector("span.allied")&&e.classList.add("allied-fleet"),e.querySelector("span.hostile")&&e.classList.add("hostile-fleet")});let M=-1,E=-1,H=!1;for(let T=0;T<48;T++){let A=0,B=!1;if(x.has(T)){if(x.get(T).forEach(e=>{let t=e.innerText.toLowerCase().indexOf("battleship")>-1||e.innerText.toLowerCase().indexOf("fighter")>-1||e.innerText.toLowerCase().indexOf("bomber")>-1||e.innerText.toLowerCase().indexOf("frigate")>-1||e.innerText.toLowerCase().indexOf("destroyer")>-1||e.innerText.toLowerCase().indexOf("cruiser")>-1;if(t){B=!0;let n=document.createElement("div");n.classList.add("dgt-fleet-score"),n.innerHTML='<span class="dgt-fleet-score-label">Score</span><span class="dgt-fleet-score-value">0</span>',e.append(n)}M<0&&t&&(e.classList.contains("allied-fleet")||e.classList.contains("friendly-fleet"))&&(M=T),E<0&&t&&e.classList.contains("hostile-fleet")&&(E=T),A++,w.append(e),5===A&&(A=0)}),A>0)for(let z=0;z<5-A;z++){let C=document.createElement("div");C.classList.add("dgt-empty"),C.style.width="168px",C.style.margin="3px",C.style.float="left",w.append(C)}if(B){let I=document.createElement("div");I.classList.add("dgt-eta-score"),I.attributes.setNamedItem(document.createAttribute("eta")),I.attributes.getNamedItem("eta").value=T,I.innerHTML='<span class="dgt-eta-score-label">ETA '+T+' score</span><span class="allied dgt-eta-score-label">Allied:</span><span class="allied dgt-eta-score-value">0</span><span class="hostile dgt-eta-score-label">Hostile:</span><span class="hostile dgt-eta-score-value">0</span>',w.append(I)}if(M>=0&&E>=0&&!H){H=!0;let F=document.createElement("div");F.classList.add("dgt-fight-simulation-container"),F.innerHTML='<div class="dgt-fight-simulation-info"><span class="dgt-fight-simulation-info-text">Battle Simulator</span><span class="dgt-fight-simulation-info-text">Hostile ETA: <b>'+E+'</b></span><span class="dgt-fight-simulation-info-text">This is just a simulation based on Speed Games data mining. Results are hypothetical</span><span class="dgt-fight-simulation-info-text"><b>Attack</b> and <b>Defence</b> bonuses are <b>not</b> applied</span><span class="dgt-fight-simulation-info-text"><b>Holo Ships</b> are <b>not</b> supported</span><span class="dgt-fight-simulation-info-text"><b>Transporter Ships</b> and <b>Invasion Ship</b> are <b>not</b> supported</span></div><div class="dgt-fight-simulation" eta="'+(M>E?M:E)+'"><table class="dgt-fight-simulator-by-rof"><tr class="top-header"><th colspan="1" class="invisible"></th><th colspan="2" class="after-invisible">Allied</th><th colspan="2">Hostile</th></tr><tr class="top-header"><th colspan="1" class="invisible"></th><th colspan="1" class="after-invisible">Before</th><th colspan="1">After</th><th colspan="1">Before</th><th colspan="1">After</th></tr><tr class="fleet-row fighter"><th colspan="1">Fighter</th><td class="allied before">0</td><td class="allied after">0</td><td class="hostile before">0</td><td class="hostile after">0</td></tr><tr class="fleet-row bomber"><th colspan="1">Bomber</th><td class="allied before">0</td><td class="allied after">0</td><td class="hostile before">0</td><td class="hostile after">0</td></tr><tr class="fleet-row frigate"><th colspan="1">Frigate</th><td class="allied before">0</td><td class="allied after">0</td><td class="hostile before">0</td><td class="hostile after">0</td></tr><tr class="fleet-row destroyer"><th colspan="1">Destroyer</th><td class="allied before">0</td><td class="allied after">0</td><td class="hostile before">0</td><td class="hostile after">0</td></tr><tr class="fleet-row cruiser"><th colspan="1">Cruiser</th><td class="allied before">0</td><td class="allied after">0</td><td class="hostile before">0</td><td class="hostile after">0</td></tr><tr class="fleet-row battleship"><th colspan="1">Battleship</th><td class="allied before">0</td><td class="allied after">0</td><td class="hostile before">0</td><td class="hostile after">0</td></tr><tr class="top-header"><th colspan="5">Resources Lost [1 metal = 0.75 unit | 1 mineral = 1 unit]</th></tr><tr class="resource-row"><th colspan="1">Metal</th><td>0</td><td>0</td><td>0</td><td>0</td></tr><tr class="resource-row"><th colspan="1">Mineral</th><td>0</td><td>0</td><td>0</td><td>0</td></tr><tr class="resource-row"><th colspan="1">Total Lost</th><td colspan="2">0</td><td colspan="2">0</td></tr></table></div>',w.append(F);let k=document.createElement("div");k.classList.add("dgt-eta-separator"),w.append(k)}else{let V=document.createElement("div");V.classList.add("dgt-eta-separator"),w.append(V)}}}let N=0,R=[],D=0,Q=0;w.querySelectorAll(".dgt-fleet, .dgt-empty").forEach(e=>{D<e.offsetHeight&&(D=e.offsetHeight,Q=e.querySelectorAll("tr").length),R.push(e),5==++N&&(R.forEach(e=>{let t=e.querySelectorAll("tr").length;if(0===t&&e.classList.add("dgt-empty-fleet"),t<Q&&t>0)for(let n=0;n<Q-t;n++){let l=document.createElement("tr");l.classList.add("dgt-empty-fleet-row"),l.innerHTML='<td colspan="2" class="padding"></td>',e.querySelector("table tbody").append(l)}e.classList.contains("dgt-empty")?e.style.height=D-8+"px":e.style.height=D-10+"px"}),R=[],N=0,D=0,Q=0)})}let j=document.querySelector(".opacBackground .opacDarkBackground>form");if(j){if(localStorage.getItem("next-scan")){let O=localStorage.getItem("next-scan").split(/\./);for(let U=0;U<O.length;U++)j.querySelector('input[name="coordinate.'+U+'"]').setAttribute("value",O[U])}let G=document.createElement("button"),P=document.createElement("button");G.onmousedown=()=>{localStorage.removeItem("next-scan")},P.onmousedown=()=>{let e=parseInt(j.querySelector('input[name="coordinate.0"]').value),t=parseInt(j.querySelector('input[name="coordinate.1"]').value),n=parseInt(j.querySelector('input[name="coordinate.2"]').value),l=parseInt(j.querySelector('input[name="coordinate.3"]').value);1===e?t<25?n<4?l<12?l++:(l=1,n++):l<12?l++:(l=1,n=1,t++):n<4?l<12?l++:(l=1,n++):l<12?l++:(l=1,n=1,t=1,e++):e>=2&&e<=13?t<6?n<4?l<9?l++:(l=1,n++):l<9?l++:(l=1,n=1,t++):n<4?l<9?l++:(l=1,n++):l<9?l++:(l=1,n=1,t=1,e++):t<2?n<4?l<9?l++:(l=1,n++):l<9?l++:(l=1,n=1,t++):n<4?l<9?l++:(l=1,n++):l<9?l++:(l=1,n=1,t=1,e++),localStorage.setItem("next-scan",e+"."+t+"."+n+"."+l)},G.type="submit",G.innerHTML="Scan",G.id="dgt-scan-button",j.querySelector('input[type="submit"]').parentElement.append(G),P.type="submit",P.innerHTML="Scan & Next",P.id="dgt-scan-next-button",j.querySelector('input[type="submit"]').parentElement.append(P),j.querySelector('input[type="submit"]').parentElement.id="dgt-scan-buttons-wrapper",j.querySelector('input[type="submit"]').remove();let W=detach(j.querySelector(".coordsInput>div:nth-child(3)")),J=detach(j.querySelector(".coordsInput>div:nth-child(1)"));j.querySelector(".coordsInput").prepend(W),j.querySelector(".coordsInput").append(J),j.querySelector(".coordsInput .coords .left:last-child").remove(),j.querySelector(".coordsInput>div:nth-child(2)").innerHTML=j.querySelector('.coordsInput>div:nth-child(2) input[name="coordinate.0"]').outerHTML+":"+j.querySelector('.coordsInput>div:nth-child(2) input[name="coordinate.1"]').outerHTML+":"+j.querySelector('.coordsInput>div:nth-child(2) input[name="coordinate.2"]').outerHTML+":"+j.querySelector('.coordsInput>div:nth-child(2) input[name="coordinate.3"]').outerHTML}}if("rankings"===e[1]&&"players"===(e.length>=4&&e[2])){document.querySelectorAll("span.allied").forEach(e=>{e.parentElement.parentElement.classList.add("allied-bg","rank-row")}),document.querySelectorAll("span.hostile").forEach(e=>{e.parentElement.parentElement.classList.add("hostile-bg","rank-row")}),document.querySelectorAll("span.friendly").forEach(e=>{e.parentElement.parentElement.classList.add("friendly-bg","rank-row")}),document.querySelector(".rankingsList").classList.add("playerRankingsList"),document.querySelector(".rankingsList").nextElementSibling.id="ranking-navigation";let X=document.querySelector(".rankingsList").nextElementSibling.querySelector(".right.opacBackground:first-child a"),Y=document.querySelector(".rankingsList").nextElementSibling.querySelector(".right.opacBackground:last-child a");X&&(X.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><style>svg{fill:#ffffff}</style><path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM294.6 135.1c-4.2-4.5-10.1-7.1-16.3-7.1C266 128 256 138 256 150.3V208H160c-17.7 0-32 14.3-32 32v32c0 17.7 14.3 32 32 32h96v57.7c0 12.3 10 22.3 22.3 22.3c6.2 0 12.1-2.6 16.3-7.1l99.9-107.1c3.5-3.8 5.5-8.7 5.5-13.8s-2-10.1-5.5-13.8L294.6 135.1z"></path></svg>'),Y&&(Y.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><style>svg{fill:#ffffff}</style><path d="M48 256a208 208 0 1 1 416 0A208 208 0 1 1 48 256zm464 0A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM217.4 376.9c4.2 4.5 10.1 7.1 16.3 7.1c12.3 0 22.3-10 22.3-22.3V304h96c17.7 0 32-14.3 32-32V240c0-17.7-14.3-32-32-32H256V150.3c0-12.3-10-22.3-22.3-22.3c-6.2 0-12.1 2.6-16.3 7.1L117.5 242.2c-3.5 3.8-5.5 8.7-5.5 13.8s2 10.1 5.5 13.8l99.9 107.1z"></path></svg>')}if("fleet"===e[1]){if(document.querySelector("#fleetQueue")&&(document.querySelector("#fleetQueue").nextElementSibling.id="queue-actions-left",document.querySelector("#fleetQueue").previousElementSibling.id="queue-actions-right"),document.querySelector("#queue-actions-left .coordsInput form input")){let K=document.querySelector("#queue-actions-left .coordsInput form input").parentElement;K.id="fleet-move-coords",K.previousElementSibling.id="fleet-move-coords-icon",K.nextElementSibling.nextElementSibling.id="fleet-radio-check",K.innerHTML=K.querySelector("input:nth-child(1)").outerHTML+":"+K.querySelector("input:nth-child(2)").outerHTML+":"+K.querySelector("input:nth-child(3)").outerHTML+":"+K.querySelector("input:nth-child(4)").outerHTML}document.querySelector("#queue-actions-left .coordsInput form select")&&(document.querySelector("#queue-actions-left .coordsInput form select").parentElement.id="fleet-move-planet",document.querySelector("#queue-actions-left .coordsInput form select").parentElement.previousElementSibling.id="fleet-move-planet-icon"),document.querySelector('#queue-actions-left .coordsInput form input[name="count"]')&&(document.querySelector('#queue-actions-left .coordsInput form input[name="count"]').parentElement.id="fleet-wait",document.querySelector('#queue-actions-left .coordsInput form input[name="count"]').parentElement.previousElementSibling.id="fleet-wait-icon"),document.querySelectorAll("#queue-actions-right .fleetRight:last-child .entry>.structureImage").forEach(e=>{e.parentElement.classList.add("ship-entry")}),document.querySelectorAll("#queue-actions-right .fleetRight:last-child .entry>:not(.structureImage):first-child").forEach(e=>{e.parentElement.classList.add("resource-entry")});let Z=document.querySelectorAll('#queue-actions-left form input[type="submit"]');Z&&Z.forEach(e=>{let t=document.createElement("button");t.type="submit",t.classList.add("text-button"),t.innerHTML=e.attributes.value.value,e.parentElement.append(t),e.remove()});let ee=document.querySelectorAll("#queue-actions-left .transferRow");if(ee&&ee.forEach(e=>{e.prepend(detach(e.querySelector(".amount").nextElementSibling));let t=e.querySelector('input[type="number"]'),n=document.createElement("div");if(n.classList.add("dgt-max-button"),n.innerHTML='<span><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h50.7L9.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L256 109.3V160c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H160zM576 80a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM448 208a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM400 384a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm48 80a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm128 0a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM272 384a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm48 80a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM144 512a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM576 336a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm-48-80a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/></svg></span>',"unitMap.197"===t.getAttribute("name")||"unitMap.196"===t.getAttribute("name")){let l=document.createElement("div");l.classList.add("dgt-max-button"),l.innerHTML='<span><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M246.6 150.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l96-96c12.5-12.5 32.8-12.5 45.3 0l96 96c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L352 109.3V384c0 35.3 28.7 64 64 64h64c17.7 0 32 14.3 32 32s-14.3 32-32 32H416c-70.7 0-128-57.3-128-128c0-35.3-28.7-64-64-64H109.3l41.4 41.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0l-96-96c-12.5-12.5-12.5-32.8 0-45.3l96-96c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3L109.3 256H224c23.3 0 45.2 6.2 64 17.1V109.3l-41.4 41.4z"/></svg></span>',e.insertBefore(l,e.querySelector(".text")),e.insertBefore(n,l),l.onmousedown=()=>{"unitMap.197"===t.getAttribute("name")?t.value=4e4:"unitMap.196"===t.getAttribute("name")&&(t.value=5e4)}}else e.insertBefore(n,e.querySelector(".text"));n.onmousedown=()=>{let t=e.querySelector('input[type="number"]');t.value=t.getAttribute("max")}}),document.querySelectorAll("#queue-actions-right > .fleetRight").forEach(e=>{e.querySelector(".header")&&(e.id=e.querySelector(".header").textContent.trim().toLowerCase().replace(/\s+/g,"-"))}),document.querySelector("#destroy-fleet")){let et=document.createElement("button");et.type="submit",et.classList.add("text-button"),et.innerHTML="Delete",document.querySelector('#destroy-fleet input[type="submit"]').parentElement.append(et),document.querySelector('#destroy-fleet input[type="submit"]').remove()}if(document.querySelector("#colonise-planet")){let en=document.createElement("button");en.type="submit",en.classList.add("text-button"),en.innerHTML="Colonise",document.querySelector('#colonise-planet input[type="submit"]').parentElement.append(en),document.querySelector('#colonise-planet input[type="submit"]').remove()}if(document.querySelector("#transfer-targets")){let el=document.createElement("button");el.type="submit",el.classList.add("text-button"),el.innerHTML="Create",document.querySelector('#transfer-targets input[type="submit"]').parentElement.append(el),document.querySelector('#transfer-targets input[type="submit"]').remove()}if(document.querySelector(".nextPrevFleet a")){document.querySelectorAll(".nextPrevFleet a").forEach(e=>{"\xab"===e.textContent.trim()&&(e.id="fleet-left-nav",e.parentElement.classList.add("delete-marker"),e.parentElement.insertAdjacentElement("afterend",detach(e)),e.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#ffffff}</style><path d="M48 256a208 208 0 1 1 416 0A208 208 0 1 1 48 256zm464 0A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM217.4 376.9c4.2 4.5 10.1 7.1 16.3 7.1c12.3 0 22.3-10 22.3-22.3V304h96c17.7 0 32-14.3 32-32V240c0-17.7-14.3-32-32-32H256V150.3c0-12.3-10-22.3-22.3-22.3c-6.2 0-12.1 2.6-16.3 7.1L117.5 242.2c-3.5 3.8-5.5 8.7-5.5 13.8s2 10.1 5.5 13.8l99.9 107.1z"/></svg>',document.querySelector(".delete-marker").remove()),"\xbb"===e.textContent.trim()&&(e.id="fleet-right-nav",e.parentElement.classList.add("delete-marker"),e.parentElement.insertAdjacentElement("afterend",detach(e)),e.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#ffffff}</style><path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM294.6 135.1c-4.2-4.5-10.1-7.1-16.3-7.1C266 128 256 138 256 150.3V208H160c-17.7 0-32 14.3-32 32v32c0 17.7 14.3 32 32 32h96v57.7c0 12.3 10 22.3 22.3 22.3c6.2 0 12.1-2.6 16.3-7.1l99.9-107.1c3.5-3.8 5.5-8.7 5.5-13.8s-2-10.1-5.5-13.8L294.6 135.1z"></path></svg>',document.querySelector(".delete-marker").remove())}),document.querySelector(".header.border.pageTitle a").parentElement.innerHTML=document.querySelector(".header.border.pageTitle a").parentElement.textContent.trim();let er=document.createElement("span");er.id="dgt-fleet-funny-span",er.innerHTML="If you fuck up, you do 20 push ups!",document.querySelector(".header.border.pageTitle").append(er)}if(document.querySelector("#fleetHeader")){let ea=document.querySelector("#fleetHeader");ea.nextElementSibling.id="target-transfer",ea.nextElementSibling.nextElementSibling.id="source-transfer";let es=document.querySelector('#target-transfer input[type="submit"]'),eo=document.querySelector('#source-transfer input[type="submit"]');if(es){let ei=document.createElement("button");ei.type="submit",ei.classList.add("text-button"),ei.innerHTML="Transfer",es.parentElement.append(ei),es.remove()}if(eo){let ec=document.createElement("button");ec.type="submit",ec.classList.add("text-button"),ec.innerHTML="Transfer",eo.parentElement.append(ec),eo.remove()}let e0=ea.nextElementSibling.nextElementSibling.querySelectorAll(".transferRow");e0&&e0.forEach(e=>{let t=detach(e.querySelector(".amount").nextElementSibling);if(null!=t){e.prepend(t);let n=e.querySelector('input[type="number"]');if(n){let l=document.createElement("div");if(l.classList.add("dgt-max-button"),l.innerHTML='<span><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h50.7L9.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L256 109.3V160c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H160zM576 80a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM448 208a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM400 384a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm48 80a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm128 0a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM272 384a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm48 80a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM144 512a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM576 336a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm-48-80a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/></svg></span>',"unitMap.197"===n.getAttribute("name")||"unitMap.196"===n.getAttribute("name")){let r=document.createElement("div");r.classList.add("dgt-max-button"),r.innerHTML='<span><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M246.6 150.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l96-96c12.5-12.5 32.8-12.5 45.3 0l96 96c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L352 109.3V384c0 35.3 28.7 64 64 64h64c17.7 0 32 14.3 32 32s-14.3 32-32 32H416c-70.7 0-128-57.3-128-128c0-35.3-28.7-64-64-64H109.3l41.4 41.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0l-96-96c-12.5-12.5-12.5-32.8 0-45.3l96-96c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3L109.3 256H224c23.3 0 45.2 6.2 64 17.1V109.3l-41.4 41.4z"/></svg></span>',e.insertBefore(r,e.querySelector(".text")),e.insertBefore(l,r),r.onmousedown=()=>{"unitMap.197"===n.getAttribute("name")?n.value=4e4:"unitMap.196"===n.getAttribute("name")&&(n.value=5e4)}}else e.insertBefore(l,e.querySelector(".text"));l.onmousedown=()=>{e.querySelector('input[type="number"]').value=999999999}}}}),(e0=ea.nextElementSibling.querySelectorAll(".transferRow"))&&e0.forEach(e=>{let t=detach(e.querySelector(".amount"));if(null!=t){e.prepend(t);let n=e.querySelector('input[type="number"]');if(n){let l=document.createElement("div");if(l.classList.add("dgt-max-button"),l.innerHTML='<span><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h50.7L9.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L256 109.3V160c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H160zM576 80a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM448 208a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM400 384a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm48 80a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm128 0a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM272 384a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm48 80a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM144 512a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM576 336a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm-48-80a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/></svg></span>',"unitMap.197"===n.getAttribute("name")||"unitMap.196"===n.getAttribute("name")){let r=document.createElement("div");r.classList.add("dgt-max-button"),r.innerHTML='<span><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M246.6 150.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l96-96c12.5-12.5 32.8-12.5 45.3 0l96 96c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L352 109.3V384c0 35.3 28.7 64 64 64h64c17.7 0 32 14.3 32 32s-14.3 32-32 32H416c-70.7 0-128-57.3-128-128c0-35.3-28.7-64-64-64H109.3l41.4 41.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0l-96-96c-12.5-12.5-12.5-32.8 0-45.3l96-96c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3L109.3 256H224c23.3 0 45.2 6.2 64 17.1V109.3l-41.4 41.4z"/></svg></span>',e.prepend(r,e.querySelector(".text")),e.insertBefore(l,r),r.onmousedown=()=>{"unitMap.197"===n.getAttribute("name")?n.value=4e4:"unitMap.196"===n.getAttribute("name")&&(n.value=5e4)}}else e.prepend(l,e.querySelector(".text"));l.onmousedown=()=>{e.querySelector('input[type="number"]').value=999999999}}}})}}if("research"===e[1]){document.querySelector('img[src="/images/icons/research.png"]').parentElement.parentElement.id="dgt-research-description",document.querySelector('img[src="/images/icons/research.png"]').parentElement.remove(),document.querySelector("form").id="dgt-research-form",document.querySelectorAll(".researchTitle").forEach(e=>{e.parentElement.classList.add("dgt-research-padding")});let e$=document.querySelector("#dgt-research-description > div");e$.innerHTML=e$.innerHTML.replace(e$.innerHTML.match(/\d+/g),'<span class="dgt-research-points">'+e$.innerHTML.match(/\d+/g)+"</span>"),document.querySelectorAll(".researchTitle > div").forEach(e=>{e.textContent.trim().toLowerCase().indexOf("planet limit")>-1&&e.parentElement.classList.add("planet-limit")})}}
