
//Main
import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransitionGroup } from 'react-transition-group';

//styles
import './styles/fonts/DS-DIGI.TTF';


//modules
import {changeGameStates_fromScene, changeClothes, findeSlot} from './modules/options.jsx';
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
import AboutProject from './templates/tpl_aboutProject.jsx';
import Save from './templates/tpl_save.jsx';
import Scene from './templates/tpl_scene.jsx';
import Location from './templates/tpl_location.jsx';
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

    homePageMenuCommands(command){

        const gameStatus = JSON.parse(localStorage.getItem("VL"));
        const gameSaves = JSON.parse(localStorage.getItem("VL_saveList"));

        const thisState = this.state.General;

        if (command == 'newGame'){

            //если игра запускается впервые, сформируем массив сохранений
            // if (!gameSaves){
            //
            //     var arrSaves = [];
            //     var sStr = {date:'',time:'',data:''};
            //
            //     for(var i = 0; i < 9; i++) {
            //         arrSaves[i] = sStr;
            //     }
            //
            //     localStorage.setItem("VL_saveList",JSON.stringify(arrSaves));
            // }

            //если уже существует прогресс в игре, нужно спросить, будем ли играть заново
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

        } if (command == 'save'){

            thisState.tpl = templates.save;
            this.setState({General:thisState});

        } if (command == 'aboutProject'){

            thisState.tpl = templates.aboutProject;
            this.setState({General:thisState});

        }
    }

    loadAndSave(command, options){
        var gameStatus = JSON.parse(localStorage.getItem("VL"));
        var gameSaves = JSON.parse(localStorage.getItem("VL_saveList"));

        if (command == 'saveGame') {

            if (!gameSaves){
                gameSaves = [];

                var sStr = {date:'',time:'',data:''};

                for(var i = 0; i < 9; i++) {
                    gameSaves[i] = sStr;
                }
            }

            let date = new Date();
            let currentDate = date.getFullYear()+':'+(date.getMonth()+1)+':'+date.getDate();
            let currentTime = date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();

            if (gameSaves[options.currentIndex].data!==''){
                let overwrite = confirm("Существует уже сохраненная игра в данной ячейке. Вы действительно хотите перезаписать?");

                if (overwrite == true){
                    gameSaves[options.currentIndex] = {date:currentDate,time:currentTime,data:gameStatus};
                    localStorage.setItem("VL_saveList",JSON.stringify(gameSaves));
                }
            } else {
                gameSaves[options.currentIndex] = {date:currentDate,time:currentTime,data:gameStatus};
                localStorage.setItem("VL_saveList",JSON.stringify(gameSaves));
            }

            this.performTransformations(gameStatus);
        }if (command == 'loadGame'){

            if(gameSaves[options.currentIndex].data !== ''){

                let loadQuestion = confirm("Текущий прогресс в игре будет потерян. Вы действительно хотите загрузить игру?");
                if (loadQuestion == true){

                    localStorage.removeItem("VL");

                    gameSaves[options.currentIndex].data.General.tpl = templates.location;

                    localStorage.setItem("VL",JSON.stringify(gameSaves[options.currentIndex].data));
                    this.setState(gameSaves[options.currentIndex].data);

                    // gameStatus.General.tpl = gameSaves[options.currentIndex].data.General.tpl;

                    console.log(gameSaves[options.currentIndex].data);
                }
            }
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

                let item = playerStorage[options.index].item;

                // let arrSlot = this.findeSlot(worldItemSorage, item); // старый вариант

                let arrSlot = findeSlot(worldItemSorage, item);

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

            gameStatus = changeClothes(options, gameStatus);

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
        } if (tpl === templates.aboutProject){
            return <AboutProject />;
        } if (tpl === templates.save){
            return <Save data={this.state} changeStates={(command, options) => this.changeStates(command, options)}/>;
        } if (tpl === templates.scene){
            return <Scene data={this.state} changeStates={(command, options) => this.changeStates(command, options)}/>;
        } if (tpl === templates.location){
            return <Location data={this.state} changeStates={(command, options) => this.changeStates(command, options)}/>;
        } if (tpl === templates.action){
            return <Action data={this.state} changeStates={(command, options) => this.changeStates(command, options)}/>;
        } if (tpl === templates.instantAction){
             return <InstantAction data={this.state} changeStates={(command, options) => this.changeStates(command, options)}/>;
        } if (tpl === templates.inventory){
            return <Inventory data={this.state} changeStates={(command, options) => this.changeStates(command, options)}/>;
        } if (tpl === templates.information){
            return <Information data={this.state} changeStates={(command, options) => this.changeStates(command, options)} loadAndSave={(command, options) => this.loadAndSave(command, options)}/>;
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