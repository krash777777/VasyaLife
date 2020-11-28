import npcLocationSchedule from '../db/db_npcLocationSchedule.jsx';
import {changeTimeData,parseTimeData} from './options.jsx';
import locations from '../db/db_locations.jsx';
import recepies from '../db/db_recepies.jsx';

function findeValueOnTheArray(id, array, option){
    for(var i = 0; i < array.length; i++) {

        if(option == 'arrayItemId') {if(array[i].item.id === id) {return i}};
        if(option == 'arrayClothingId') {if(array[i].id === id) {return i}};
        if(option == 'arrayTypeClothing') {if(array[i].partOfBody === id) {return {index:i, itemOfClothing:array[i]}}}
        if(option == 'arrayOptionId') {if(array[i].option.id === id) {return i}};
        if(option == 'arrayModifireId') {if(array[i].modifier.id === id) {return i}};
        if(option == 'arrayRecipeList') {if(array[i].recipe === id) {return i}};
        if(option == 'arrayQuest') {if(array[i].id=== id) {return i}};
        if(option == 'arrayDailyMarks') {if(array[i].id=== id) {return i}};

    }
    return -1; //to handle the case where the value doesn't exist
}

function getNpcRelations(npc, arrNpcGlobal) {

    if (npc !== ''){
        for(var i = 0; i < arrNpcGlobal.length; i++) {
            if (arrNpcGlobal[i].npc.id == npc.id){
                return {relations:arrNpcGlobal[i].relations, corruption:arrNpcGlobal[i].corruption};
            }
        }
    }

    return undefined;
}

function checkConditions(conditions, gameStatus) {

    let conditionCount = 0;
    for (var i = 0; i < conditions.length; i++){
        //перебираем все указанные условия

        if (conditions[i].option == 'quest'){
            //проверям наличие квестов

            var arrQuests = gameStatus.GameMarks.quests
            if (conditions[i].type == 'equally'){
                for (var a = 0; a < arrQuests.length; a++){
                    if (arrQuests[a].id == conditions[i].value){
                        conditionCount++; // увеличиваем счетчик если есть такой активный квест
                    }
                }
            }
        }

        if (conditions[i].option == 'relations'){
            var npcRelations = getNpcRelations(conditions[i].npc, gameStatus.Npc);

            if (conditions[i].type == 'more'){if (npcRelations.relations > conditions[i].value){conditionCount++}}
            if (conditions[i].type == 'less'){if (npcRelations.relations < conditions[i].value){conditionCount++}}
            if (conditions[i].type == 'equally'){if (npcRelations.relations = conditions[i].value){conditionCount++}}

        }

        if (conditions[i].option == 'corruption'){
            var npcRelations = getNpcRelations(conditions[i].npc, gameStatus.Npc);

            if (conditions[i].type == 'more'){if (npcRelations.corruption > conditions[i].value){conditionCount++}}
            if (conditions[i].type == 'less'){if (npcRelations.corruption < conditions[i].value){conditionCount++}}
            if (conditions[i].type == 'equally'){if (npcRelations.corruption = conditions[i].value){conditionCount++}}
        }

        if (conditions[i].option == 'item'){
            let playerItems = gameStatus.Player.playerStore.items;

            for (var indexItem = 0; indexItem < playerItems.length; indexItem++){
                if (playerItems[indexItem].item.id == conditions[i].value.id){
                    conditionCount++;
                }
            }
        }

        if (conditions[i].option == 'time'){
            const arrCurrentTimeValue = parseTimeData(gameStatus.General.dateAndTime.time);
            const currentTime = arrCurrentTimeValue.hours*60 + arrCurrentTimeValue.minutes;
            const conditionValue = conditions[i].valueHour*60+conditions[i].valueMinute;

            if(conditions[i].type == 'more'){
                if (currentTime>conditionValue){conditionCount++}
            }if(conditions[i].type == 'less'){
                if (currentTime<conditionValue){conditionCount++}
            }
        }

        if (conditions[i].option == 'location'){
            if(conditions[i].type == 'equally'){
                if (conditions[i].value.id == gameStatus.General.location.id){conditionCount++}
            }
        }

        if (conditions[i].option == 'dailyMark'){

            let arrDailyMarks = gameStatus.GameMarks.dailyMarks;
            var markId = findeValueOnTheArray(conditions[i].value.id, arrDailyMarks, 'arrayDailyMarks');

            //console.log(conditions[i].value.id+' - '+conditions[i].type+' - '+markId);

            if(conditions[i].type == 'exist'){
                if (markId !== -1){conditionCount++}
            }if(conditions[i].type == 'doesNotExist'){
                if (markId == -1){conditionCount++}
            }
        }
    }



    if (conditions.length == conditionCount){
        return 'success';
    }

    return 'fail';
}

