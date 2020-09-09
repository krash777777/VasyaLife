import Images from './db_img.jsx';
import playerOptions from './db_playerOptions.jsx';
import playerOptionsModifiers from './db_playerOptionsModifiers.jsx';
import dbItems from './db_items.jsx';

const items = {
    food:{
        apple:{
            id:'apple',
            name:'Яблоки',
            discription:'Продукт с низким гликимеческим индексом, рекомндуется есть тем кто худеет.',
            image:Images.items.food.apple,
            price:15,
            numberOfItems:5,
            interactions:[
                {
                    id:'eat',
                    nameMenu:'Съесть',
                    instantEffects:[
                        {option:playerOptions.lifeEnergy, type:'increase', limit:520, value:20}
                    ],
                    modifiers:[],
                    replacementItems:[
                        {itemGroup: 'food', itemId:'egg', quantity:3}
                    ]
                }
            ]
        },
        egg:{
            id:'egg',
            name:'Куриные яйца',
            discription:'Куриное яйцо. Можно есть в сыром виде, но чаще используется как кулинарный ингредиент. Используют певцы и бодибилдеры ... одни для горла, другие, чтобы разбухнуть от мышц.',
            image:Images.items.food.egg,
            price:18,
            numberOfItems:10,
            interactions:[
                {
                    id:'eat',
                    nameMenu:'Съесть',
                    instantEffects:[
                        {option:playerOptions.morale, type:'decrease',  limit:'notLimited', value:15}
                    ],
                    modifiers:[
                        {type:'deleteModifier', modifier:playerOptionsModifiers.cake},
                        {type:'deleteModifier', modifier:playerOptionsModifiers.coffee},
                    ],
                    replacementItems:[]
                }
            ]
        },
        flour:{
            id:'flour',
            name:'Мука',
            discription: 'Мука - кулинарный ингредиент. Часто используется в американском кинематографе в шутках (хотя что смешного в грязном человеке?)',
            image:Images.items.food.flour,
            price:9,
            numberOfItems:5,
            interactions:[]
        },
        sugar:{
            id:'sugar',
            name:'Сахар',
            discription: 'Сахар. Когда есть нечего, его можно и так съесть. Часто используется как кулинарный ингредиент. Есть некоторая масса людей, которая утверждает, что сахар влияет на организм человека как наркотик ... хз чёй то они',
            image:Images.items.food.sugar,
            price:11,
            numberOfItems:15,

            interactions:[
                {
                    id:'eat',
                    nameMenu:'Съесть',
                    instantEffects:[
                        {option:playerOptions.morale, type:'increase',limit:20, value:5}
                    ],
                    modifiers:[],
                    replacementItems:[]
                }
            ]
        },
        cake:{
            id:'cake',
            name:'Пироженое',
            discription: 'Обычное следкое пироженное, которое откладывается на боках и заднице. Приносит кратковременное удовольствие. При помощи такого пироженного были обмануты мутанты во второй части фильма "Черипашки ниндзя"',
            image:Images.items.food.cake,
            price:40,
            numberOfItems:8,
            interactions: [
                {
                    id:'eat',
                    nameMenu:'Съесть',
                    instantEffects:[
                        {option:playerOptions.morale, type:'increase',limit:65, value:15},
                        {option:playerOptions.lifeEnergy, type:'increase',limit:700, value:50}
                    ],
                    modifiers:[
                        {type:'addModifier', modifier:playerOptionsModifiers.cake},
                        {type:'addModifier', modifier:playerOptionsModifiers.coffee},
                    ],
                    replacementItems:[]
                }
            ]
        },
    },
    sexToys:{
        dildoRealistic:{
            id:'dildoRealistic',
            name:'Реалистичный дилдо',
            discription: 'Реалистичный дилдо с ярковыраженной венистой структурой',
            image:Images.items.sexToys.dildoRealistic,
            price:110,
            numberOfItems:1,
            interactions:[]
        },
    }
}

export default items;
