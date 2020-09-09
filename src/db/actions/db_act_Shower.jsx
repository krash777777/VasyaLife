import Images from '../db_img.jsx';
import Video from '../db_video.jsx';
import playerOptions from '../db_playerOptions.jsx';
import playerOptionsModifiers from '../db_playerOptionsModifiers.jsx';

const actShower = {
    shower:{
        init:{
            id:'init',
            video:Video.character.shower.shower0_init,
            transitions:[
                {text:'Гель для душа',img:Images.ico.dispenser,address:'shower1_wash',
                    changeOptions:[
                        {option:playerOptions.lifeEnergy, type:'increase',limit:700, value:20}
                ],
                    modifiers:[]
                },
                {text:'Растереться полотенцем',img:Images.ico.towel,address:'shower8_end',
                    changeOptions:[
                        {option:playerOptions.lifeEnergy, type:'increase',limit:700, value:20},
                        {option:playerOptions.morale, type:'increase',limit:50, value:10},
                ],
                    modifiers:[
                        {type:'addModifier', modifier:playerOptionsModifiers.shower},
                    ]
                },
                {text:'Закончить',img:Images.ico.crossRed,address:'end', changeOptions:[]},
            ],
        },
        shower1_wash:{
            id:'shower1_wash',
            video:Video.character.shower.shower1_wash,
            transitions:[
                {text:'Смыть гель',img:Images.ico.shower,address:'init',
                    changeOptions:[
                        {option:playerOptions.sexEnergy, type:'increase',limit:5, value:2},
                    ],
                    modifiers:[]
                },
                {text:'Душь в ванной',img:Images.ico.bath,address:'shower3_playWithPussy', changeOptions:[],modifiers:[]},
                {text:'Помыть киску',img:Images.ico.orbBlue,address:'shower2_washPussy',
                    changeOptions:[
                        {option:playerOptions.sexEnergy, type:'increase',limit:5, value:2},
                    ],
                    modifiers:[]
                },
            ],
        },
        shower2_washPussy:{
            id:'shower2_washPussy',
            video:Video.character.shower.shower2_washPussy,
            transitions:[
                {text:'Растереться полотенцем',img:Images.ico.towel,address:'shower8_end', changeOptions:[],modifiers:[]},
            ],
        },
        shower3_playWithPussy:{
            id:'shower3_playWithPussy',
            video:Video.character.shower.shower3_playWithPussy,
            transitions:[
                {text:'Играть с киской',img:Images.ico.female,address:'shower4_playWithPussy', changeOptions:[],modifiers:[]},
            ],
        },
        shower4_playWithPussy:{
            id:'shower4_playWithPussy',
            video:Video.character.shower.shower4_playWithPussy,
            transitions:[
                {text:'Играть с дилдо',img:Images.ico.female,address:'shower5_playWithDildo', changeOptions:[],modifiers:[]}, // тут должно быть условие
            ],
        },
        shower5_playWithDildo:{
            id:'shower5_playWithDildo',
            video:Video.character.shower.shower5_playWithDildo,
            transitions:[
                {text:'Взять в рот',img:Images.ico.female,address:'shower6_suckDildo', changeOptions:[],modifiers:[]},
                {text:'Закончить',img:Images.ico.crossRed,address:'end', changeOptions:[]},
            ],
        },
        shower6_suckDildo:{
            id:'shower6_suckDildo',
            video:Video.character.shower.shower6_suckDildo,
            transitions:[
                {text:'Мастурбация',img:Images.ico.strawberry,address:'shower7_dildo', changeOptions:[],modifiers:[]},
                {text:'Взять в рот',img:Images.ico.female,address:'shower6_suckDildo', changeOptions:[],modifiers:[]},
                {text:'Закончить',img:Images.ico.crossRed,address:'end', changeOptions:[],modifiers:[]},
            ],
        },
        shower7_dildo:{
            id:'shower7_dildo',
            video:Video.character.shower.shower7_dildo,
            transitions:[
                {text:'Растереться полотенцем',img:Images.ico.towel,address:'shower8_end', changeOptions:[],modifiers:[]},
                {text:'Закончить',img:Images.ico.crossRed,address:'end', changeOptions:[],modifiers:[]},
            ],
        },
        shower8_end:{
            id:'shower8_end',
            video:Video.character.shower.shower8_end,
            transitions:[
                {text:'Закончить',img:Images.ico.crossRed,address:'end', changeOptions:[],modifiers:[]},
            ],
        },
    }
}

export default actShower;