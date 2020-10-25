import {findeValueOnTheArray} from './service.jsx';
import playerOptions from '../db/db_playerOptions.jsx';
import scenes from '../db/db_scenesGeneral.jsx';
import templates from '../db/db_templates.jsx';
import locations from '../db/db_locations.jsx';
import {goToLocation, relax, scene, useItem, purchaseGoods, purchaseClothing, removeItem, receiveItem} from './events.jsx';
import items from '../db/db_items.jsx';
import clothingSets from '../db/db_clothingSets.jsx';

function changeTimeData(CurrentTimeAndDate, Interval){
    return alert('переделать эту процедуру изменения времени на общую');;
}

function changeTime(interval, gameStatus) {

    let currentTime = gameStatus.General.dateAndTime;
    let modifiedTime = currentTime.time+interval;

    //23 часа * 60 + 59 минут = 1380 +59 = 1439

    let time = modifiedTime>1439 ? modifiedTime-1439 : modifiedTime;
    let hours = Math.floor(time/60);
    let minutes = Math.floor(time - hours*60);

    let dayCounterModifier = modifiedTime>1439 ? 1 : 0;
    let daysCounter = currentTime.daysCounter+dayCounterModifier;
    let dayOfTheWeek = currentTime.dayOfTheWeek == 6 ? 0 : currentTime.dayOfTheWeek+dayCounterModifier;

    let hoursBeforeChange = Math.floor(currentTime.time/60);
    //console.log('hoursBeforeChange:'+hoursBeforeChange+' after:'+hours);

    let prefixH = hours<10 ? '0' : '';
    let prefixM = minutes<10 ? '0' : '';

    let dayOfTheWeekNames = ['Воскресенье','Понедельник', 'Вторник','Среда','Четверг','Пятница','Суббота'];

    gameStatus.General.dateAndTime.time = time;
    gameStatus.General.dateAndTime.daysCounter = daysCounter;
    gameStatus.General.dateAndTime.dayOfTheWeek = dayOfTheWeek;

    //запустим события, при смене суток ( во время перехода от 23 часов к 0)
    if (hoursBeforeChange==23 && hours==0){
        changesInTheGameWorldWhenTheDayChanges(gameStatus);
    }

    //изменим действие модификаторов
    let playerModifiers = gameStatus.Player.modifiers;
    for(var i = 0; i < playerModifiers.length; i++) {
        var currentModifier = playerModifiers[i].modifier;
        var balanceTime = playerModifiers[i].actionTime;

        var balance = balanceTime-interval;

        //удаляем модфиикатор, если время вышло
        if (balance<=0){
            gameStatus = deleteModifier(currentModifier, gameStatus);
            gameStatus = refreshCharacteristics(gameStatus);
        } else {
            playerModifiers[i].actionTime = balance;
        }
    }

    return gameStatus;
}

function parseTimeData(time){
    const hours = Math.floor(time/60);
    const prefixH = hours<10 ? '0' : '';

    const minutes = Math.floor((time - hours*60));
    const prefixM = minutes<10 ? '0' : '';

    const Time = {hours: hours, prefixH:prefixH, minutes: minutes, prefixM:prefixM}
    return Time;
}

function changesInTheGameWorldWhenTheDayChanges(gameStatus) {

    //пока не придумал, как реально буду применять эту процедуру

    //alert('change of day');

    //предметы в локациях при смене суток

    //добавим яблоко в тумбочку в холле ... для примера
    let storeReceiver = gameStatus.WorldSettings.worldItemStorage.hall;
    gameStatus = receiveItem(items.food.apple, storeReceiver, 1, gameStatus);

    //NPC - настроение (восстановление до нормы)

    return gameStatus;
}

