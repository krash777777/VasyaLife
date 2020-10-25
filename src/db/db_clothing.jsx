import Images from './db_img.jsx';
import playerModifiers from './db_playerOptionsModifiers.jsx';

const clothing = {
    blueJeans:{
        id:'blueJeans',
        name:'Голубые джинсы',
        partOfBody:'legs',
        image:Images.clothing.blueJeans,
        size:{height: '6vw',width: '4vw'},
        modifire:'',
        price:55
    },
    blueShirt:{
        id:'blueShirt',
        name:'Голубая футболка',
        partOfBody:'body',
        image:Images.clothing.blueShirt,
        size:{height: '6vw',width: '4vw'},
        modifire:'',
        price:32
    },
    blueSkirt:{
        id:'blueSkirt',
        name:'Синяя юбка',
        partOfBody:'legs',
        image:Images.clothing.blueSkirt,
        size:{height: '6vw',width: '4vw'},
        modifire:'',
        price:39
    },
    orangeBriefs:{
        id:'orangeBriefs',
        name:'Оранжевые трусики',
        partOfBody:'hips',
        image:Images.clothing.orangeBriefs,
        size:{height: '4vw',width: '4vw'},
        modifire:playerModifiers.orangeBriefs,
        price:12
    },
    orangeShirt:{
        id:'orangeShirt',
        name:'Оранжевая майка',
        partOfBody:'body',
        image:Images.clothing.orangeShirt,
        size:{height: '6vw',width: '4vw'},
        modifire:playerModifiers.coffee,
        price:42
    },
}

export default clothing;