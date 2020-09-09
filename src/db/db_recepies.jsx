import items from './db_items.jsx';

const recepies = [
    {
        consist:[
            {item:items.food.flour,quantity:4},
            {item:items.food.sugar,quantity:3},
            {item:items.food.egg,quantity:2},
            {item:items.food.apple,quantity:1},
        ],
        result:{item:items.food.cake, quantity:5}
    }
]
;

export default recepies;