function changeOption(optionId, type, value, limit, gameStatus) {

    //alert(optionId+' - '+type+' - '+value+' - '+limit);
    //console.log('otion:'+optionId+', type:'+type+', value:'+value+', limit:'+limit);


    //описание передаваемых данных
    //optionId - опция, которую мы собираемся изменять
    //type - тип изменения (increase - увеличение, decrease - уменьшение, equally - равенство)
    //value - значение - передает игрок для изменяни текущего состояния параметра
    //limit - максимально доступное значение параметра от текущего действия (защита от фарма) - может принимать значение 'notLimited', что означет ограничение только параметрами базы данных


    const arrOptions = gameStatus.Player.options;

    let optionIndex = findeValueOnTheArray(playerOptions[optionId].id, arrOptions, 'arrayOptionId');
    let currentValue = arrOptions[optionIndex].value;
    let minValue = playerOptions[optionId].minValue;
    let normaValue = playerOptions[optionId].norm;
    let maxValue = playerOptions[optionId].maxValue;

    let charIndex = findeValueOnTheArray(playerOptions[optionId].id, gameStatus.Player.characteristics, 'arrayOptionId');
    let charValueBeforeChange = gameStatus.Player.characteristics[charIndex].totalValue;

    //==============================================================
    //Программируем действия до нормы

    //1. ограничиваем до возможной нормы игровой ситуации - чтобы избежать фарма
    let maxAvailableValue = normaValue;
    if (limit !== 'notLimited'){
        maxAvailableValue = limit>=normaValue?normaValue:limit;
    }

    //2. изменяем параметр
    let balance = type == 'increase'?currentValue+value:type == 'decrease'?currentValue-value:value;

    if (type == 'increase'){
        balance = balance>maxAvailableValue?maxAvailableValue:balance;
    } if (type == 'decrease'){
        balance = balance<minValue?minValue:balance;
    } if (type == 'equally'){
        //проверим разработчика на адекватность - а вдруг, в какой нибудь сцене, он ступит и приравняет опцию так, что она станет больше доступного?
        balance = value>=maxAvailableValue?maxAvailableValue:value<=minValue?minValue:value;
    }

    gameStatus.Player.options[optionIndex].value = balance;

    changeCharacteristics(optionId, optionIndex, gameStatus);

    //3. Запускаем мгновенное событие, в зависимости от параметров
    //вычисляем значение характеристики (с учетом можификаторов)

    let charValueAfterChange = gameStatus.Player.characteristics[charIndex].totalValue;
    
    //3.1 Сообщаем игроку, что он находится в опасной близости к завершению игры ... ему нужно что то делать
    if (type == 'decrease'){
        if (optionId=='lifeEnergy'){
            if ((charValueBeforeChange>=50) && (charValueAfterChange<50)){
                doInstantActions(scenes.warning_lifeEnergyUnder50, gameStatus);
            }
            if ((charValueBeforeChange>=10) && (charValueAfterChange<10)){
                doInstantActions(scenes.warning_lifeEnergyUnder10, gameStatus);
            }
        }
    }

    //test

    return gameStatus;
}

function changeNpcOption(npc, option, type, value, limit, gameStatus) {

    let npcGlobal = gameStatus.Npc;

    for(var i = 0; i < npcGlobal.length; i++) {

        if (npcGlobal[i].npc.id == npc.id){
            let currentValue = npcGlobal[i][option];

            let balance = type == 'increase'?currentValue+value:type == 'decrease'?currentValue-value:value;

            if (type == 'increase'){
                if (balance<=limit){
                    gameStatus.Npc[i][option] = balance;
                } if (balance>limit){
                    gameStatus.Npc[i][option] = limit;
                }
            } else {
                gameStatus.Npc[i][option] = balance;
            }

        }
    }

    return gameStatus;
}

