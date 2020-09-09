import Images from '../db_img.jsx';
import templateOptions from '../db_templates.jsx';
import ScenesGeneral from '../db_scenesGeneral.jsx';
import locations from '../db_locations.jsx';

import playerOptions from '../db_playerOptions.jsx';
import playerOptionsModifiers from '../db_playerOptionsModifiers.jsx';
import dbItems from '../db_items.jsx';

const sleep = {
    block00:{
        type:'conversation',
        animationBlock:'',
        animationNPC:'',

        npc:'',
        npcImage:'',
        img_background:Images.instantActions.sleep1,
        iteration_text:[
            'Сон - это прекрасно!',
        ],
        change_states:[],
        transitions:['wakeUp'],
    },
    wakeUp:{
        type:'conversation',
        animationBlock:'',
        animationNPC:'',

        npc:'',
        npcImage:'',
        img_background:Images.instantActions.sleep2,
        iteration_text:[
            'Восстанавливаются жизненные и моральные силы ...',
        ],
        change_states:[
            {
                changeType:'changeOptions',
                changeValue:[
                    {option:playerOptions.lifeEnergy, type:'increase', limit:700, value:250},
                    {option:playerOptions.morale, type:'increase', limit:50, value:25}
                ]
            },
            {
                changeType:'changeTime',
                changeValue:480
            },
        ],
        transitions:['end'],
    },
}

const doNotWontSleep = {
    block00:{
        type:'conversation',
        animationBlock:'',
        animationNPC:'',

        npc:'',
        npcImage:'',
        img_background:Images.instantActions.sleep2,
        iteration_text:[
            'Я не хочу спать!',
        ],
        change_states:[],
        transitions:['end'],
    },
}

export  {sleep, doNotWontSleep};