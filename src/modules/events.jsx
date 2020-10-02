import {findeNpcInLocation, findeValueOnTheArray} from './service.jsx';
import {changeOption, changeTime, addModifier, deleteModifier, parseTimeData} from './options.jsx';
import playerOptions from '../db/db_playerOptions.jsx';
import scenes from '../db/db_scenesGeneral.jsx';
import templates from '../db/db_templates.jsx';
import locations from '../db/db_locations.jsx';
import items from '../db/db_items.jsx';

function relax(options, gameStatus){

    gameStatus = changeOption('lifeEnergy', 'increase', options.interval/15, 480, gameStatus);
    gameStatus = changeOption('morale', 'increase', 2, 10, gameStatus);
    gameStatus = changeTime(options.interval, gameStatus);
    gameStatus.General.npcInLocation = findeNpcInLocation(gameStatus);

    return gameStatus;
}

function scene(options, gameStatus){

    let changeOptions = options.changeOptions;
    let changeModifiers = options.modifiers;

    for(var i = 0; i < changeOptions.length; i++) {
        gameStatus = changeOption(changeOptions[i].option.id, changeOptions[i].type, changeOptions[i].value, changeOptions[i].limit, gameStatus);
    }

    for(var m = 0; m < changeModifiers.length; m++) {
        var mod = changeModifiers[m];

        if (mod.type =='addModifier'){
            gameStatus = addModifier(mod.modifier, gameStatus);
        }if (mod.type =='deleteModifier'){
            gameStatus = deleteModifier(mod.modifier, gameStatus);
        }
    }

    return gameStatus;
}

function checkingConditions(comparisonType,comparisonValue,value) {

    // console.log(comparisonValue);
    // console.log(comparisonType);
    // console.log(value);

    if (comparisonType == 'equal') {
        if (comparisonValue == value) {
            return 1
        }
    }
    if (comparisonType == 'not equal') {
        if (comparisonValue !== value) {
            return 1
        }
    }
    if (comparisonType == 'more') {
        if (comparisonValue > value) {
            return 1
        }
    }
    if (comparisonType == 'less') {
        if (comparisonValue < value) {
            return 1
        }
    }
    return -1;
}

function goToLocation(options, gameStatus){

    let checkSumOfConditions = 0; let comment = '';
    let locConditions = locations[options.location].conditions;
    for (let i=0; i<locConditions.length;i++) {
        let comparisonType = locConditions[i].comparisonType;
        let comparisonValue = locConditions[i].value;

        if (locConditions[i].item == 'clothingSet'){
            if (checkingConditions(comparisonType, comparisonValue, gameStatus.Player.clothingSet.id)==-1){
                checkSumOfConditions++;
                comment = comment+'\n Я не могу в таком виде попасть в эту локацию (нужно сменить стиль одежды).';
            }
        }
        if (locConditions[i].item == 'timeHour'){
            let currentTime = gameStatus.General.dateAndTime.time;
            let Time = parseTimeData(currentTime);
            //console.log(currentTime);
            if (checkingConditions(comparisonType, comparisonValue, Time.hours)==-1){
                checkSumOfConditions++;
                comment = comment+'\n Нужно прийти в другое время.';
            }
        }
        if (locConditions[i].item == 'item'){
            let itemInInventory = findeValueOnTheArray(comparisonValue, gameStatus.Player.playerStore.items, 'arrayItemId');

            if (itemInInventory==-1){
                    checkSumOfConditions++;
                    comment = comment+'\n У меня нет подходящего предмета ('+comparisonValue+') для доступа в локацию';
            }
        }
    }

    if (checkSumOfConditions>0){
        alert(comment);
        return gameStatus;
    } else {
        //изменение жизненной энергии примем как 1/5, то есть от 5 минут времени изменяется одна единица жизненной энергии
        gameStatus = changeTime(options.interval, gameStatus);

        gameStatus = changeOption('lifeEnergy', 'decrease', options.interval/5, 'notLimited', gameStatus);

        gameStatus.General.location = locations[options.location];

        gameStatus.General.npcInLocation = findeNpcInLocation(gameStatus);

        return gameStatus;
    }
    // gameStatus.General.location = locations[options.location];
    //
    // gameStatus.General.npcInLocation = findeNpcInLocation(gameStatus);
    //
    // return gameStatus;
}