function changeCharacteristics(optionId, optionIndex, gameStatus) {

    const optionCurrentValue = gameStatus.Player.options[optionIndex].value;
    const modifiers = gameStatus.Player.modifiers;

    const clothingEffect = 0;


    var summModifierEffect = 0;
    for(var i = 0; i < modifiers.length; i++) {

        var modifiers2 = modifiers[i].modifier.modifiers;

        for(var a = 0; a < modifiers2.length; a++) {

            var optionM = modifiers2[a].option;

            //ищем влияние модификатора на наш параметр
            if (optionId == optionM.id){
                summModifierEffect = summModifierEffect+modifiers2[a].value;
            }
        }
    }

    let totalValueCharacteristics = optionCurrentValue+summModifierEffect+clothingEffect<0?0:optionCurrentValue+summModifierEffect+clothingEffect;

    gameStatus.Player.characteristics[optionIndex].optionValue = optionCurrentValue;
    gameStatus.Player.characteristics[optionIndex].modifierValue = summModifierEffect;
    gameStatus.Player.characteristics[optionIndex].clothingValue = clothingEffect;
    gameStatus.Player.characteristics[optionIndex].totalValue = totalValueCharacteristics;


    var appearance = getAppearance(gameStatus.Player.options[optionIndex].option, totalValueCharacteristics);

    gameStatus.Player.characteristics[optionIndex].style = appearance.style;
    gameStatus.Player.characteristics[optionIndex].animation = appearance.animation



    //==============================================================
    //Программируем результат от внесенных изменений
    //например - смерть, от того, что закончилась жизненная энергия или не хватает денег

    let cancel = '';
    if (optionId == 'morale'){



    }if (optionId == 'lifeEnergy'){
        if (totalValueCharacteristics <= 0){
            //жизненные силы закончились ... запускаем сцену завершения игры
            doInstantActions(scenes.death, gameStatus);
        }
    } if (optionId == 'sexEnergy'){

    } if (optionId == 'concentration'){

    } if (optionId == 'mana'){

    }

    //==============================================================
    //Программируем воздействие надетых вещей


    return gameStatus;
}

function doInstantActions(scene, gameStatus) {

    gameStatus.General.tpl = templates.scene;
    gameStatus.General.action = scene;

    return gameStatus;
}

function getAppearance(option, totalValue) {

    var animation = '';
    var style = 'styleValueNormal';

    if (option.id == 'lifeEnergy') {

        let medium = option.maxValue * 0.5;
        let low = option.maxValue * 0.25;
        let veryLow = option.maxValue * 0.1;

        if (totalValue > option.norm) {
            style = 'styleValueVeryHigh';
        }
        if (totalValue <= option.norm & totalValue > medium) {
            style = 'styleValueHigh';
        }
        if (totalValue <= medium & totalValue > low) {
            style = 'styleValueNormal';
            // animation = 'anima-heart-low-speed';
        }
        if (totalValue <= low & totalValue > veryLow) {
            style = 'styleValueLow';
            animation = 'anima-heart-medium-speed';
        }
        if (totalValue <= veryLow) {
            style = 'styleValueVeryLow';
            animation = 'anima-heart-high-speed';
        }

    }

    return {style:style, animation:animation};
}

function changeGameStates_fromScene(options, gameStatus) {

    let arrQuests = gameStatus.GameMarks.quests;

    for(var i = 0; i < options.length; i++){
        var type = options[i].changeType;

        if (type == 'addQuest'){

            arrQuests[arrQuests.length]= options[i].changeValue;

        } if (type == 'deleteQuest'){
            var questId = findeValueOnTheArray(options[i].changeValue.id, arrQuests, 'arrayQuest');

            if (questId !== -1){
                arrQuests.splice(questId,1); // удаляем квест
            }

        } if (type == 'addModifier'){

            gameStatus = addModifier(options[i].changeValue, gameStatus);

        } if (type == 'deleteModifier'){

            gameStatus = deleteModifier(options[i].changeValue, gameStatus);

        } if (type == 'addRecipe'){

            gameStatus = addRecipeOnTheList(options[i].changeValue, gameStatus)

        } if (type == 'changeOptions'){

            var changeOptions = options[i].changeValue;
            for(var optIndex = 0; optIndex < changeOptions.length; optIndex++) {
                gameStatus = changeOption(changeOptions[optIndex].option.id, changeOptions[optIndex].type, changeOptions[optIndex].value, changeOptions[optIndex].limit, gameStatus);
            }

        } if (type == 'changeNpcOptions'){

            var changeNpcOptions = options[i].changeValue;
            for(var optIndex = 0; optIndex < changeNpcOptions.length; optIndex++) {
                gameStatus = changeNpcOption(changeNpcOptions[optIndex].npc, changeNpcOptions[optIndex].option, changeNpcOptions[optIndex].type, changeNpcOptions[optIndex].value, changeNpcOptions[optIndex].limit, gameStatus);
            }

        } if (type == 'changeTime'){

            gameStatus = changeTime(options[i].changeValue,gameStatus);

        } if (type == 'playerItems'){

            var changeItems = options[i].changeValue;
            for(var itemIndex = 0; itemIndex < changeItems.length; itemIndex++) {
                if (changeItems[itemIndex].type == 'decrease'){
                    gameStatus = removeItem(changeItems[itemIndex].item, gameStatus.Player.playerStore.items, gameStatus);
                }if (changeItems[itemIndex].type == 'increase'){
                    gameStatus = receiveItem(changeItems[itemIndex].item.item, gameStatus.Player.playerStore.items, 1, gameStatus);
                }
            }
        }
    }

    return gameStatus;
}

