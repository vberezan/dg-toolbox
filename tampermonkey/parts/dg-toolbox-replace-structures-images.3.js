function replaceStructuresImages() {
    document.querySelectorAll('img').forEach((img) => {
        if (img.src.indexOf('/destroy_') > -1) {
            img.src = img.src.split('destroy_')[0] + img.src.split('destroy_')[1];
            if (img.src.startsWith('https://andromeda.darkgalaxy.com/images')) {
                img.src = img.src.split('https://andromeda.darkgalaxy.com')[1];
            }
        }
    });

    replaceImgWithImg('/images/units/main/structures/space_dock.jpg', 'https://i.imgur.com/4Dc0tlN.png');
    replaceImgWithImg('/images/units/main/structures/heavy_weapons_factory.jpg', 'https://i.imgur.com/1lXd8Ml.png');
    replaceImgWithImg('/images/units/main/structures/army_barracks.jpg', 'https://i.imgur.com/mclicVV.png');
    replaceImgWithImg('/images/units/main/structures/holo_generator.jpg', 'https://i.imgur.com/SUWRz9t.png');
    replaceImgWithImg('/images/units/main/structures/strip_mineral_extractor.jpg', 'https://i.imgur.com/HSWWkLb.png');
    replaceImgWithImg('/images/units/main/structures/hydroponics_dome.jpg', 'https://i.imgur.com/bGrQcQd.png');
    replaceImgWithImg('/images/units/main/structures/hospital.jpg', 'https://i.imgur.com/29oY3mI.png');
    replaceImgWithImg('/images/units/main/structures/solar_station.jpg', 'https://i.imgur.com/vv5SVJV.png');
    replaceImgWithImg('/images/units/main/structures/land_reclamation.jpg', 'https://i.imgur.com/KqZONGK.png');
    replaceImgWithImg('/images/units/main/structures/orbital_clearing.jpg', 'https://i.imgur.com/EH8plwD.png');
    replaceImgWithImg('/images/units/main/structures/resource_converter.jpg', 'https://i.imgur.com/3U8WNb3.png');
    replaceImgWithImg('/images/units/main/structures/core_metal_mine.jpg', 'https://i.imgur.com/5v8h5xR.png');
    replaceImgWithImg('/images/units/main/structures/core_mineral_extractor.jpg', 'https://i.imgur.com/rJcgv63.png');
    replaceImgWithImg('/images/units/main/structures/hydroponics_lab.jpg', 'https://i.imgur.com/RfoCf4h.png');
    replaceImgWithImg('/images/units/main/structures/solar_array.jpg', 'https://i.imgur.com/pa5JCq3.png');
    replaceImgWithImg('/images/units/main/structures/living_quarters.jpg', 'https://i.imgur.com/S34b5Dw.png');
    replaceImgWithImg('/images/units/main/structures/habitat.jpg', 'https://i.imgur.com/0PtQ2iK.png');
    replaceImgWithImg('/images/units/main/structures/metal_mine.jpg', 'https://i.imgur.com/YWOnBYH.png');
    replaceImgWithImg('/images/units/main/structures/mineral_extractor.jpg', 'https://i.imgur.com/xkcWewn.png');
    replaceImgWithImg('/images/units/main/structures/farm.jpg', 'https://i.imgur.com/sbVUZRb.png');
    replaceImgWithImg('/images/units/main/structures/solar_generator.jpg', 'https://i.imgur.com/kIi9I8Y.png');
    replaceImgWithImg('/images/units/main/structures/outpost.jpg', 'https://i.imgur.com/hjyaTDD.png');
    replaceImgWithImg('/images/units/main/structures/colony.jpg', 'https://i.imgur.com/eI5ZICc.png');
    replaceImgWithImg('/images/units/main/structures/metropolis.jpg', 'https://i.imgur.com/BWoqd53.png');
    replaceImgWithImg('/images/units/main/structures/launch_site.jpg', 'https://i.imgur.com/4nHRCGF.png');
    replaceImgWithImg('/images/units/main/structures/ship_yard.jpg', 'https://i.imgur.com/QDhsgVf.png');
    replaceImgWithImg('/images/units/main/structures/comms_satellite.jpg', 'https://i.imgur.com/EX41Fxz.png');
    replaceImgWithImg('/images/units/main/structures/space_tether.jpg', 'https://i.imgur.com/SqMiWa8.png');
    replaceImgWithImg('/images/units/main/structures/hyperspace_beacon.jpg', 'https://i.imgur.com/7yqHw2p.png');
    replaceImgWithImg('/images/units/main/structures/jump_gate.jpg', 'https://i.imgur.com/x73pdmi.png');
    replaceImgWithImg('/images/units/main/structures/light_weapons_factory.jpg', 'https://i.imgur.com/pxg0NVI.png');
    replaceImgWithImg('/images/units/main/structures/strip_metal_mine.jpg', 'https://i.imgur.com/0RkhL2R.png');
    replaceImgWithImg('/images/units/main/structures/metal_refinery.jpg', 'https://i.imgur.com/DjM9Zng.png');
    replaceImgWithImg('/images/units/main/structures/mineral_processor.jpg', 'https://i.imgur.com/galxyUi.png');
    replaceImgWithImg('/images/units/main/structures/food_purifier.jpg', 'https://i.imgur.com/fpXb47Z.png');
    replaceImgWithImg('/images/units/main/structures/energy_booster.jpg', 'https://i.imgur.com/3wjvwgM.png');
    replaceImgWithImg('/images/units/main/structures/medical_centre.jpg', 'https://i.imgur.com/kje84Fs.png');
    replaceImgWithImg('/images/units/main/structures/leisure_centre.jpg', 'https://i.imgur.com/ZxUONnB.png');
}
