import Images from '../db_img.jsx';
import templateOptions from '../db_templates.jsx';
import ScenesGeneral from '../db_scenesGeneral.jsx';
import locations from '../db_locations.jsx';

const mom = {
    block00:{
        type:'npcSays',
        img_npc:Images.npc.mom.mom_blackDress2,
        img_background:'',
        iteration_text:[
            'Привет доча, ты что то хотела?',
        ],
        change_states:[],
        transitions:['block_end']
    },
    block_end:{
        type:'transitions',
        img_npc:Images.npc.mom.mom_blackDress2,
        img_background:'',
        transitions:[
            {text:'Нет все нормально ... (уйти)',address:'end', condition:[]},
        ],
        change_states:[],
    },
}

export default mom;