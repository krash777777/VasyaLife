import Images from '../db_img.jsx';

const quests = {
    findPrincipal:{
        id:'findePrincipal',
        img:Images.ico.orbRed,
        name:'Найти директора колледжа.',
        discription:'Вроды бы она упоминала, что она является директором местного колледжа. Нужно туда наведаться.',
        reward:[],
    },
    acquaintanceNurse:{
        id:'acquaintanceNurse',
        img:Images.ico.orbBlue,
        name:'Поговорить с медсестрой колледжа',
        discription:'',
        reward:[],
    },
    acquaintanceLibrarian:{
        id:'acquaintanceLibrarian',
        img:Images.ico.orbYellow,
        name:'Поговорить с библиотекарем',
        discription:'',
        reward:[],
    },
}

export default quests;