function refreshCharacteristics(gameStatus) {

    let options = gameStatus.Player.options;
    for(var i = 0; i < options.length; i++) {

        gameStatus = changeCharacteristics(options[i].option.id, i, gameStatus);

    }

    return gameStatus;
}

function addModifier(modifier, gameStatus) {

    let playerModifiers = gameStatus.Player.modifiers;

    //ищем действующий такой модификатор, если не неходим, то добавляем, если находим то обновляем время действия
    var modifireIndex = findeValueOnTheArray(modifier.id, playerModifiers, 'arrayModifireId');

    if (modifireIndex == -1) {

        playerModifiers[playerModifiers.length] = {modifier:modifier, actionTime:modifier.actionTime};
    } else {
        //обновляем время
        // console.log(playerModifiers[modifireIndex].actionTime+' - ');
        // console.log(modifier.actionTime);

        playerModifiers[modifireIndex].actionTime = modifier.actionTime;

    }

    gameStatus = refreshCharacteristics(gameStatus);

    return gameStatus;
}

function deleteModifier(modifier, gameStatus) {

    let playerModifiers = gameStatus.Player.modifiers;

    var modifierId = findeValueOnTheArray(modifier.id, playerModifiers, 'arrayModifireId');

    if (modifierId !== -1){
        playerModifiers.splice(modifierId,1); // удаляем модификатор
        gameStatus = refreshCharacteristics(gameStatus);
    }

    return gameStatus;
}

function addRecipeOnTheList(recipe, gameStatus) {
    let playerRecipeList= gameStatus.Player.recipesAccess;

    //ищем в списке наш рецепт ... если не находим, то добавляем
    var excitiongRecipe = findeValueOnTheArray(recipe, playerRecipeList, 'arrayRecipeList');

    if (excitiongRecipe == -1){
        playerRecipeList[playerRecipeList.length] = {recipe:recipe};
        gameStatus.Player.recipesAccess = playerRecipeList;
    }

    return gameStatus;
}

function changeClothes(options, gameStatus) {

    if (options.type == 'putOn'){

        //нужно очистить ячейку части тела, прежде чем помещать туда одежду
        const arrItemOnTheBody = findeValueOnTheArray(options.itemOfClothing.partOfBody, gameStatus.Player.clothingOnTheBody, 'arrayTypeClothing');
        if (arrItemOnTheBody !== -1){
            gameStatus.Player.playerStore.clothing[gameStatus.Player.playerStore.clothing.length] = arrItemOnTheBody.itemOfClothing;
            gameStatus.Player.clothingOnTheBody.splice(arrItemOnTheBody.index,1);
        }

        //выполним перемещение одежды на тело
        gameStatus.Player.clothingOnTheBody[gameStatus.Player.clothingOnTheBody.length] = options.itemOfClothing;
        gameStatus.Player.playerStore.clothing.splice(options.index,1);

        //добавим модификаторы одежды
        if (options.itemOfClothing.modifire!==''){
            gameStatus = addModifier(options.itemOfClothing.modifire, gameStatus);
        }

    }if (options.type == 'takeOff'){
        gameStatus.Player.playerStore.clothing[gameStatus.Player.playerStore.clothing.length] = options.itemOfClothing;
        gameStatus.Player.clothingOnTheBody.splice(options.index,1);

        //удалим модификаторы одежды
        if (options.itemOfClothing.modifire!==''){
            gameStatus = deleteModifier(options.itemOfClothing.modifire, gameStatus);
        }
    }

    let foundClosingSet = checkClothingSet(gameStatus.Player.clothingOnTheBody);
    if (foundClosingSet!==-1){

        //нужно удалить модификатор который стоял до этого
        if (gameStatus.Player.clothingSet.modifire!=='') {
            gameStatus = deleteModifier(gameStatus.Player.clothingSet.modifire, gameStatus);
        }

        //добавим модификатор сета
        if (foundClosingSet.modifire!==''){
            gameStatus = addModifier(foundClosingSet.modifire, gameStatus);
        }

        gameStatus.Player.clothingSet = foundClosingSet;
    } else {
        //console.log(gameStatus.Player.clothingSet);

        //удалим модификаторы сета
        if (gameStatus.Player.clothingSet.modifire!==''){
            gameStatus = deleteModifier(gameStatus.Player.clothingSet.modifire, gameStatus);
        }

        gameStatus.Player.clothingSet = clothingSets.wrongSet;

        if (clothingSets.wrongSet.modifire!==''){
            gameStatus = addModifier(clothingSets.wrongSet.modifire, gameStatus);
        }
    }


    //gameStatus.Player.clothingSet = getClothingSet(gameStatus.Player.clothingOnTheBody, gameStatus);

    return gameStatus;
}

