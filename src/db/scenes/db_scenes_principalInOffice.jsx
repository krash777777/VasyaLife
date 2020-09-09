import Images from '../db_img.jsx';
import templateOptions from '../db_templates.jsx';
import ScenesGeneral from '../db_scenesGeneral.jsx';
import locations from '../db_locations.jsx';
import quests from '../db_quests.jsx';
import NpcStyles from '../db_npcImageStyle.jsx';
import Npc from '../db_npc.jsx';
import playerOptions from '../db_playerOptions.jsx';
import items from '../db_items.jsx';

const principalInOffice = {
    block00:{
        type:'conversation',

        npc:Npc.principal,
        npcStyle:NpcStyles.principal.blueShirt,

        npcImage:'react',


        img_background:'',
        change_states:[],
        iteration_text:[
            'react',
        ],

        transitions:['listOfQuestions']

    },

    //transitions =========================================================

    listOfQuestions:{
        type:'transitions',
        npc:Npc.principal,
        npcStyle:NpcStyles.principal.blueShirt,

        npcImage:'react',

        img_background:'',
        change_states:[],
        transitions:[
            {text:'Вы директор колледжа?',address:'findPrincipal_init',
                condition:[
                    {option:'quest',type:'equally',value:quests.mainLine.findPrincipal.id}
                ]},
            {text:'Нет ... ничего (уйти)',address:'end', condition:[]},
        ],
    },

    //Первоначальное знакомство =========================================================


    findPrincipal_init:{
        type:'conversation',

        npc:Npc.principal,
        npcStyle:NpcStyles.principal.blueShirt,

        npcImage:NpcStyles.principal.blueShirt.interior.reactionBad,

        img_background:'',
        iteration_text:[
            'Да это я',
            'С кем имею честь?',
        ],
        change_states:[
            {changeType:'deleteQuest', changeValue:quests.mainLine.findPrincipal},
        ],
        transitions:['findPrincipal_01']
    },
    findPrincipal_01:{
        type:'conversation',

        npc:Npc.principal,
        npcStyle:NpcStyles.principal.blueShirt,

        npcImage:NpcStyles.principal.blueShirt.interior.reactionBad,

        img_background:'',
        iteration_text:[
            'Меня зовут Василиса',
            'Я пришла к Вам ... потому ...',
            'Потому ...',
            '... (как же сказать)',
            'Потому, что это Вы мне сказали прийти к Вам!',
            'Там ...',
            'Во сне ...',
            'Нуу ... у меня в голове ...',
            'Той ночью ...',
            'Понимаете?',
            '(Как же я наверное глупо выгляжу ... )',
        ],
        change_states:[],
        transitions:['findPrincipal_02']
    },
    findPrincipal_02:{
        type:'conversation',

        npc:Npc.principal,
        npcStyle:NpcStyles.principal.blueShirt,

        npcImage:NpcStyles.principal.blueShirt.interior.norm,

        img_background:'',
        iteration_text:[
            'Понимаю ...',
            'На твое счастье, очень хорошо понимаю!',
            'И вижу, что с тобой все в порядке ... ',
            'Это хорошо, значит ты послушала что я тебе рекомендовала ...',
        ],
        change_states:[],
        transitions:['findPrincipal_03']
    },

    findPrincipal_03:{
        type:'conversation',

        npc:Npc.principal,
        npcStyle:NpcStyles.principal.blueShirt,

        npcImage:NpcStyles.principal.blueShirt.interior.annoyed,

        img_background:'',
        iteration_text:[
            'Кое что тебе объясню',
            'Все что сейчас с тобой происходит, лежит за гранью понимания и возможностей обычного человека',
            'Общение во сне и любые другие ментальные взаимодействия, доступны не всем ... и только по этой причине мы с тобой общаемся сейчас',
            'К сожалению, многие техники работы с данными материями, как в прочем и с другими ... утеряны',
            'Я занимаюсь изучением и восстановлением знаний',
            'Так же, поиском личностей с выявленным даром, таким, как у тебя ...',
            'Правда, тебе придется во многом самостоятельно постигать границы своих возможностей',
            'К сожалению, свободных наставников у нас сейчас нет',
            'То, что мы с тобой общались во сне, говрит о том, что кто то над тобой проводил эксперимент ... я вижу на тебе метку',
            'Это не смертельно, но неприятно ... ',
            'Придется найти способо избавиться от нее ...',
            'Спроси у нашей медсестры и библиотекаря, что они думают об этом ... ',
            'Они так же обладают даром, и я с ними работаю ...',
            'Как что нибудь выяснишь, возвращайся ко мне, будем думать что делать дальше ...',
        ],
        change_states:[
            {changeType:'addQuest', changeValue:quests.mainLine.acquaintanceNurse},
            {changeType:'addQuest', changeValue:quests.mainLine.acquaintanceLibrarian},
        ],
        transitions:['listOfQuestions']
    },

    //=========================================================

}

export default principalInOffice;