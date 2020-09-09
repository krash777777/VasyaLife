import Images from '../db_img.jsx';
import templateOptions from '../db_templates.jsx';
import ScenesGeneral from '../db_scenesGeneral.jsx';
import locations from '../db_locations.jsx';
import quests from '../db_quests.jsx';

import NpcStyles from '../db_npcImageStyle.jsx';
import Npc from '../db_npc.jsx';
import playerOptions from '../db_playerOptions.jsx';
import items from '../db_items.jsx';

const nurse = {
    block00:{
        type:'conversation',

        npc:Npc.nurse,
        npcStyle:NpcStyles.nurse.jeansShorts,

        npcImage:'react',

        img_background:'',
        iteration_text:[
            'react',
        ],
        change_states:[],
        transitions:['listOfQuestions']
    },

    //transitions===============================================================================

    listOfQuestions:{
        type:'transitions',

        npc:Npc.nurse,
        npcStyle:NpcStyles.nurse.jeansShorts,
        npcImage:'react',


        img_background:'',
        transitions:[
            // {text:'Привет. Что это за место?',address:'acquaintance01', condition:[{type:'quest',value:quests.mainLine.acquaintanceNurse.id}]},
            {text:'Ничего ... (уйти)',address:'end', condition:[]},
        ],
        change_states:[],
    },

    //==========================================================================================


}

export default nurse;