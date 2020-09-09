import Images from '../db_img.jsx';
import templateOptions from '../db_templates.jsx';
import locations from '../db_locations.jsx';

const test = {
    block00:{
        type:'npcSays',
        animationBlock:'',
        animationNPC:'',
        img_npc:'',
        img_background:Images.instantActions.sleep1,
        iteration_text:[
            'Сон - это лучшее лекарство!',
        ],
        change_states:[],
        transitions:['wakeUp'],
    },
}

export default test;