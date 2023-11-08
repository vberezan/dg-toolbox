function replaceIconsWithImages() {
    replaceImgWithImg('/images/units/small/soldier.png', 'https://i.imgur.com/0varSGq.jpg');
    replaceImgWithImg('/images/units/small/soldier.gif', 'https://i.imgur.com/0varSGq.jpg');
    replaceImgWithImg('/images/units/small/worker.png', 'https://i.imgur.com/rpxIheY.jpg');
    replaceImgWithImg('/images/units/small/worker.gif', 'https://i.imgur.com/rpxIheY.jpg');
    replaceImgWithImg('/images/units/small/food.gif', 'https://i.imgur.com/bhfaalb.jpg');
    replaceImgWithImg('/images/units/small/metal.gif', 'https://i.imgur.com/V9Yv4MJ.jpg');
    replaceImgWithImg('/images/units/small/mineral.gif', 'https://i.imgur.com/OdLTSDl.jpg');
    replaceImgWithImg('/images/units/small/energy.gif', 'https://i.imgur.com/IkkDId3.jpg');
    replaceImgWithImg('/images/units/small/ground.gif', 'https://i.imgur.com/cSsBIwv.jpg');
    replaceImgWithImg('/images/units/small/orbit.gif', 'https://i.imgur.com/7wtJcXw.jpg');
    replaceImgWithImg('/images/units/small/coords.gif', 'https://i.imgur.com/HcC4l22.png');

    replaceImgWithImg('/images/icons/news_small.png', 'https://i.imgur.com/58ScC4b.png');
    replaceImgWithImg('/images/icons/news.png', 'https://i.imgur.com/58ScC4b.png');
    replaceImgWithImg('/images/icons/mail.png', 'https://i.imgur.com/QVXJuKf.png');
    replaceImgWithImg('/images/icons/logout.png', 'https://i.imgur.com/WKHlnKK.png');

    replaceImgWithImg('/images/units/research/mineral_research.png', 'https://i.imgur.com/OdLTSDl.jpg');
    replaceImgWithImg('/images/units/research/metal_research.png', 'https://i.imgur.com/V9Yv4MJ.jpg');
    replaceImgWithImg('/images/units/research/attack.png', 'https://i.imgur.com/PnRMzDy.jpg');
    replaceImgWithImg('/images/units/research/armour.png', 'https://i.imgur.com/Ee9UsAl.jpg');
    replaceImgWithImg('/images/units/research/planet_limit.png', 'https://i.imgur.com/48zh1A4.jpg');
    replaceImgWithImg('/images/units/research/queue.png', 'https://i.imgur.com/xtzqCN0.jpg');

    replaceImgWithImg('/images/units/small/planets.png', 'https://i.imgur.com/Biq82rs.png');

    replaceImgWithImgByQuery('#fleetQueue .header img', 'https://i.imgur.com/4ClCtQl.png');
    replaceImgWithImgByQuery('#queue-actions-left .fleetLeftInner .header img', 'https://i.imgur.com/HcC4l22.png');
    replaceImgWithImgByQuery('#queue-actions-left form .header img', 'https://i.imgur.com/3r7Evsy.png');

    document.querySelectorAll('#queue-actions-right > .fleetRight').forEach((section) => {
        if (section.querySelector('.header')) {
            section.id = section.querySelector('.header').textContent.trim().toLowerCase().replace(/\s+/g, '-');
        }
    });

    replaceImgWithImgByQuery('#current-action .header img', 'https://i.imgur.com/4ClCtQl.png');
    replaceImgWithImgByQuery('#transfer-targets .header img', 'https://i.imgur.com/3r7Evsy.png');
    replaceImgWithImgByQuery('#destroy-fleet .header img', 'https://i.imgur.com/UQ0X6vH.png');
    replaceImgWithImgByQuery('#fleet-composition .header img', 'https://i.imgur.com/5Byl54Z.png');

    replaceImgWithImgByQuery('a>img[src="/images/buttons/production.png"]', 'https://i.imgur.com/LiZFpvY.png');
    replaceImgWithImgByQuery('div>img[src="/images/buttons/production.png"]', 'https://i.imgur.com/Es3futz.png');
    replaceImgWithImgByQuery('div>img[src="/images/buttons/training.png"]', 'https://i.imgur.com/adkgAMo.png');
    replaceImgWithImgByQuery('a>img[src="/images/buttons/training.png"]', 'https://i.imgur.com/wAv07G9.png');
    replaceImgWithImgByQuery('div>img[src="/images/buttons/converter.png"]', 'https://i.imgur.com/vAPOsV9.png');
    replaceImgWithImgByQuery('a>img[src="/images/buttons/converter.png"]', 'https://i.imgur.com/hytbrU9.png');
    replaceImgWithImgByQuery('.header img[src="/images/buttons/comms.png"]', 'https://i.imgur.com/GFbCtz9.png');
    replaceImgWithImgByQuery('div>img[src="/images/buttons/comms.png"]', 'https://i.imgur.com/ZeghkIw.png');
    replaceImgWithImgByQuery('a>img[src="/images/buttons/comms.png"]', 'https://i.imgur.com/GFbCtz9.png');
    replaceImgWithImgByQuery('a>img[src="/images/buttons/construction.png"]', 'https://i.imgur.com/1Ph3T54.png');
    replaceImgWithImgByQuery('div>img[src="/images/buttons/construction.png"]', 'https://i.imgur.com/5iLvLxv.png');
    replaceImgWithImgByQuery('div>img[src="/images/buttons/construct.png"]', 'https://i.imgur.com/5iLvLxv.png');

}
