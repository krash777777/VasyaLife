import Images from './db_img.jsx';
import actionsGeneral from './db_actionsGeneral.jsx';
import templates from './db_templates.jsx';
import shopsAndGoods from './db_shopsAndGoods.jsx';
import instantActions from './db_instantActions.jsx';
import Npc from './db_npc.jsx';

//доступные условия перехода по локациям: одежда (определенный стиль), одежда статус (не голая или голая), время, маркер (статус квеста), вещь в инвентаре, уровень здоровья

//conditions - условия перехода из локации в локацию ...

const locations = {
    townMap:{
        id:'townMap',
        name:'Город',
        img:Images.locations.townMap,
        panelsVision:{time:'block',optionsPanel:'none',inventar:'none', tablet:'none'},
        transitions:[
            {name:'Домой',location:'hall',img:Images.ico.houseFrame,indentationTop:'7vw',indentationLeft:'20vw', transitionTime:10},
            {name:'Торговый центр',location:'shoppingCenter',img:Images.ico.shop,indentationTop:'17vw',indentationLeft:'29vw', transitionTime:20},
            {name:'Колледж',location:'college',img:Images.ico.abc,indentationTop:'18vw',indentationLeft:'54vw', transitionTime:15},
        ],
        actionRoom:[],
        actions:[],
        instantAction:[],
        conditions:[
            {item:'clothingSet', comparisonType:'not equal',value:'wrongSet'}
            ]
    },
    dream:{
        id:'dream',
        name:'Сон',
        img:Images.locations.dream,
        panelsVision:{time:'none',optionsPanel:'none',inventar:'none', tablet:'none'},
        transitions:[],
        actionRoom:[],
        actions:[],
        instantAction:[],
        conditions:[
            {item:'clothingSet', comparisonType:'not equal',value:'wrongSet'}
        ]
    },
    hall:{
        id:'hall',
        name:'Зал',
        img:Images.locations.hall,
        panelsVision:{time:'block',optionsPanel:'block',inventar:'block', tablet:'block'},
        transitions:[
            {name:'Комната родителей',location:'parentsRoom', img:Images.ico.chevronUp,indentationTop:'19vw',indentationLeft:'1vw', transitionTime:5},
            {name:'Кухня',location:'kitchen', img:Images.ico.chevronRight,indentationTop:'21vw',indentationLeft:'2vw', transitionTime:5},
            {name:'Спальная комната',location:'bedroom', img:Images.ico.chevronLeft, indentationTop:'23vw',indentationLeft:'2vw', transitionTime:5},
            {name:'Ванная комната',location:'bathroom', img:Images.ico.chevronDown,indentationTop:'25vw',indentationLeft:'1vw', transitionTime:5},
            {name:'В город',location:'townMap',img:Images.ico.map,indentationTop:'43vw',indentationLeft:'30vw', transitionTime:10}
        ],
        actionRoom:[
            {name:'Тумбочка', tpl:templates.movingItems, img:Images.ico.store, indentationTop:'26vw',indentationLeft:'35vw', interval:5}
        ],
        actions:[],
        instantAction:[],
        conditions:[
            {item:'clothingSet', comparisonType:'not equal',value:'wrongSet'}
        ]
    },
    kitchen:{
        id:'kitchen',
        name:'Кухня',
        img:Images.locations.kitchen,
        panelsVision:{time:'block',optionsPanel:'block',inventar:'block', tablet:'block'},
        transitions:[
            {name:'Зал',location:'hall',img:Images.ico.chevronLeft,indentationTop:'27vw',indentationLeft:'1vw', transitionTime:5},
        ],
        actionRoom:[
            {name:'Духовка', tpl:templates.craft,img:Images.ico.services, indentationTop:'22vw',indentationLeft:'10vw', interval:10},
            {name:'Холодильник', tpl:templates.movingItems, img:Images.ico.store, indentationTop:'22.5vw',indentationLeft:'1vw', interval:5}
        ],
        actions:[],
        instantAction:[],
        conditions:[
            {item:'clothingSet', comparisonType:'not equal',value:'wrongSet'}
        ]
    },
    bedroom:{
        id:'bedroom',
        name:'Спальня',
        img:Images.locations.bedroom,
        panelsVision:{time:'block',optionsPanel:'block',inventar:'block', tablet:'block'},
        transitions:[
            {name:'Зал',location:'hall',img:Images.ico.chevronLeft,indentationTop:'27vw',indentationLeft:'1vw', transitionTime:5},
        ],
        actionRoom:[
            {name:'Гардероб', tpl:templates.wardrobe, img:Images.ico.wardrobe, indentationTop:'18vw',indentationLeft:'12vw', interval:15},
            {name:'Тумбочка', tpl:templates.movingItems, img:Images.ico.store, indentationTop:'31vw',indentationLeft:'32vw', interval:5}
        ],
        actions:[],
        instantAction:[
            {act:instantActions.sleep,indentationTop:'28vw',indentationLeft:'21vw'},
        ],
        conditions:[
            {item:'clothingSet', comparisonType:'not equal',value:'wrongSet'}
        ]
    },
    bathroom:{
        id:'bathroom',
        name:'Ванная комната',
        img:Images.locations.bathroom,
        panelsVision:{time:'block',optionsPanel:'block',inventar:'block', tablet:'block'},
        transitions:[
            {name:'Зал',location:'hall',img:Images.ico.chevronLeft,indentationTop:'25vw',indentationLeft:'1vw', transitionTime:5},
        ],
        actionRoom:[],
        actions:[
            {name:'Принять душь', tpl:templates.action,action:actionsGeneral.shower,img:Images.ico.jacuzzi,indentationTop:'12vw',indentationLeft:'47vw', transitionTime:20,
                conditions:[
                    {option:'time',type:'more', valueHour:0, valueMinute:0},
                    {option:'time',type:'less', valueHour:17, valueMinute:59},
                ]
            },
            {name:'Принять душь', tpl:templates.action,action:actionsGeneral.shower,img:Images.ico.jacuzzi,indentationTop:'12vw',indentationLeft:'47vw', transitionTime:20,
                conditions:[
                    {option:'time',type:'more', valueHour:20, valueMinute:0},
                    {option:'time',type:'less', valueHour:23, valueMinute:59},
                ]
            },
        ],
        instantAction:[],
        conditions:[
            {item:'clothingSet', comparisonType:'not equal',value:'wrongSet'},
            {item:'item', comparisonType:'equal',value:'dildoRealistic'}
        ]
    },
    parentsRoom:{
        id:'parentsRoom',
        name:'Мамина комната',
        img:Images.locations.parentsRoom,
        panelsVision:{time:'block',optionsPanel:'block',inventar:'block', tablet:'block'},
        transitions:[
            {name:'Зал',location:'hall',img:Images.ico.chevronLeft,indentationTop:'25vw',indentationLeft:'1vw', transitionTime:5},
        ],
        actionRoom:[],
        actions:[],
        instantAction:[],
        conditions:[
            {item:'clothingSet', comparisonType:'not equal',value:'wrongSet'},
            {item:'timeHour', comparisonType:'less',value:'6'},
            {item:'timeHour', comparisonType:'more',value:'23'},
        ]
    },

    shoppingCenter:{
        id:'shoppingCenter',
        name:'Торговый центр',
        img:Images.locations.supermarket,
        panelsVision:{time:'block',optionsPanel:'none',inventar:'block', tablet:'block'},
        transitions:[
            {name:'В город',location:'townMap',img:Images.ico.map,indentationTop:'12vw',indentationLeft:'1vw', transitionTime:10},
            {name:'Фуд-корт',location:'foodCourt',img:Images.ico.frenchFries,indentationTop:'33vw',indentationLeft:'6vw', transitionTime:5},
        ],
        actionRoom:[
            {name:'Супермаркет', tpl:templates.store,img:Images.ico.shop, indentationTop:'17vw',indentationLeft:'1vw', interval:20},
            {name:'Бутик модной одежды', tpl:templates.storeClothing,img:Images.ico.skirt, indentationTop:'19vw',indentationLeft:'1vw', interval:20}
        ],
        actions:[],
        instantAction:[],
        conditions:[
            {item:'clothingSet', comparisonType:'not equal',value:'wrongSet'}
        ]
    },
    foodCourt:{
        id:'foodCourt',
        name:'Фуд-корт',
        img:Images.locations.foodCourt,
        panelsVision:{time:'block',optionsPanel:'block',inventar:'block', tablet:'block'},
        transitions:[
            {name:'Холл торгового центра',location:'shoppingCenter',img:Images.ico.chevronLeft,indentationTop:'12vw',indentationLeft:'1vw', transitionTime:5},
        ],
        actionRoom:[],
        actions:[],
        instantAction:[
            // {act:instantActions.frenchFries,indentationTop:'18vw',indentationLeft:'1vw'},
            // {act:instantActions.coffee,indentationTop:'20vw',indentationLeft:'1vw'},
        ],
        conditions:[
            {item:'clothingSet', comparisonType:'not equal',value:'wrongSet'}
        ]
    },
    college:{
        id:'college',
        name:'Колледж',
        img:Images.locations.college_hall,
        panelsVision:{time:'block',optionsPanel:'block',inventar:'block', tablet:'block'},
        transitions:[
            {name:'В город',location:'townMap',img:Images.ico.map,indentationTop:'24vw',indentationLeft:'44vw', transitionTime:15},
            {name:'Директор',location:'principalOffice',img:Images.ico.chevronLeft,indentationTop:'12vw',indentationLeft:'6vw', transitionTime:5},
            {name:'Библиотека',location:'library',img:Images.ico.chevronLeft,indentationTop:'14vw',indentationLeft:'9vw', transitionTime:5},
            {name:'Медицинский кабинет',location:'medicalOffice',img:Images.ico.chevronDown,indentationTop:'43vw',indentationLeft:'27vw', transitionTime:5},
            {name:'Учебный класс',location:'class',img:Images.ico.chevronRight,indentationTop:'31vw',indentationLeft:'54vw', transitionTime:5},
        ],
        actionRoom:[],
        actions:[],
        instantAction:[],
        conditions:[
            {item:'clothingSet', comparisonType:'not equal',value:'wrongSet'}
        ]
    },
    principalOffice:{
        id:'principalOffice',
        name:'Директор',
        img:Images.locations.principalOffice,
        panelsVision:{time:'block',optionsPanel:'block',inventar:'block', tablet:'block'},
        transitions:[
            {name:'Холл колледжа',location:'college',img:Images.ico.chevronDown,indentationTop:'43vw',indentationLeft:'27vw', transitionTime:5},
        ],
        actionRoom:[],
        actions:[],
        instantAction:[],
        conditions:[
            {item:'clothingSet', comparisonType:'not equal',value:'wrongSet'}
        ]
    },
    library:{
        id:'library',
        name:'Библиотека',
        img:Images.locations.library,
        panelsVision:{time:'block',optionsPanel:'block',inventar:'block', tablet:'block'},
        transitions:[
            {name:'Холл колледжа',location:'college',img:Images.ico.chevronDown,indentationTop:'43vw',indentationLeft:'27vw', transitionTime:5},
        ],
        actionRoom:[],
        actions:[],
        instantAction:[],
        conditions:[
            {item:'clothingSet', comparisonType:'not equal',value:'wrongSet'}
        ]
    },
    medicalOffice:{
        id:'medicalOffice',
        name:'Медицинский кабинет',
        img:Images.locations.medicalOffice,
        panelsVision:{time:'block',optionsPanel:'block',inventar:'block', tablet:'block'},
        transitions:[
            {name:'Холл колледжа',location:'college',img:Images.ico.chevronDown,indentationTop:'43vw',indentationLeft:'27vw', transitionTime:5},
        ],
        actionRoom:[],
        actions:[],
        instantAction:[],
        conditions:[
            {item:'clothingSet', comparisonType:'not equal',value:'wrongSet'}
        ]
    },
    class:{
        id:'class',
        name:'Учебный класс',
        img:Images.locations.class,
        panelsVision:{time:'block',optionsPanel:'block',inventar:'block', tablet:'block'},
        transitions:[
            {name:'Холл колледжа',location:'college',img:Images.ico.chevronRight,indentationTop:'26vw',indentationLeft:'52vw', transitionTime:5},
        ],
        actionRoom:[],
        actions:[],
        instantAction:[],
        conditions:[
            {item:'clothingSet', comparisonType:'not equal',value:'wrongSet'}
        ]
    },
}

export default locations;