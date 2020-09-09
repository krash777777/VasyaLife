import locations from './db_locations.jsx';
import Images from './db_img.jsx';
import Scenes from './db_scenesGeneral.jsx';
import npsStyles from './db_npcImageStyle.jsx';


const npc_locationSchedule = [
    {
        id:'momInParentRoom',
        scene:Scenes.mom_whitePanties,
        image:Images.npc.mom.external_whitePanties_surprised, height:'24vw', width:'8vw', top:'14vw', left:'25vw',
        condition:[
            {option:'time',type:'more', valueHour:8, valueMinute:0},
            {option:'time',type:'less', valueHour:8, valueMinute:59},
            {option:'location',type:'equally', value:locations.parentsRoom},
        ],
    },
    {
        id:'momInParentRoom',
        scene:Scenes.mom_whitePanties,
        image:Images.npc.mom.external_whitePanties_looking, height:'30vw', width:'10vw', top:'13vw', left:'52vw',
        condition:[
            {option:'time',type:'more', valueHour:9, valueMinute:0},
            {option:'time',type:'less', valueHour:9, valueMinute:59},
            {option:'location',type:'equally', value:locations.parentsRoom},
        ],
    },
    {
        id:'momInHall',
        scene:Scenes.mom_blackDress,
        image:Images.npc.mom.ico_mom_parantsRoom1, height:'33vw', width:'11vw', top:'12vw', left:'47vw',
        condition:[
            {option:'time',type:'more', valueHour:10, valueMinute:0},
            {option:'time',type:'less', valueHour:11, valueMinute:59},
            {option:'location',type:'equally', value:locations.hall},
        ],
    },
    {
        id:'momInKitchen',
        scene:Scenes.mom_blackDress,
        image:Images.npc.mom.ico_mom_parantsRoom1, height:'33vw', width:'11vw', top:'12vw', left:'47vw',
        condition:[
            {option:'time',type:'more', valueHour:12, valueMinute:0},
            {option:'time',type:'less', valueHour:12, valueMinute:59},
            {option:'location',type:'equally', value:locations.kitchen},
        ],
    },
    {
        id:'momInHall',
        scene:Scenes.mom_blackDress,
        image:Images.npc.mom.ico_mom_parantsRoom1, height:'33vw', width:'11vw', top:'12vw', left:'47vw',
        condition:[
            {option:'time',type:'more', valueHour:13, valueMinute:0},
            {option:'time',type:'less', valueHour:16, valueMinute:59},
            {option:'location',type:'equally', value:locations.hall},
        ],
    },
    {
        id:'momInKitchen',
        scene:Scenes.mom_blackDress,
        image:Images.npc.mom.ico_mom_parantsRoom1, height:'33vw', width:'11vw', top:'12vw', left:'47vw',
        condition:[
            {option:'time',type:'more', valueHour:17, valueMinute:0},
            {option:'time',type:'less', valueHour:17, valueMinute:59},
            {option:'location',type:'equally', value:locations.kitchen},
        ],
    },
    {
        id:'momInBathroom',
        scene:Scenes.mom_blackPanties,
        image:Images.npc.mom.external_blackPanties_back, height:'30vw', width:'10vw', top:'13vw', left:'32vw',
        condition:[
            {option:'time',type:'more', valueHour:16, valueMinute:0},
            {option:'time',type:'less', valueHour:19, valueMinute:59},
            {option:'location',type:'equally', value:locations.bathroom},
        ],
    },
    {
        id:'momInParentRoom',
        scene:Scenes.mom_whitePanties,
        image:Images.npc.mom.external_whitePanties_looking, height:'30vw', width:'10vw', top:'13vw', left:'52vw',
        condition:[
            {option:'time',type:'more', valueHour:20, valueMinute:0},
            {option:'time',type:'less', valueHour:21, valueMinute:59},
            {option:'location',type:'equally', value:locations.parentsRoom},
        ],
    },
    {
        id:'momSleepNaked',
        scene:Scenes.mom_whitePanties,
        image:Images.npc.mom.external_sleep_naked, height:'10vw', width:'22vw', top:'13vw', left:'52vw',
        condition:[
            {option:'time',type:'more', valueHour:22, valueMinute:0},
            {option:'time',type:'less', valueHour:23, valueMinute:59},
            {option:'location',type:'equally', value:locations.parentsRoom},
        ],
    },




    // ====================================




    {
        id:'principalInOffice',
        scene:Scenes.principalInOffice,
        image:Images.npc.principal.blueShirt_external1, height:'20vw', width:'15.5vw', top:'16vw', left:'14.6vw',
        condition:[
            {option:'time',type:'more', valueHour:8, valueMinute:0},
            {option:'time',type:'less', valueHour:22, valueMinute:59},
            {option:'location',type:'equally', value:locations.principalOffice},
        ],
    },
    {
        id:'ibrarianInLibrary',
        scene:Scenes.librarian,
        image:npsStyles.librarian.blueSkirt.external.external1, height:'28vw', width:'22vw', top:'14vw', left:'13vw',
        condition:[
            {option:'time',type:'more', valueHour:8, valueMinute:0},
            {option:'time',type:'less', valueHour:22, valueMinute:59},
            {option:'location',type:'equally', value:locations.library},
        ],
    },
    {
        id:'nurseInMedicalRoom',
        scene:Scenes.nurse,
        image:npsStyles.nurse.jeansShorts.external.external1, height:'28vw', width:'21vw', top:'15vw', left:'12vw',
        condition:[
            {option:'time',type:'more', valueHour:8, valueMinute:0},
            {option:'time',type:'less', valueHour:22, valueMinute:59},
            {option:'location',type:'equally', value:locations.medicalOffice},
        ],
    },
]


export default npc_locationSchedule;