function checkClothingSet(arrItemsOnTheBody) {

    for(var set in clothingSets){

        //body
        const itmBody = findeValueOnTheArray('body', arrItemsOnTheBody, 'arrayTypeClothing')==-1?'empty':findeValueOnTheArray('body', arrItemsOnTheBody, 'arrayTypeClothing').itemOfClothing.id;
        const itmSetBody  = clothingSets[set].clothingOnTheBody.body=='empty'?'empty':clothingSets[set].clothingOnTheBody.body.id;
        const comparisonResultBody = clothingSets[set].clothingOnTheBody.body=='irrelevant'?0:(itmBody==itmSetBody?0:1);

        //legs
        const itmLegs = findeValueOnTheArray('legs', arrItemsOnTheBody, 'arrayTypeClothing')==-1?'empty':findeValueOnTheArray('legs', arrItemsOnTheBody, 'arrayTypeClothing').itemOfClothing.id;
        const itmSetLegs  = clothingSets[set].clothingOnTheBody.legs=='empty'?'empty':clothingSets[set].clothingOnTheBody.legs.id;
        const comparisonResultLegs = clothingSets[set].clothingOnTheBody.legs=='irrelevant'?0:(itmLegs==itmSetLegs?0:1);

        //chest
        const itmChest = findeValueOnTheArray('chest', arrItemsOnTheBody, 'arrayTypeClothing')==-1?'empty':findeValueOnTheArray('chest', arrItemsOnTheBody, 'arrayTypeClothing').itemOfClothing.id;
        const itmSetChest  = clothingSets[set].clothingOnTheBody.chest=='empty'?'empty':clothingSets[set].clothingOnTheBody.chest.id;
        const comparisonResultChest = clothingSets[set].clothingOnTheBody.chest=='irrelevant'?0:(itmChest==itmSetChest?0:1);

        //hips
        const itmHips = findeValueOnTheArray('hips', arrItemsOnTheBody, 'arrayTypeClothing')==-1?'empty':findeValueOnTheArray('hips', arrItemsOnTheBody, 'arrayTypeClothing').itemOfClothing.id;
        const itmSetHips  = clothingSets[set].clothingOnTheBody.hips=='empty'?'empty':clothingSets[set].clothingOnTheBody.hips.id;
        const comparisonResultHips = clothingSets[set].clothingOnTheBody.hips=='irrelevant'?0:(itmHips==itmSetHips?0:1);

        const comparisonResult = comparisonResultBody+comparisonResultLegs+comparisonResultChest+comparisonResultHips;

        if (comparisonResult==0){
            return clothingSets[set];
        }
    }

    return -1;
}

export {changeTimeData, parseTimeData, changeOption, changeTime, changeGameStates_fromScene, addModifier, deleteModifier, addRecipeOnTheList, changeClothes};
