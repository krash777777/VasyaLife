import Images from './db_img.jsx';
import playerOptions from './db_playerOptions.jsx';
import scenes from './db_scenesGeneral.jsx';

const instantActions = {
    sleep:{
        id:'sleep',
        ico:Images.ico.sleep,
        text:'Спать',
        actions:[
            {type:'scene',
                data:scenes.sleep,
                conditions:[
                    {optionType:'options', option:playerOptions.lifeEnergy, type:'less', value:480},
                ]
            },
            {type:'scene',
                data:scenes.doNotWontSleep,
                conditions:[
                    {optionType:'options', option:playerOptions.lifeEnergy, type:'more', value:481},
                ]
            }
        ]

    },
    test:{
        id:'test',
        ico:Images.ico.coffee,
        text:'test',
        scene:'',
    },

    // sleep:{
    //     id:'sleep',
    //     ico:Images.ico.sleep,
    //     image:Images.instantActions.sleep1,
    //     text:'Спать',
    //     animationTime:5,
    //     conditions:{
    //         playerOptions:[
    //             {option:playerOptions.lifeEnergy, type:'less', value:480}
    //         ],
    //     },
    //     changesGameOptions:{
    //         transitionTime:'',
    //         playerOptions:[
    //             {option:playerOptions.money, changeType:'decrease', value:12},
    //         ],
    //         modifiers:[],
    //         items:[]
    //     }
    // },
}

export default instantActions;