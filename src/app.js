import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransitionGroup } from 'react-transition-group';

import {changeGameStates_fromScene} from './modules/options.jsx';

import {goToLocation, relax, scene, useItem, purchaseGoods, purchaseClothing, removeItem, receiveItem} from './modules/events.jsx';
import {findeValueOnTheArray, findeRecepie, getNpcRelations, checkConditions, craft} from './modules/service.jsx';
import {sleep, doInstanAction} from './modules/eventsInstanActions.jsx';

//styles
import './styles/main.css';
import './styles/buttons.css';
import './styles/animate.css';
import './styles/scene.css';
import './styles/time.css';
import './styles/location.css';
import './styles/fonts.css';
import './styles/information.css';
import './styles/actionRoom.css';
import './styles/wardrobe.css';
import './styles/store.css';
import './styles/txtStyles.css';
import './styles/videoActions.css';

//teamplates
import HomePage from './homePage.jsx';
import Scene from './templates/tpl_scene.jsx';
import Location from './templates/tpl_location.jsx';
import AboutProject from './templates/tpl_aboutProject.jsx';
import Inventory from './templates/tpl_inventory.jsx';
import Information from './templates/tpl_info.jsx';
import Craft from './templates/tpl_craft.jsx';
import Store from './templates/tpl_store.jsx';
import StoreClothing from './templates/tpl_storeClothing.jsx';
import Wardrobe from './templates/tpl_wardrobe.jsx';
import MovingItems from './templates/tpl_movingItems.jsx';
import Action from './templates/tpl_action.jsx';
import InstantAction from './templates/tpl_instantAction.jsx';
import PlayerOptionsInfo from './templates/tpl_playerOptionsInfo.jsx';

//database
import templates from './db/db_templates.jsx';
import defaultValues from './db/db_default.jsx';
import locations from './db/db_locations.jsx';
import clothingSets from './db/db_clothingSets.jsx';
import playerOptions from './db/db_playerOptions.jsx';
import recepies from './db/db_recepies.jsx';
import scenes from './db/db_scenesGeneral.jsx';



class Game extends React.Component {
    constructor() {
        super();
        this.state = defaultValues.HomePage; //домашняя стрница, при запуске index.html
    }

