import ScenesGeneral from './db_scenesGeneral.jsx';
import templates from './db_templates.jsx';
import locations from './db_locations.jsx';
import items from './db_items.jsx';
import playerOptions from './db_playerOptions.jsx';
import playerOptionsModifiers from './db_playerOptionsModifiers.jsx';
import clothing from './db_clothing.jsx';
import clothingSets from './db_clothingSets.jsx';
import npc from './db_npc.jsx';

import Images from './db_img.jsx';

const defaultValues = {
    HomePage:{
        General:{
            tpl:templates.homePage,
            action:[],
            location:[],
            dateAndTime:[],
        },
        Player:[],
        Npc:[],
        GameMarks:[]
    },
    GameDefaultStates:{
        General:{
            tpl:templates.scene,
            action:ScenesGeneral.intro,
            location:locations.hall,
            npcInLocation:[],
            dateAndTime:{daysCounter:1, dayOfTheWeek:0, time:570},
        },
        Player:{
            //характеристика - это сумма всех факторов (параметр + действие модификатора + действие надетой одежды)
            characteristics:[
                {option:playerOptions.lifeEnergy, optionValue:0, modifierValue:0, clothingValue:0, totalValue:0, style:'', animation:''},
                {option:playerOptions.morale, optionValue:0, modifierValue:0, clothingValue:0, totalValue:0, style:'', animation:''},
                {option:playerOptions.sexEnergy, optionValue:0, modifierValue:0, clothingValue:0, totalValue:0, style:'', animation:''},
                {option:playerOptions.concentration, optionValue:0, modifierValue:0, clothingValue:0, totalValue:0, style:'', animation:''},
                {option:playerOptions.mana, optionValue:0, modifierValue:0, clothingValue:0, totalValue:0, style:'', animation:''},
                {option:playerOptions.money, optionValue:0, modifierValue:0, clothingValue:0, totalValue:0, style:'', animation:''},
            ],
            //опция (или по другому "параметр") - это "чистое" значение ГГ, без модификаторов
            options:[
                {option:playerOptions.lifeEnergy,value:75},
                {option:playerOptions.morale,value:0},
                {option:playerOptions.sexEnergy,value:0},
                {option:playerOptions.concentration,value:0},
                {option:playerOptions.mana,value:0},
                {option:playerOptions.money,value:225},
            ],
            modifiers:[
                // {modifier:playerOptionsModifiers.exhaustion, actionTime:999999999}
            ],
            skills:[],
            clothingOnTheBody:[clothing.blueShirt,clothing.blueJeans,],
            clothingSet:clothingSets.blueSetFull,
            playerStore:{
                items:[
                    {item:items.food.apple, quantity:20},
                    {item:items.food.egg, quantity:20},
                    {item:items.food.flour, quantity:20},
                    {item:items.food.sugar, quantity:20},
                ],
                clothing:[

                ]
            },
        },
        WorldSettings:{
            worldItemStorage: {
                bedroom:[
                    {item:items.sexToys.dildoRealistic, quantity:1},
                ],
                kitchen:[
                    {item:items.food.cake, quantity:4},
                    {item:items.food.flour, quantity:20},
                ],
                hall:[

                ],
                kitchenCraft:{
                    slot1:[], slot2:[], slot3:[], slot4:[],
                },
            },
        },
        Npc:[
            {npc:npc.mom, relations:3, corruption:1},
            {npc:npc.principal, relations:0, corruption:0},
            {npc:npc.nurse, relations:0, corruption:0},
            {npc:npc.librarian, relations:0, corruption:0}
        ],
        GameMarks:{
            quests:[],
        }
    }
}

export default defaultValues;