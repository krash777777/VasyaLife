import Images from '../db_img.jsx';
import templateOptions from '../db_templates.jsx';
import ScenesGeneral from '../db_scenesGeneral.jsx';
import locations from '../db_locations.jsx';

const death = {
    block00:{
        type:'conversation',
        animationBlock:'',
        animationNPC:'',

        npc:'',
        npcImage:'',
        img_background:Images.backgrounds.death,
        iteration_text:[
            'СМЕРТЬ ...',
            'Смерть, это такое же естественное явление, как и рождение',
            'Только ...',
            'БОЛЕЕ ЗНАЧИТЕЛЬНОЕ !!!',
            '...'
        ],
        change_states:[],
        transitions:['gameOver'],
    }
}

export default death;