import Images from './db_img.jsx';
import playerOptions from './db_playerOptions.jsx';

//модификаторы влияют как постоянная величина с минусом или плюсом, на время действия


const playerOptionsModifiers = {
    exhaustion:{
        id:'exhaustion',
        name:'Истощение',
        discription:'Неизвестный бафф. От него все плохо :(',
        image:Images.ico.poison,
        actionTime: 999999999999,
        modifiers:[
            {option:playerOptions.lifeEnergy, value:-50},
            {option:playerOptions.mana,value:-30},
            {option:playerOptions.morale,value:-20},
        ],
    },
    coffee:{
        id:'coffee',
        name:'Кофе',
        discription:'Кофейный позитивчик',
        image:Images.ico.coffee,
        actionTime: 240,
        modifiers:[
            {option:playerOptions.lifeEnergy, value:50},
            {option:playerOptions.concentration, value:5}
        ],
    },
    cake:{
        id:'cake',
        name:'Сласти',
        discription:'Жизнь со сладостями наполняется новыми красками',
        image:Images.ico.cupcake,
        actionTime: 120,
        modifiers:[
            {option:playerOptions.morale, value:30}
        ],
    },
    shower:{
        id:'shower',
        name:'Душь',
        discription:'Бодрость и настроение от свежего тела',
        image:Images.ico.jacuzzi,
        actionTime: 360,
        modifiers:[
            {option:playerOptions.lifeEnergy, value:50},
            {option:playerOptions.morale, value:15},
        ],
    },
    orangeBriefs:{
        id:'orangePanties',
        name:'Оранжевые трусики',
        discription:'В этих трусиках я чувствую себя увереннее ...',
        image:Images.clothing.orangeBriefs,
        actionTime: 1440, // на весь день
        modifiers:[
            {option:playerOptions.morale, value:15},
        ],
    },
    wrongSet:{
        id:'wrongSet',
        name:'Одежда не сочетается',
        discription:'Я чувсвтую себя дурой',
        image:Images.ico.chevronDown,
        actionTime: 999999999999, // на весь день
        modifiers:[
            {option:playerOptions.morale, value:-50},
        ],
    },
    // fatigue:{
    //     id:'fatigue',
    //     name:'Усталость',
    //     discription:'Утомление. Для выполнения простых вещений требуется больше времени. Мораль падает с каждым движением.',
    //     image:Images.ico.orbRed,
    //     actionTime: 999,
    //     effectOnParameters:[
    //         {option:'time',type:'coefficient',value:1.5}
    //     ],
    // }
}



//примеры
//кофе - повышает бодрость
//душь - повышает бодрость
//усталость - влияет на здоровье
//вкусняшки - влияют на настроение
//приятный разговор - влияет на настроение

//истощение - влияет на здоровье, настроение, ману (энергию)
//болезнь - результат эксперимента / лечения - сильно влияет на здоровье

export default playerOptionsModifiers;