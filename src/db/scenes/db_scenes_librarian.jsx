import Images from '../db_img.jsx';
import templateOptions from '../db_templates.jsx';
import ScenesGeneral from '../db_scenesGeneral.jsx';
import locations from '../db_locations.jsx';

import NpcStyles from '../db_npcImageStyle.jsx';
import Npc from '../db_npc.jsx';
import playerOptions from '../db_playerOptions.jsx';
import items from '../db_items.jsx';

const librarian = {
    block00:{
        type:'conversation',

        npc:Npc.librarian,
        npcStyle:NpcStyles.librarian.blueSkirt,

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

        npc:Npc.librarian,
        npcStyle:NpcStyles.librarian.blueSkirt,

        npcImage:'react',
        img_background:'',
        transitions:[
            {text:'Нет ... ничего (уйти)',address:'end', condition:[]},
        ],
        change_states:[],
    },

    //===============================================================================

}

export default librarian;