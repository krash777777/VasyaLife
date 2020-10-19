import items from './db_items.jsx';

const recepies = {
    test:{
        id:'test',
        discription:'test',
        consist:[
            {item:items.food.flour,quantity:2},
            {item:items.food.sugar,quantity:3},
            {item:items.food.egg,quantity:4},
            {item:items.food.apple,quantity:1},
        ],
        result:[
            {item:items.food.cake, quantity:1},
            {item:items.sexToys.dildoRealistic, quantity:1}
            ]
    },

    cake:{
        id:'cake',
        discription:'Очень вкусное пироженое',
        consist:[
            {item:items.food.flour,quantity:4},
            {item:items.food.sugar,quantity:3},
            {item:items.food.egg,quantity:2},
            {item:items.food.apple,quantity:2},
        ],
        result:[
            {item:items.food.cake, quantity:3}
        ]
    },

};



// const recepies = [
//     {
//         consist:[
//             {item:items.food.flour,quantity:4},
//             {item:items.food.sugar,quantity:3},
//             {item:items.food.egg,quantity:2},
//             {item:items.food.apple,quantity:1},
//         ],
//         result:{item:items.food.cake, quantity:5}
//     }
// ];

export default recepies;