function findeNpcInLocation(gameStatus){
    var arrNpc = [];

    for (var b = 0; b < npcLocationSchedule.length; b++) {

        var checkConditionResult = checkConditions(npcLocationSchedule[b].condition, gameStatus);

        if (checkConditionResult == 'success'){
            arrNpc[arrNpc.length] = {
                image:npcLocationSchedule[b].image,

                height:npcLocationSchedule[b].height,
                width:npcLocationSchedule[b].width,
                top:npcLocationSchedule[b].top,
                left:npcLocationSchedule[b].left,

                scene:npcLocationSchedule[b].scene,
            };
        }
    }

    return arrNpc;
}

function checkSlots(craftStore, consist) {

    for (var i = 1; i < 5; i++) {
        var slot = 'slot'+i;
        var message = '';

        if (craftStore[slot].length !== 0) {
            if (craftStore[slot][0].item.id == consist.item.id) {

                if (craftStore[slot][0].quantity >= consist.quantity) {
                    //console.log(consist.item.id+' = succes -> '+slot);
                    //message = consist.item.id+' = succes -> '+slot;
                    return {checkResult:0, message:message};
                } else {
                    //console.log(consist.item.id+ ' X ->  не достаточное количество ->'+slot+' ('+craftStore[slot][0].quantity+'/'+consist.quantity+')');
                    message = consist.item.id+ ' <!> ->  не достаточное количество ->'+slot+' ('+craftStore[slot][0].quantity+'/'+consist.quantity+')';
                    return {checkResult:1, message:message}
                }
            }
        }
    }

    // на случай если все слоты пустые или не найдено совпадение
    return {checkResult:1, message:consist.item.id+' -> продукта в ячейках не найдено'}
}

function checkRecepie(recepie, craftStore){
    const consist = recepie.consist;
    var error = 0;
    for(var i = 0; i < consist.length; i++) {


        var arrCheckResult = checkSlots(craftStore, consist[i]);
        error = error+arrCheckResult.checkResult;

        if (arrCheckResult.checkResult=1){
            console.log(arrCheckResult.message);
        }
    }

    if (error==0){
        return recepie.result;
    }else{
        return -1;
    }
}

function findeRecepie(gameStatus, locationCraft) {
    const worldItemSorage = gameStatus.WorldSettings.worldItemStorage[locationCraft];

    let recepieObject = Object.keys(recepies); //преобразовали в неассациативный массив

    for(var i = 0; i < recepieObject.length; i++) {

        //console.log(recepieObject[i]);

        var recepie = recepies[recepieObject[i]];

        var checkResult = checkRecepie(recepie, worldItemSorage);

        if (checkResult !==-1){
            return checkResult;
        }
    }

    alert("Рецептов с такими ингридиентами не найдено ...");
    return -1; // на тот случай, если не нашли ни одного рецепта
}

function craft(options, gameStatus){
    const playerStorage = gameStatus.Player.playerStore.items;
    const worldItemSorage = gameStatus.WorldSettings.worldItemStorage[options.locationCraft];

    let recepie = findeRecepie(gameStatus,options.locationCraft);

    if (recepie!==-1){

        //очистим все ячейки
        for (var i = 1; i < 5; i++) {
            var slot = worldItemSorage['slot' + i];
            slot.splice(0,1);
        }
        //добавим в инвентарь результат готовки (причем нужно учесть, что предметов в результате может быть несколько)
        for (var a = 0; a < recepie.length; a++){
            var itemId = recepie[a].item.id;

            let receiverIndex = findeValueOnTheArray(itemId,playerStorage, 'arrayItemId');
            if (receiverIndex !== -1){
                playerStorage[receiverIndex].quantity = playerStorage[receiverIndex].quantity+recepie[a].quantity;
            } else {
                playerStorage[playerStorage.length] = {item:recepie[a].item,quantity:recepie[a].quantity};
            }
        }
    }

    return gameStatus;
}

export {findeValueOnTheArray, findeNpcInLocation, findeRecepie, getNpcRelations, checkConditions, craft};
