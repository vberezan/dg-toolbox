// -- replace classic planet images with new ones
// -- this is a Vector Art theme and all images are generated by AI
function replacePlanetsImages() {
    const images = [
        'https://i.imgur.com/zP2jP1j.jpg', 'https://i.imgur.com/Ta0mA5l.jpg', 'https://i.imgur.com/UG2l7hm.jpg', 'https://i.imgur.com/lnqSOFY.jpg', 'https://i.imgur.com/YpTzksL.jpg',
        'https://i.imgur.com/TgsaGUe.jpg', 'https://i.imgur.com/GbwHE8R.jpg', 'https://i.imgur.com/kxNA32P.jpg', 'https://i.imgur.com/A38JDzf.jpg', 'https://i.imgur.com/fU6Wnxv.jpg',
        'https://i.imgur.com/l0yNJSi.jpg', 'https://i.imgur.com/5R9QGYL.jpg', 'https://i.imgur.com/IXIFXSQ.jpg', 'https://i.imgur.com/Yw63Blf.jpg', 'https://i.imgur.com/GNkONJq.jpg',
        'https://i.imgur.com/CSnnXrO.jpg', 'https://i.imgur.com/zXOp9DU.jpg', 'https://i.imgur.com/JTBKgLo.jpg', 'https://i.imgur.com/E3DUeRH.jpg', 'https://i.imgur.com/UPXIEZT.jpg',
        'https://i.imgur.com/rtcXEeR.jpg', 'https://i.imgur.com/25rtC4Z.jpg', 'https://i.imgur.com/I238Okl.jpg', 'https://i.imgur.com/AnQqa5x.jpg', 'https://i.imgur.com/i6zF1Oe.jpg',
        'https://i.imgur.com/VNxxutF.jpg', 'https://i.imgur.com/XE9YDrW.jpg', 'https://i.imgur.com/0zjZlvn.jpg', 'https://i.imgur.com/UclUsQR.jpg', 'https://i.imgur.com/Fd6vZue.jpg',
        'https://i.imgur.com/7Ss7lKJ.jpg', 'https://i.imgur.com/muCONAF.jpg', 'https://i.imgur.com/MrWuZCe.jpg', 'https://i.imgur.com/y8cBwJ5.jpg', 'https://i.imgur.com/obd7K6F.jpg',
        'https://i.imgur.com/RVoxgRN.jpg', 'https://i.imgur.com/XkBRRwB.jpg', 'https://i.imgur.com/UF3jDVS.jpg', 'https://i.imgur.com/KokDWVB.jpg', 'https://i.imgur.com/ZIKWScp.jpg',
        'https://i.imgur.com/MH3ZKAd.jpg', 'https://i.imgur.com/yHJQTl7.jpg', 'https://i.imgur.com/f5Tc2PQ.jpg', 'https://i.imgur.com/M88veIV.jpg', 'https://i.imgur.com/KzhTE4I.jpg',
        'https://i.imgur.com/gpL7pE2.jpg', 'https://i.imgur.com/6i6qRWO.jpg', 'https://i.imgur.com/FI4PGZj.jpg', 'https://i.imgur.com/9dl3jpH.jpg', 'https://i.imgur.com/15uhk4O.jpg',
        'https://i.imgur.com/0dB3jHN.jpg'
    ];

    const imgIdPattern = /\/(\d+)\./;
    const replaceImage = function (img) {
        const [, id] = img.src.match(imgIdPattern);
        img.src = images[id];
    };

    if (location.href.match(/planet\/[0-9]+/)) { // on single planet overview use big image
        Array.from(document.querySelectorAll('#planetImage > img')).forEach((img) => replaceImage(img));
    } else { // small images for anything else (planet list, nav other planets, nav own planets)
        Array.from(document.querySelectorAll('.planetImage img, .planets > img, .planets > a > img')).forEach((img) => replaceImage(img, 'icon'));
    }
}