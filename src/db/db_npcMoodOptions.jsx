import Images from './db_img.jsx';

const npcMoodOptions = {
    rage:{
        id:'rage',
        name:'Ярость',
        image:Images.ico.money,
        moodValueMin:-30,
        moodValueMax:-20,
        discription:'Крайняя степень разражения. Никак нельзя повлиять, можно только подождать, пока самоу восстоновится.'
    },
    annoyed:{
        id:'annoyed',
        name:'Раздражение',
        image:Images.ico.money,
        moodValueMin:-19,
        moodValueMax:-10,
        discription:'Раздражение. Настроение отсутствет. Повлиять можно только подарками.'
    },
    sad:{
        id:'sad',
        name:'Грусть',
        image:Images.ico.money,
        moodValueMin:-9,
        moodValueMax:0,
        discription:'Грустно. Можно подянть настроение шутками, подарками и посиделками со всякими сладостями.'
    },
    norm:{
        id:'norm',
        name:'Обычное настроение',
        image:Images.ico.money,
        moodValueMin:1,
        moodValueMax:10,
        discription:'Все в норме. Можно позволить себе чуточку больше чем просто общение.'
    },
    goodMood:{
        id:'goodMood',
        name:'Хорошее настроение',
        image:Images.ico.money,
        moodValueMin:11,
        moodValueMax:20,
        discription:'При хорошем настроении прощаются различные ошибки и вольности, которые бы раньше не сошли с рук.'
    },
    joy:{
        id:'joy',
        name:'Радость',
        image:Images.ico.money,
        moodValueMin:21,
        moodValueMax:30,
        discription:'Радость!  Доступны все возможности, но не все они сохраняют текущий уровень настроения.'
    },
}

export default npcMoodOptions;