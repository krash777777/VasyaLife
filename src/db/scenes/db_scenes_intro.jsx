import Images from '../db_img.jsx';
import templateOptions from '../db_templates.jsx';
import locations from '../db_locations.jsx';
import animation from '../db_animation.jsx';
import quests from '../db_quests.jsx';
import modifiers from '../db_playerOptionsModifiers.jsx';
import Npc from '../db_npc.jsx';
import NpcStyles from '../db_npcImageStyle.jsx';
import recipes from '../db_recepies.jsx';

const Scenes_Intro = {
    block00:{
        type:'transitions',
        animationBlock:animation.blurBlinkAnimation,
        animationNPC:'',
        npc:'',
        npcStyle:NpcStyles.mom.blackDress,
        npcImage:'',
        img_npc:'',
        img_background:Images.locations.dream,
        change_states:[],
        transitions:[
            {text:'Что со мной?',address:'internalDialogue01', condition:[]},
            {text:'(Пропустить вступление)',address:'end', condition:[]},
            {text:' ... К диалогу с квестом',address:'dialogue10', condition:[]},
        ],
    },
    internalDialogue01:{
        type:'npcSays',
        animationBlock:animation.blurBlinkAnimation,
        animationNPC:'',
        npc:'',
        npcImage:'',
        img_npc:'',
        img_background:Images.locations.dream,
        iteration_text:[
            '(Противная пульсирующая боль в висках) ...',
            '(Что со мной?)',
            '(Где я ... ???)',
        ],
        change_states:[],
        transitions:['selectAction'],
    },
    selectAction:{
        type:'transitions',
        animationBlock:animation.blurBlinkAnimation,
        animationNPC:'',
        npc:'',
        npcImage:'',
        img_npc:'',
        img_background:Images.locations.dream,
        change_states:[],
        transitions:[
            {text:'Попытаться встать',address:'tryToAct', condition:[]},
            {text:'Оглядеться',address:'tryToAct', condition:[]},
        ],
    },
    tryToAct:{
        type:'npcSays',
        animationBlock:animation.shakeVerticalAnimation,
        animationNPC:animation.blurBlinkAnimation,
        npc:'',
        npcImage:'',
        img_npc:'',
        img_background:Images.locations.dream,
        iteration_text:[
            '...',
        ],
        change_states:[],
        transitions:['internalDialogue02'],
    },
    internalDialogue02:{
        type:'npcSays',
        animationBlock:animation.blurBlinkAnimation,
        animationNPC:'',
        npc:'',
        npcImage:'',
        img_npc:'',
        img_background:Images.locations.dream,
        iteration_text:[
            '?!!',
            '(Почему я ничего не ощущаю ... ?)',
            '(Хотя ... )',
            '(Я чувствую что мне очень и очень плохо ... )',
            '(Но ... как будто ... у меня нет тела!)',

        ],
        change_states:[],
        transitions:['internalDialogue03'],
    },
    internalDialogue03:{
        type:'npcSays',
        animationBlock:animation.shakeVerticalAnimation,
        animationNPC:'',
        npc:'',
        npcImage:'',
        img_npc:'',
        img_background:Images.locations.dream,
        iteration_text:[
            '(Что со мной?)',
            '(ГДЕ Я ... !??)',
        ],
        change_states:[],
        transitions:['dialogue00'],
    },
    dialogue00:{
        type:'npcSays',
        animationBlock:animation.shakeVerticalAnimation,
        animationNPC:'',
        npc:'',
        npcImage:Images.npc.principal.principal_image00_01_0,
        img_npc:Images.npc.principal.principal_image00_01_0,
        img_background:Images.locations.dream,
        iteration_text:[
            '!@#$%^&*! ... ',
            '(Кто это ... !??)',
            '!@#$%^&*! ... ;%:?*(#$%#',
            '(Похоже мне пытаются что то сказать ... !??)',
        ],
        change_states:[],
        transitions:['dialogue01'],
    },
    dialogue01:{
        type:'npcSays',
        animationBlock:animation.blurBlinkAnimation,
        animationNPC:'',

        npc:'',
        npcImage:Images.npc.principal.principal_image00_01_1,
        img_npc:Images.npc.principal.principal_image00_01_1,
        img_background:Images.locations.dream,
        iteration_text:[
            '!@#$%^&*! ... ',
            '(...)',
            '(Нет! Мне кто то пытается проникнуть мне в голову ... !!!)',
        ],
        change_states:[],
        transitions:['dialogue02'],
    },
    dialogue02:{
        type:'npcSays',
        animationBlock:animation.blurBlinkAnimation,
        animationNPC:'',

        npc:'',
        npcImage:Images.npc.principal.principal_image00_01_2,
        img_npc:Images.npc.principal.principal_image00_01_2,
        img_background:Images.locations.dream,
        iteration_text:[
            '!@#$%^&*! ... ',
            '(как же больно!)',
        ],
        change_states:[],
        transitions:['dialogue03'],
    },
    dialogue03:{
        type:'npcSays',
        animationBlock:'',
        animationNPC:'',

        npc:'',
        npcImage:Images.npc.principal.principal_image00_01,
        img_npc:Images.npc.principal.principal_image00_01,
        img_background:Images.locations.dream,
        iteration_text:[
            'Ты меня слышишь? ',
            '(У меня такое чувство что я больше чувствую чем слышу ...)',
            'Попробуй как нибудь отреагировать ...',
            '(Мне это все не кажется ...)',
        ],
        change_states:[],
        transitions:['dialogue04'],
    },
    dialogue04:{
        type:'npcSays',
        animationBlock:'',
        animationNPC:'',
        img_background:Images.locations.dream,

        npc:'',
        npcImage:Images.npc.principal.principal_image00_03,
        img_npc:Images.npc.principal.principal_image00_03,
        iteration_text:[
            'Фокусируешь на мне взгляд ... ',
            'Очень хорошо ... ',
            'Я боялась что все будет значительно хуже!',

        ],
        change_states:[],
        transitions:['dialogue05'],
    },
    dialogue05:{
        type:'playerSays',
        img_character:Images.character.blueSet.blue_face02,
        img_background:Images.locations.dream,

        npc:'',
        npcImage:Images.npc.principal.principal_image00_01,
        img_npc:Images.npc.principal.principal_image00_01,
        iteration_text:[
            'Кто Вы?',
        ],
        change_states:[],
        transitions:['dialogue06'],
    },
    dialogue06:{
        type:'npcSays',
        animationBlock:'',
        animationNPC:'',
        img_background:Images.locations.dream,

        npc:'',
        npcImage:Images.npc.principal.principal_image00_02,
        img_npc:Images.npc.principal.principal_image00_02,
        iteration_text:[
            'Тише тише ... не так быстро ... все вопросы потом ...',
            'Ты же понимаешь что находишься в несовсем обычном месте?',
            'Не делай "резких движений" и постарайся выслушать меня внимательно не перебивая ...',
        ],
        change_states:[],
        transitions:['dialogue07'],
    },
    dialogue07:{
        type:'npcSays',
        animationBlock:'',
        animationNPC:'',
        img_background:Images.locations.dream,

        npc:'',
        npcImage:Images.npc.principal.principal_image00_05,
        img_npc:Images.npc.principal.principal_image00_05,
        iteration_text:[
            'То, что мы сейчас разговариваем, само по себе большая удача!',
            'Не будь меня поблизости, твой мозг был бы похож на желе, а ты бы лужала и пускала слюни ...',
            'И кстати ... это состояние вполне может и осуществиться, если ты не будешь выполнять то что я тебе говорю ...',
            'Андерстендер? ... ',
            'Или как там это у вас ...',
        ],
        change_states:[],
        transitions:['dialogue08'],
    },
    dialogue08:{
        type:'playerSays',
        img_character:Images.character.blueSet.blue_face02,
        img_background:Images.locations.dream,

        npc:'',
        npcImage:Images.npc.principal.principal_image00_01,
        img_npc:Images.npc.principal.principal_image00_01,
        iteration_text:[
            'Не совсем ...',
            '(Хрень какая то ...)',
            'Наверное, я должна Вас слушаться, но я не понимаю где я, что происходит ... и вообще я не ощущаю себя!',
        ],
        change_states:[],
        transitions:['dialogue09'],
    },
    dialogue09:{
        type:'npcSays',
        animationBlock:'',
        animationNPC:'',
        img_background:Images.locations.dream,

        npc:'',
        npcImage:Images.npc.principal.principal_image00_05,
        img_npc:Images.npc.principal.principal_image00_05,
        iteration_text:[
            'Тише, тише ... не горячись ... всему свое время ...',
            'Слишком много информации сразу это тоже плохо, по этому я тебе чуточку приоткрою завесу происходящего ... хотя я и сама не до конца все понимаю ...',
            'Не старайся ничего сразу понять ... просто прими как есть, розбираться после будешь ... в свое время',
            'Итак ... ',
            'Мы находимся в твоем сознании ... и не разговариваем, а делемся мыслеформами ... ',
            'То, что ты тут оказалась а не сразу в загробном мире, означает то, что у тебя есть дар ... и это просто прекрасно ... для тебя',
            'Сейчас, мы закончим наше, так сказать, "взаимодействие" ... и ты уснешь ...',
            'Но после пробуждения тебе нужно будет подкрепиться ... поесть сладкого и найти меня ... ',
            'У меня получилось найти тебя достаточно быстро, значит ты где то рядом ... и тебе, чтобы меня найти, нужно поискать рядом с домом "Социально педогогический колледж имени Ленина"',
            'Я директор ...',
            'Там мы с тобой и продолжим ...',
            'Ты все поняла? ... и не забудь про сладкое ... ',
            'Ты будешь себя чувствовать лучше ... ',
        ],
        change_states:[],
        transitions:['dialogue10'],
    },
    dialogue10:{
        type:'npcSays',
        animationBlock:'',
        animationNPC:'',
        img_background:Images.locations.dream,

        npc:'',
        npcImage:Images.npc.principal.principal_image00_05,
        img_npc:Images.npc.principal.principal_image00_05,
        iteration_text:[
            'А теперь ...',
        ],
        change_states:[
            {changeType:'addQuest', changeValue:quests.mainLine.findPrincipal},
            {changeType:'addModifier', changeValue:modifiers.exhaustion},
            {changeType:'addRecipe', changeValue:recipes.cake},
        ],
        transitions:['end'],
    },
}

export default Scenes_Intro;