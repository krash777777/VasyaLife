import {findeNpcInLocation, findeValueOnTheArray} from './service.jsx';
import {changeOption, changeTime, addModifier, deleteModifier} from './options.jsx';
import playerOptions from '../db/db_playerOptions.jsx';
import scenes from '../db/db_scenesGeneral.jsx';
import templates from '../db/db_templates.jsx';
import locations from '../db/db_locations.jsx';
import items from '../db/db_items.jsx';
import Images from '../db/db_img.jsx';


function checkConditions(act, arrConditions, gameStatus) {

    //console.log(arrConditions);

    let checkSum = 0;

    let gameOptions = gameStatus.Player.characteristics;

    for(var i = 0; i < arrConditions.length; i++) {

        var checkValue = 1;

        var condition= arrConditions[i];
        var optionType = condition.optionType;
        var conditionValue = condition.value;
        var conditionType = condition.type;

        if (optionType == 'options'){

            let optionIndex = findeValueOnTheArray(condition.option.id, gameOptions, 'arrayOptionId');
            let currentValue = gameOptions[optionIndex].totalValue;

            //console.log(gameOptions[optionIndex]);
            //console.log('optionIndex:'+optionIndex+' :-: currentValue:'+currentValue+': - : conditionValue:'+conditionValue+' :-: conditionType:'+conditionType);

            if (conditionType == 'less'){
                checkValue = currentValue<conditionValue?0:1;
            }
            if (conditionType == 'more'){
                checkValue = currentValue>conditionValue?0:1;
            }
        }
        checkSum = checkSum+checkValue;
    }

    //console.log('checkSum = '+checkSum);

    if (checkSum ==0){
        return act;
    } else {
        return -1;
    }

}

function doInstanAction(options, gameStatus) {
    let actions = options.act.actions;

    for(var i = 0; i < actions.length; i++) {

        var act = actions[i];
        var conditions = act.conditions;

        var focusAct = checkConditions(act, conditions, gameStatus);

        if (focusAct !==-1){
            gameStatus.General.tpl = templates.scene;
            gameStatus.General.action = focusAct.data;
        }

    }

    return gameStatus;
}

export {doInstanAction};
