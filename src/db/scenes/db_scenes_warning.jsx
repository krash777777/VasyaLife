import Images from '../db_img.jsx';
import templateOptions from '../db_templates.jsx';
import ScenesGeneral from '../db_scenesGeneral.jsx';
import locations from '../db_locations.jsx';

import playerOptions from '../db_playerOptions.jsx';
import playerOptionsModifiers from '../db_playerOptionsModifiers.jsx';
import dbItems from '../db_items.jsx';

const warning_lifeEnergyUnder50 = {
    block00:{
        type:'conversation',
        animationBlock:'',
        animationNPC:'',

        npc:'',
        npcImage:'',
        img_background:Images.backgrounds.death,
        iteration_text:[
            'Я вижу что твои силы на исходе ... ',
            'Скоро мы встретимся ...',
        ],
        change_states:[],
        transitions:['end'],
    },
}

const warning_lifeEnergyUnder10 = {
    block00:{
        type:'conversation',
        animationBlock:'',
        animationNPC:'',

        npc:'',
        npcImage:'',
        img_background:Images.backgrounds.death,
        iteration_text:[
            'Я уже рядом ... ',
        ],
        change_states:[],
        transitions:['end'],
    },
}

export  {warning_lifeEnergyUnder50, warning_lifeEnergyUnder10};