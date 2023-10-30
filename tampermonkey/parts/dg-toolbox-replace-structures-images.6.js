function replaceStructuresImages() {
    document.querySelectorAll('img').forEach((img) => {
        if (img.src.indexOf('/destroy_') > -1) {
            img.src = img.src.split('destroy_')[0] + img.src.split('destroy_')[1];
            if (img.src.startsWith('https://andromeda.darkgalaxy.com/images')) {
                img.src = img.src.split('https://andromeda.darkgalaxy.com')[1];
            }
        }
    });

    replaceImgWithImg('/images/units/main/structures/space_dock.jpg', 'https://i.imgur.com/3BX0XV9.jpg');
    replaceImgWithImg('/images/units/main/structures/heavy_weapons_factory.jpg', 'https://i.imgur.com/pdC7erL.jpg');
    replaceImgWithImg('/images/units/main/structures/army_barracks.jpg', 'https://i.imgur.com/2nbZdnp.jpg');
    replaceImgWithImg('/images/units/main/structures/holo_generator.jpg', 'https://i.imgur.com/SEYgMQU.jpg');
    replaceImgWithImg('/images/units/main/structures/strip_mineral_extractor.jpg', 'https://i.imgur.com/j8jo1Id.jpg');
    replaceImgWithImg('/images/units/main/structures/hydroponics_dome.jpg', 'https://i.imgur.com/MhiHqoI.jpg');
    replaceImgWithImg('/images/units/main/structures/hospital.jpg', 'https://i.imgur.com/t3uqYcg.jpg');
    replaceImgWithImg('/images/units/main/structures/solar_station.jpg', 'https://i.imgur.com/SX2lfIG.jpg');
    replaceImgWithImg('/images/units/main/structures/land_reclamation.jpg', 'https://i.imgur.com/umzwcvj.jpg');
    replaceImgWithImg('/images/units/main/structures/orbital_clearing.jpg', 'https://i.imgur.com/Lq1i6Oz.jpg');
    replaceImgWithImg('/images/units/main/structures/resource_converter.jpg', 'https://i.imgur.com/r4PAKnJ.jpg');
    replaceImgWithImg('/images/units/main/structures/core_metal_mine.jpg', 'https://i.imgur.com/WqOUM6c.jpg');
    replaceImgWithImg('/images/units/main/structures/core_mineral_extractor.jpg', 'https://i.imgur.com/tPhBNPR.jpg');
    replaceImgWithImg('/images/units/main/structures/hydroponics_lab.jpg', 'https://i.imgur.com/DOjq4by.jpg');
    replaceImgWithImg('/images/units/main/structures/solar_array.jpg', 'https://i.imgur.com/oDQ6KIt.jpg');
    replaceImgWithImg('/images/units/main/structures/living_quarters.jpg', 'https://i.imgur.com/ECCUWvc.jpg');
    replaceImgWithImg('/images/units/main/structures/habitat.jpg', 'https://i.imgur.com/c8bVHEf.jpg');
    replaceImgWithImg('/images/units/main/structures/metal_mine.jpg', 'https://i.imgur.com/EOnT1wH.jpg');
    replaceImgWithImg('/images/units/main/structures/mineral_extractor.jpg', 'https://i.imgur.com/kMCm4PA.jpg');
    replaceImgWithImg('/images/units/main/structures/farm.jpg', 'https://i.imgur.com/C2yhmEd.jpg');
    replaceImgWithImg('/images/units/main/structures/solar_generator.jpg', 'https://i.imgur.com/4YyEeEg.jpg');
    replaceImgWithImg('/images/units/main/structures/outpost.jpg', 'https://i.imgur.com/LbKgpAO.jpg');
    replaceImgWithImg('/images/units/main/structures/colony.jpg', 'https://i.imgur.com/aZdh1BF.jpg');
    replaceImgWithImg('/images/units/main/structures/metropolis.jpg', 'https://i.imgur.com/aTLCkJ2.jpg');
    replaceImgWithImg('/images/units/main/structures/launch_site.jpg', 'https://i.imgur.com/Tbwjl6V.jpg');
    replaceImgWithImg('/images/units/main/structures/ship_yard.jpg', 'https://i.imgur.com/yQNndfh.jpg');
    replaceImgWithImg('/images/units/main/structures/comms_satellite.jpg', 'https://i.imgur.com/f4IDtJo.jpg');
    replaceImgWithImg('/images/units/main/structures/space_tether.jpg', 'https://i.imgur.com/IA2Ax8v.jpg');
    replaceImgWithImg('/images/units/main/structures/hyperspace_beacon.jpg', 'https://i.imgur.com/zQb9Yp2.jpg');
    replaceImgWithImg('/images/units/main/structures/jump_gate.jpg', 'https://i.imgur.com/s6r3eFg.jpg');
    replaceImgWithImg('/images/units/main/structures/light_weapons_factory.jpg', 'https://i.imgur.com/bJkLYHb.jpg');
    replaceImgWithImg('/images/units/main/structures/strip_metal_mine.jpg', 'https://i.imgur.com/FnnxfAS.jpg');
    replaceImgWithImg('/images/units/main/structures/metal_refinery.jpg', 'https://i.imgur.com/0dVi9nd.jpg');
    replaceImgWithImg('/images/units/main/structures/mineral_processor.jpg', 'https://i.imgur.com/lXo4K1D.jpg');
    replaceImgWithImg('/images/units/main/structures/food_purifier.jpg', 'https://i.imgur.com/zlYpjML.jpg');
    replaceImgWithImg('/images/units/main/structures/energy_booster.jpg', 'https://i.imgur.com/sn1USLW.jpg');
    replaceImgWithImg('/images/units/main/structures/medical_centre.jpg', 'https://i.imgur.com/0c446lj.jpg');
    replaceImgWithImg('/images/units/main/structures/leisure_centre.jpg', 'https://i.imgur.com/bJkLYHb.jpg');


    replaceImgWithImg('/images/units/research/strip_metal_mine.png', 'https://i.imgur.com/FnnxfAS.jpg');
    replaceImgWithImg('/images/units/research/metal_refinery.png', 'https://i.imgur.com/0dVi9nd.jpg');
    replaceImgWithImg('/images/units/research/mineral_processor.png', 'https://i.imgur.com/lXo4K1D.jpg');
    replaceImgWithImg('/images/units/research/strip_mineral_extractor.png', 'https://i.imgur.com/j8jo1Id.jpg');
    replaceImgWithImg('/images/units/research/food_purifier.png', 'https://i.imgur.com/zlYpjML.jpg');
    replaceImgWithImg('/images/units/research/hydroponics_dome.png', 'https://i.imgur.com/MhiHqoI.jpg');
    replaceImgWithImg('/images/units/research/energy_booster.png', 'https://i.imgur.com/sn1USLW.jpg');
    replaceImgWithImg('/images/units/research/solar_station.png', 'https://i.imgur.com/SX2lfIG.jpg');
    replaceImgWithImg('/images/units/research/space_tether.png', 'https://i.imgur.com/IA2Ax8v.jpg');
    replaceImgWithImg('/images/units/research/hyperspace_beacon.png', 'https://i.imgur.com/zQb9Yp2.jpg');
    replaceImgWithImg('/images/units/research/jump_gate.png', 'https://i.imgur.com/s6r3eFg.jpg');
}
