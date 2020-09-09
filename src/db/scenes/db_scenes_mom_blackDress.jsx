import Images from '../db_img.jsx';
import templateOptions from '../db_templates.jsx';
import ScenesGeneral from '../db_scenesGeneral.jsx';
import locations from '../db_locations.jsx';
import NpcStyles from '../db_npcImageStyle.jsx';
import Npc from '../db_npc.jsx';
import playerOptions from '../db_playerOptions.jsx';
import items from '../db_items.jsx';


//react - значение подсавляется в в картинку нип и диалог - означает то, что НИП должен прореагировать на ГГ в зависимости от слкдающейся ситуации

const mom_blackDress = {
    block00:{
        type:'conversation',

        npc:Npc.mom,
        npcStyle:NpcStyles.mom.blackDress,

        npcImage:'react',


        img_background:'',
        change_states:[],
        iteration_text:[
            'react',
        ],

        transitions:['block_main_transitions']
    },

    //===================================================

    block_main_transitions:{
        type:'transitions',

        npc:Npc.mom,
        npcStyle:NpcStyles.mom.blackDress,
        npcImage:'react',

        img_background:'',
        change_states:[],

        transitions:[
            {text:'У меня есть для тебя ко что ... ',address:'presents', condition:[]},
            {text:'Можно мне немного карманных денег?',address:'money',
                condition:[
                    {option:'relations', npc:Npc.mom, type:'more',value:4},
                    {option:'corruption', npc:Npc.mom, type:'more',value:0},
                ]
            },
            {text:'(уйти)',address:'end', condition:[]},
        ],

    },

    //===================================================

    presents:{
        type:'conversation',

        npc:Npc.mom,
        npcStyle:NpcStyles.mom.blackDress,
        npcImage:NpcStyles.mom.blackDress.interior.goodMood,

        img_background:'',
        change_states:[],

        iteration_text:[
            'Что же?',
        ],
        transitions:['presents_transitions']
    },
    presents_transitions:{
        type:'transitions',

        npc:Npc.mom,
        npcStyle:NpcStyles.mom.blackDress,
        npcImage:NpcStyles.mom.blackDress.interior.goodMood,

        img_background:'',
        change_states:[],

        iteration_text:[
            'react',
        ],

        transitions:[
            {text:'Яблочко',address:'presents_apple',
                condition:[
                    {option:'item',type:'',value:items.food.apple},
                ]
            },
            {text:'Пироженое',address:'presents_cake',
                condition:[
                    {option:'item',type:'',value:items.food.cake},
                ]
            },
            {text:'Ничего не дарить ... ',address:'presents_fail', condition:[]},
        ],
    },
    presents_fail:{
        type:'conversation',

        npc:Npc.mom,
        npcStyle:NpcStyles.mom.blackDress,
        npcImage:NpcStyles.mom.blackDress.interior.sad,

        img_background:'',
        change_states:[
            {
                changeType:'changeNpcOptions',
                changeValue:[
                    { option:'relations', npc:Npc.mom, type:'decrease', limit:0, value:1},
                ]
            }
        ],

        iteration_text:[
            'И не больно то хотелось ...',
        ],
        transitions:['block_main_transitions']
    },

    //===================================================

    presents_apple:{
        type:'conversation',

        npc:Npc.mom,
        npcStyle:NpcStyles.mom.blackDress,
        npcImage:NpcStyles.mom.blackDress.interior.goodMood,

        img_background:'',
        change_states:[
            {
                changeType:'changeNpcOptions',
                changeValue:[
                    {option:'relations', npc:Npc.mom, type:'increase', limit:3, value:1},
                ]
            },
            {
                changeType:'playerItems',
                changeValue:[
                    {item:items.food.apple, type:'decrease', value:1},
                ]
            },
        ],

        iteration_text:[
            'Спасибо! Я люблю яблочки ...',
        ],
        transitions:['block_main_transitions']
    },
    //===================================================
    presents_cake:{
        type:'conversation',

        npc:Npc.mom,
        npcStyle:NpcStyles.mom.blackDress,
        npcImage:NpcStyles.mom.blackDress.interior.goodMood,

        img_background:'',
        change_states:[
            {
                changeType:'changeNpcOptions',
                changeValue:[
                    {option:'relations', npc:Npc.mom, type:'increase', limit:5, value:2},
                ]
            },
            {
                changeType:'playerItems',
                changeValue:[
                    {item:items.food.cake, type:'decrease', value:1},
                ]
            },
        ],

        iteration_text:[
            'Какая вкуснятина!',
            'Спасибо! Я люблю сладкое ...',
        ],
        transitions:['block_main_transitions']
    },


    //===================================================
    money:{
        type:'conversation',

        npc:Npc.mom,
        npcStyle:NpcStyles.mom.blackDress,
        npcImage:NpcStyles.mom.blackDress.interior.sad,

        img_background:'',
        change_states:[],

        iteration_text:[
            'Опять деньги?',
            'Мне не приносит никакого удовольствия давать тебе карманные деньги!',
            'Пора уже самостоятельно зарабатывать !!! ... не маленькая уже ...',
        ],
        transitions:['money_receive']
    },
    money_receive:{
        type:'conversation',

        npc:Npc.mom,
        npcStyle:NpcStyles.mom.blackDress,
        npcImage:NpcStyles.mom.blackDress.interior.norm,

        img_background:'',
        change_states:[
            {
                changeType:'changeOptions',
                changeValue:[
                    {option:playerOptions.money, type:'increase', limit:400, value:20},
                    {option:playerOptions.morale, type:'decrease', limit:0, value:5}
                ]
            },
            {
                changeType:'changeNpcOptions',
                changeValue:[
                    {npc:Npc.mom, option:'relations', type:'decrease', limit:0, value:5},
                    {npc:Npc.mom, option:'corruption', type:'decrease', limit:0, value:1}
                ]
            }
        ],


        iteration_text:[
            'Держи, и не проси больше ...',
        ],
        transitions:['block_main_transitions']
    },

}

export default mom_blackDress;