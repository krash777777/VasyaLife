import Images from '../db_img.jsx';
import templateOptions from '../db_templates.jsx';
import ScenesGeneral from '../db_scenesGeneral.jsx';
import locations from '../db_locations.jsx';
import NpcStyles from '../db_npcImageStyle.jsx';
import Npc from '../db_npc.jsx';
import playerOptions from '../db_playerOptions.jsx';
import items from '../db_items.jsx';
import dailyMarks from '../marks/db_dailyMarks.jsx';


//react - значение подсавляется в в картинку нип и диалог - означает то, что НИП должен прореагировать на ГГ в зависимости от слкдвающейся ситуации

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

            {text:'Общаться', address:'transitions_chat', condition:[]},
            // {text:'Общаться 2', address:'transitions_chat', condition:[]},
            {text:'Флиртовать', address:'transitions_flirt', condition:[]},
            {text:'Особое воздействие', address:'chatMomHi', condition:[]},
            {text:'Квесты', address:'chatMomHi', condition:[]},

            // {text:'Болтать ... ',address:'chatMomHi',
            //     condition:[
            //         {option:'relations', npc:Npc.mom, type:'more',value:-1},
            //         {option:'relations', npc:Npc.mom, type:'less',value:11},
            //         {option:'dailyMark', npc:Npc.mom, type:'doesNotExist',value:dailyMarks.chatMomHi},
            //     ]
            // },
            //
            // {text:'Поделиться новостями ... ',address:'chatMomNews',
            //     condition:[
            //         {option:'relations', npc:Npc.mom, type:'more',value:4},
            //         {option:'relations', npc:Npc.mom, type:'less',value:16},
            //         {option:'dailyMark', npc:Npc.mom, type:'doesNotExist',value:dailyMarks.chatMomNews},
            //     ]
            // },
            //
            // {text:'Хочу дать тебе кое что вкусненькое ... ',address:'presents', condition:[]},
            // {text:'Можно мне немного карманных денег?',address:'money',
            //     condition:[
            //         {option:'relations', npc:Npc.mom, type:'more',value:4},
            //         {option:'corruption', npc:Npc.mom, type:'more',value:0},
            //     ]
            // },

            {text:'(уйти)',address:'end', condition:[]},
        ],

    },
    //===================================================

    transitions_chat:{
        type:'transitions',

        npc:Npc.mom,
        npcStyle:NpcStyles.mom.blackDress,
        npcImage:'react',

        img_background:'',
        change_states:[],

        transitions:[
            {text:'Болтать ... ',address:'chatMomHi',
                condition:[
                    {option:'relations', npc:Npc.mom, type:'more',value:-1},
                    {option:'relations', npc:Npc.mom, type:'less',value:11},
                    {option:'dailyMark', npc:Npc.mom, type:'doesNotExist',value:dailyMarks.chatMomHi},
                ]
            },

            // {text:'Болтать ... ',address:'chatMomHi_badReaction',
            //     condition:[
            //         {option:'relations', npc:Npc.mom, type:'more',value:-1},
            //         {option:'relations', npc:Npc.mom, type:'less',value:11},
            //         {option:'dailyMark', npc:Npc.mom, type:'exist',value:dailyMarks.chatMomHi},
            //     ]
            // },

            {text:'Поделиться новостями ... ',address:'chatMomNews',
                condition:[
                    {option:'relations', npc:Npc.mom, type:'more',value:4},
                    {option:'relations', npc:Npc.mom, type:'less',value:16},
                    {option:'dailyMark', npc:Npc.mom, type:'doesNotExist',value:dailyMarks.chatMomNews},
                ]
            },
            {text:'(назад)',address:'block_main_transitions', condition:[]},
        ],

    },

    //===================================================

    chatMomHi:{
        type:'conversation',

        npc:Npc.mom,
        npcStyle:NpcStyles.mom.blackDress,
        npcImage:NpcStyles.mom.blackDress.interior.goodMood,

        img_background:'',
        change_states:[
            {
                changeType:'changeNpcOptions',
                changeValue:[
                    {option:'relations', npc:Npc.mom, type:'increase', limit:5, value:1},
                ]
            },
            {
                changeType:'changeOptions',
                changeValue:[
                    {option:playerOptions.morale, type:'increase', limit:30, value:2}
                ]
            },
            {
                changeType:'addDailyMarks',changeValue:dailyMarks.chatMomHi,
            },
        ],

        iteration_text:[
            'Мы болтаем о всяких мелочах ... о снах, настроении и прочем ...',
        ],
        transitions:['block_main_transitions']
    },

    chatMomHi_badReaction:{
        type:'conversation',

        npc:Npc.mom,
        npcStyle:NpcStyles.mom.blackDress,
        npcImage:NpcStyles.mom.blackDress.interior.sad,

        img_background:'',
        change_states:[
            {
                changeType:'changeOptions',
                changeValue:[
                    {option:playerOptions.morale, type:'decrease', limit:0, value:1}
                ]
            },
        ],

        iteration_text:[
            'Я уже утомилась, давай прекратим ...',
        ],
        transitions:['block_main_transitions']
    },

    //===================================================

    chatMomNews:{
        type:'conversation',

        npc:Npc.mom,
        npcStyle:NpcStyles.mom.blackDress,
        npcImage:NpcStyles.mom.blackDress.interior.goodMood,

        img_background:'',
        change_states:[
            {
                changeType:'changeNpcOptions',
                changeValue:[
                    {option:'relations', npc:Npc.mom, type:'increase', limit:10, value:1},
                ]
            },
            {
                changeType:'changeOptions',
                changeValue:[
                    {option:playerOptions.morale, type:'increase', limit:30, value:2}
                ]
            },
            {
                changeType:'addDailyMarks',changeValue:dailyMarks.chatMomNews,
            },
        ],

        iteration_text:[
            'Мы мило болтаем. Делимся новостями и событиями текущего дня ...',
        ],
        transitions:['block_main_transitions']
    },

    //===================================================

    transitions_flirt:{
        type:'transitions',

        npc:Npc.mom,
        npcStyle:NpcStyles.mom.blackDress,
        npcImage:'react',

        img_background:'',
        change_states:[],

        transitions:[

            {text:'Заигрывать',address:'chatMomHi',
                condition:[
                    {option:'relations', npc:Npc.mom, type:'more',value:10},
                    // {option:'relations', npc:Npc.mom, type:'less',value:11},
                    {option:'dailyMark', npc:Npc.mom, type:'doesNotExist',value:dailyMarks.chatMomHi},
                ]
            },
            {text:'Приставать',address:'chatMomNews',
                condition:[
                    {option:'relations', npc:Npc.mom, type:'more',value:4},
                    {option:'relations', npc:Npc.mom, type:'less',value:16},
                    {option:'dailyMark', npc:Npc.mom, type:'doesNotExist',value:dailyMarks.chatMomNews},
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