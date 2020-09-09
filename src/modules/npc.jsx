import npcLocationSchedule from '../db/db_npcLocationSchedule.jsx';
import {changeTimeData,parseTimeData} from './options.jsx';
import locations from '../db/db_locations.jsx';

function findeNpcInLocation(data, location){

    var arrNpc = [];

    for (var b = 0; b < npcLocationSchedule.length; b++) {
        const conditions = npcLocationSchedule[b].condition;

        //conditions
        var checkSumm = 0;
        for(var a = 0; a < conditions.length; a++) {

            var checkValue = 0;
            if (conditions[a].option == 'time'){
                const arrCurrentTimeValue = parseTimeData(data.General.dateAndTime.time);
                const currentTime = arrCurrentTimeValue.hours*60 + arrCurrentTimeValue.minutes;
                const conditionValue = conditions[a].valueHour*60+conditions[a].valueMinute;

                if(conditions[a].type == 'more'){
                    checkValue = currentTime>conditionValue?0:1;
                }if(conditions[a].type == 'less'){
                    checkValue = currentTime<conditionValue?0:1;
                }
            }if (conditions[a].option == 'location'){
                const currentLocation = locations[location].id;
                const conditionValue = conditions[a].value.id;

                if(conditions[a].type == 'equally'){
                    checkValue = currentLocation==conditionValue?0:1;
                }
            }

            checkSumm = checkSumm+checkValue;
        }

        if (checkSumm == 0){

            arrNpc[arrNpc.length] = {
                img:npcLocationSchedule[b].img,
                height:npcLocationSchedule[b].height,
                width:npcLocationSchedule[b].width,
                top:npcLocationSchedule[b].top,
                left:npcLocationSchedule[b].left,
                action:npcLocationSchedule[b].action,
            };
        }
     }

    return arrNpc;
}

export {findeNpcInLocation};