function useItem(options, gameStatus){

    let item = options.item;
    let interactionIndex = options.interactionIndex;

    let interactions = item.interactions[interactionIndex];

    let pOptions = interactions.instantEffects;
    let modifiers = interactions.modifiers;

    let replacementItems = interactions.replacementItems;

    if (interactions.length !== 0){
        let playerStoreItems = gameStatus.Player.playerStore.items;

        //тут мы удаляем один предмет, который использовали
        gameStatus = removeItem(item, playerStoreItems, gameStatus);

        //изменяем опции (параметры)
        for(var i = 0; i < pOptions.length; i++) {
            gameStatus = changeOption(pOptions[i].option.id, pOptions[i].type, pOptions[i].value, pOptions[i].limit, gameStatus);
        }

        //добавляем модификаторы
        if (modifiers.length !==0){
            for(var mIndex = 0; mIndex < modifiers.length; mIndex++) {
                var type = modifiers[mIndex].type;

                if (type == 'addModifier'){
                    gameStatus = addModifier(modifiers[mIndex].modifier, gameStatus);
                } if (type == 'deleteModifier'){
                    gameStatus = deleteModifier(modifiers[mIndex].modifier, gameStatus);
                }
            }
        }

        //добавляем предмет
        for(var a = 0; a < replacementItems.length; a++) {
            var newItem = items[replacementItems[a].itemGroup][replacementItems[a].itemId];
            gameStatus = receiveItem(newItem, playerStoreItems, replacementItems[a].quantity, gameStatus);
        }

    }

    return gameStatus;
}

function removeItem(item, store, gameStatus) {

    let receiverItemIndex = findeValueOnTheArray(item.id, store, 'arrayItemId');

    if (receiverItemIndex !== -1){
        var itemQuantity = store[receiverItemIndex].quantity-1;

        store[receiverItemIndex].quantity = itemQuantity;
        if (itemQuantity == 0){
            store.splice(receiverItemIndex,1);
        }
    }

    return gameStatus;
}

function receiveItem(item, store, quantity, gameStatus) {

    let itemIndex = findeValueOnTheArray(item.id, store, 'arrayItemId');
    if (itemIndex !== -1){
        store[itemIndex].quantity = store[itemIndex].quantity+quantity;
    } else {
        store[store.length] = {item:item,quantity:quantity};
    }

    return gameStatus;
}

function purchaseGoods(options, gameStatus) {

    let moneyIndex = findeValueOnTheArray('money', gameStatus.Player.options, 'arrayOptionId');
    let moneyBalance = gameStatus.Player.options[moneyIndex].value;

    if (moneyBalance>=options.goods.price){
        gameStatus = changeOption('money', 'decrease', options.goods.price, 'notLimited', gameStatus);
        gameStatus = receiveItem(options.goods, gameStatus.Player.playerStore.items, options.quantity, gameStatus);
    } else {
        alert('Не достоаточно денег для совершения операции!');
    }

    return gameStatus;
}

function purchaseClothing(options, gameStatus) {

    let moneyIndex = findeValueOnTheArray('money', gameStatus.Player.options, 'arrayOptionId');
    let moneyBalance = gameStatus.Player.options[moneyIndex].value;
    let currentStore = gameStatus.Player.playerStore[options.playerStore];
    let itemIndex = findeValueOnTheArray(options.clothing.id,currentStore, 'arrayClothingId');
    let clothingPrice = options.clothing.price;

    if (moneyBalance>=clothingPrice){
        if (itemIndex !== -1){
            //значит такая шмотка у нас уже есть в инвентаре

            alert('Такая одежда у нас уже есть в инвентаре!');
        } else {
            let clothingOnTheBodyIndex = findeValueOnTheArray(options.clothing.id,gameStatus.Player.clothingOnTheBody, 'arrayClothingId');
            if (clothingOnTheBodyIndex !==-1){
                alert('Такая вещь уже надета!');
            }else{
                gameStatus = changeOption('money', 'decrease', clothingPrice, 'notLimited', gameStatus);
                currentStore[currentStore.length] = options.clothing;
            }
        }
    } else {
        alert('Не достоаточно денег для совершения операции!');
    }

    return gameStatus;
}

export {goToLocation, relax, scene, useItem, purchaseGoods, purchaseClothing, removeItem, receiveItem};