    getClothingSet(arrItemsOnTheBody){

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
            //console.log(comparisonResultBody+'+'+comparisonResultLegs+'+'+comparisonResultChest+'+'+comparisonResultHips+'='+comparisonResult)

            if (comparisonResult==0){
                return clothingSets[set];
            }
        }
        return clothingSets.wrongSet;
    }

    homePageMenuCommands(command){
        const gameStatus = JSON.parse(localStorage.getItem("VL"));
        if (command == 'newGame'){
            if (gameStatus){
                let isNewGame = confirm("Существует уже сохраненная игра. Вы действительно хотите начать новую игру и удалить текущий прогресс?");

                if (isNewGame == true){
                    localStorage.removeItem("VL");
                    this.performTransformations(defaultValues.GameDefaultStates);
                }
            } else {
                this.performTransformations(defaultValues.GameDefaultStates);
            };
        } if (command == 'continue'){
            this.performTransformations(gameStatus);
        } if (command == 'aboutProject'){
            const thisState = this.state.General;
            thisState.tpl = templates.aboutProject;
            this.setState({General:thisState});
        }
    }

    findeSlot(worldItemSorage, item){

        //ищем слот, заполненный нашим предметом, если не находим, возвращаем пустой слот
        if(worldItemSorage.slot1.length !== 0){
            if(worldItemSorage.slot1[0].item.id == item.id){return {type:'increment',slot:'slot1'}}
        }
        if(worldItemSorage.slot2.length !== 0) {
            if (worldItemSorage.slot2[0].item.id == item.id) {return {type:'increment',slot:'slot2'}}
        }
        if(worldItemSorage.slot3.length !== 0) {
            if (worldItemSorage.slot3[0].item.id == item.id) {return {type:'increment',slot:'slot3'}}
        }
        if(worldItemSorage.slot4.length !== 0) {
            if (worldItemSorage.slot4[0].item.id == item.id) {return {type:'increment',slot:'slot4'}}
        }

        //ищем пустой
        if(worldItemSorage.slot1.length == 0){return {type:'add',slot:'slot1'}}
        if(worldItemSorage.slot2.length == 0){return {type:'add',slot:'slot2'}}
        if(worldItemSorage.slot3.length == 0){return {type:'add',slot:'slot3'}}
        if(worldItemSorage.slot4.length == 0){return {type:'add',slot:'slot4'}}
        else{
            alert('Все слоты заняты!');
            return -1; // в том случае, если все слоты заняты
        }
    }

    changeStates(command, options){
        var gameStatus = JSON.parse(localStorage.getItem("VL"));

        if (command == 'goToLocation'){

            gameStatus = goToLocation(options, gameStatus);

        }if (command == 'changeTpl'){

            gameStatus.General.tpl = options.tpl;

        }if (command == 'relax'){

            gameStatus = relax(options, gameStatus);
            //console.log(options);

        }if (command == 'launchScene'){

            gameStatus.General.tpl = templates.scene;
            gameStatus.General.action = options.arrNpc.scene;

        }if (command == 'nextScene'){

            gameStatus = scene(options, gameStatus);

        }if (command == 'sceneIsOver'){

            gameStatus.General.tpl = templates.location;
            gameStatus.General.action = null;

        }if (command == 'launchInstantAction'){

            //если включить код, это запустит интерыейс мгновенных действий.....сейчас принял решение что будем работать через события
            //gameStatus.General.tpl = templates.instantAction;

            //console.log(options);

            gameStatus = doInstanAction(options, gameStatus);

            // if (options.act.id == 'sleep') {
            //     //gameStatus = sleep(options, gameStatus);
            //
            //     gameStatus.General.tpl = templates.scene;
            //     gameStatus.General.action = scenes.sleep;
            //
            // } if (options.act.id == 'test'){
            //
            //     gameStatus.General.tpl = templates.instantAction;
            //     gameStatus.General.action = options.act;
            //
            // } else {
            //     alert('функции для мгновенного события <<'+options.act.id+'>> не создано!!!');
            // }

        }if (command == 'instantActionisOver'){

            gameStatus.General.tpl = templates.location;
            gameStatus.General.action = null;

        }if (command == 'gameOver'){

            //конец игры - невозможно продолжать - переход на главную страницу игры
            gameStatus.General.tpl = defaultValues.HomePage.General.tpl;

        }if (command == 'theEnd'){

            //логическое завершение игры - пока не сделал

        }if (command == 'useItem'){

            gameStatus = useItem(options, gameStatus);

        }if (command == 'changeLocation'){

            alert('переделать это событие ! - изменение локации должно быть в специализированном модуле!');

        }if (command == 'changeGameStates'){

            gameStatus = changeGameStates_fromScene(options, gameStatus);

        }if (command == 'changeTime'){

            alert('переделать это событие ! - изменение времени должно быть в специализированном модуле!');

        }if (command == 'changeTplAndAction'){

            gameStatus.General.tpl = options.tpl;
            gameStatus.General.action = options.action;

        }if (command == 'changeNpcInLocation'){
            gameStatus.General.npcInLocation = options.arrNpc;
        }if (command == 'moveItems'){

            if (options.source == 'playerItems'){
                var storeReceiver = gameStatus.WorldSettings.worldItemStorage[options.receiver];
                var storeSource = gameStatus.Player.playerStore.items;
                var item = storeSource[options.index].item;

                gameStatus = removeItem(item, storeSource, gameStatus);
                gameStatus = receiveItem(item, storeReceiver, 1, gameStatus);

            }else{
                var storeReceiver = gameStatus.Player.playerStore.items;
                var storeSource = gameStatus.WorldSettings.worldItemStorage[options.source];
                var item = storeSource[options.index].item;

                gameStatus = removeItem(item, storeSource, gameStatus);
                gameStatus = receiveItem(item, storeReceiver, 1, gameStatus);
            }
        }if (command == 'moveCraftItem'){

            const playerStorage = gameStatus.Player.playerStore.items;
            const worldItemSorage = gameStatus.WorldSettings.worldItemStorage[options.locationCraft];

            if (options.moveType == 'playerStorage->slot'){
                //console.log(options.moveType );

                let item = playerStorage[options.index].item;
                let arrSlot = this.findeSlot(worldItemSorage, item);

                //добавим предмет в слот
                var slot = worldItemSorage[arrSlot.slot];
                if (arrSlot.type == 'add'){
                    slot[slot.length] = {item, quantity:1};
                }if (arrSlot.type == 'increment'){
                    slot[0].quantity = slot[0].quantity+1;
                }

                //удалим предмет из источника
                playerStorage[options.index].quantity = playerStorage[options.index].quantity-1;
                if (playerStorage[options.index].quantity == 0){
                    playerStorage.splice(options.index,1);
                }

            }if (options.moveType == 'slot->playerStorage'){
                let storeSlot = gameStatus.WorldSettings.worldItemStorage[options.locationCraft][options.source];

                //добавим предмет в инвентарь
                let receiverIndex = findeValueOnTheArray(storeSlot[0].item.id,playerStorage, 'arrayItemId');
                if (receiverIndex !== -1){
                    playerStorage[receiverIndex].quantity = playerStorage[receiverIndex].quantity+1;
                } else {
                    playerStorage[playerStorage.length] = {item:storeSlot[0].item,quantity:1};
                }

                //удалим предмет из слота
                var slot = worldItemSorage[options.source];
                slot[0].quantity = slot[0].quantity-1;
                if (slot[0].quantity == 0){
                    slot.splice(options.index,1);
                }
            }
        }if (command == 'craft'){
            gameStatus = craft(options, gameStatus);
            //console.log(recepie);

        }if (command == 'purchaseGoods'){

            gameStatus = purchaseGoods(options, gameStatus);

        }if (command == 'purchaseClothing'){

            gameStatus = purchaseClothing(options, gameStatus);

        }if (command == 'changeClothes'){
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
            }if (options.type == 'takeOff'){
                gameStatus.Player.playerStore.clothing[gameStatus.Player.playerStore.clothing.length] = options.itemOfClothing;
                gameStatus.Player.clothingOnTheBody.splice(options.index,1);
            }

            gameStatus.Player.clothingSet = this.getClothingSet(gameStatus.Player.clothingOnTheBody);
        }

        this.performTransformations(gameStatus);
    }

    performTransformations(options){
        localStorage.setItem("VL",JSON.stringify(options));
        this.setState(options);
    }

    render() {

        const tpl = this.state.General.tpl;

        if (tpl == templates.homePage){
            return <HomePage homePageMenuCommands={(command) => this.homePageMenuCommands(command)} />;
        } if (tpl === templates.scene){
            return <Scene data={this.state} changeStates={(command, options) => this.changeStates(command, options)}/>;
        } if (tpl === templates.location){
            return <Location data={this.state} changeStates={(command, options) => this.changeStates(command, options)}/>;
        } if (tpl === templates.action){
            return <Action data={this.state} changeStates={(command, options) => this.changeStates(command, options)}/>;
        } if (tpl === templates.instantAction){
             return <InstantAction data={this.state} changeStates={(command, options) => this.changeStates(command, options)}/>;
        } if (tpl === templates.aboutProject){
            return <AboutProject />;
        } if (tpl === templates.inventory){
            return <Inventory data={this.state} changeStates={(command, options) => this.changeStates(command, options)}/>;
        } if (tpl === templates.information){
            return <Information data={this.state} changeStates={(command, options) => this.changeStates(command, options)}/>;
        } if (tpl === templates.craft){
            return <Craft data={this.state} changeStates={(command, options) => this.changeStates(command, options)}/>;
        } if (tpl === templates.store){
            return <Store data={this.state} findePlayerOption={(id)=>this.state.Player.options[findeValueOnTheArray(id,this.state.Player.options, 'arrayOptionId')]} changeStates={(command, options) => this.changeStates(command, options)}/>;
        } if (tpl === templates.storeClothing){
            return <StoreClothing data={this.state} findePlayerOption={(id)=>this.state.Player.options[findeValueOnTheArray(id,this.state.Player.options, 'arrayOptionId')]} changeStates={(command, options) => this.changeStates(command, options)}/>;
        } if (tpl === templates.wardrobe){
            return <Wardrobe data={this.state} changeStates={(command, options) => this.changeStates(command, options)}/>;
        } if (tpl === templates.movingItems){
            return <MovingItems data={this.state} changeStates={(command, options) => this.changeStates(command, options)}/>;
        } if (tpl === templates.playerOptionsInfo){
            return <PlayerOptionsInfo data={this.state} changeStates={(command, options) => this.changeStates(command, options)}/>;
        } else {
            return <h1>Can not find template!</h1>
        }
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);