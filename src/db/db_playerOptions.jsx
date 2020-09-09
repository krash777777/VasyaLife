import Images from './db_img.jsx';

const playerOptions = {
    money:{
        id:'money',
        name:'Деньги',
        image:Images.ico.money,
        minValue:0,
        norm:9999999998,
        maxValue:9999999999,
        discription:'Деньги правят миром, ... но иногда деньги обходятся нам слишком дорого! (Ральф Уолдо Эмерсон)'
    },
    lifeEnergy:{
        id:'lifeEnergy',
        name:'Жизненная энергия',
        image:Images.ico.heart,
        minValue:0,
        norm:700,
        maxValue:1000,
        discription:'0 / 700 / 1000. При достижении нуливого уровня наступает смерть. 700 - нормальное состояние, превышение можно добиться модификаторами.'
    },
    morale:{
        id:'morale',
        name:'Мораль',
        image:Images.ico.mask,
        minValue:0,
        norm:75,
        maxValue:100,
        discription:'0 / 75 / 100. Уровень влияет на доступ к событиям и действиям. 75 - хорошее настроение. Эйфории можно достичь только модификаторами.'
    },
    sexEnergy:{
        id:'sexEnergy',
        name:'Эрос',
        image:Images.ico.gender,
        minValue:0,
        norm:100,
        maxValue:100,
        discription:'0 / 100. Накопленная сексуальная энергия. Уменьшается с течением времени или событиями связанными с ее расходами.'
    },
    concentration:{
        id:'concentration',
        name:'Концентрация',
        image:Images.ico.concentration,
        minValue:0,
        norm:50,
        maxValue:100,
        discription:'0 / 50 / 100. Влияет на доступ к разлиычным дейсствиям. Приобретается в моент обучения и при помощи модификаторов.'
    },
    mana:{
        id:'mana',
        name:'Мана',
        image:Images.ico.yinYang,
        minValue:0,
        norm:100,
        maxValue:100,
        discription:'0 / 100. Накопленная магическая энергия.'
    },
}

export default playerOptions;