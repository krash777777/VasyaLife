import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';

import Images from '../db/db_img.jsx';
import templates from '../db/db_templates.jsx';
import {findeValueOnTheArray} from "../modules/service.jsx";

function getIngrBalance(item, props) {
    let playerStore = props.globalData.Player.playerStore.items;
    let itemIndex = findeValueOnTheArray(item.id, playerStore, 'arrayItemId');

    let itemQuantityOnTheSlot = findeItemQuantityOnTheSlot(props.globalData, item);

    let itemQuantityPlayerStore = 0;
    if (itemIndex!==-1) {

        itemQuantityPlayerStore = playerStore[itemIndex].quantity;
    }

    return itemQuantityOnTheSlot+itemQuantityPlayerStore;
}

function findeItemQuantityOnTheSlot(globalData, item) {

    let locationCraft = globalData.WorldSettings.worldItemStorage[globalData.General.location.id+'Craft'];

    //найдем количество ингридиента в слоте найденного ингридиента
    var itemQuantityOnTheSlot = 0;
    var currentSlot = '';
    for (var slotNumber=1; slotNumber<5; slotNumber++){
        currentSlot = 'slot'+slotNumber;
        if (locationCraft[currentSlot].length>0){
            if (locationCraft[currentSlot][0].item.id == item.id){
                itemQuantityOnTheSlot = locationCraft['slot'+slotNumber][0].quantity;
            }
        }
    }

    return itemQuantityOnTheSlot;
}

function InfoBox(props) {

    let thisState = props.thisState;

    if (thisState.showItemInfo == false){
        var styleInfoBox = 'none';
        return <div></div>;
    } if (thisState.showItemInfo == true){
        var styleInfoBox = 'block';
    }

    let listRecipeWithBalance = props.globalData.Player.recipesAccess;

    for(var i = 0; i < listRecipeWithBalance.length; i++) {

        var ingrConsistWithBalance = listRecipeWithBalance[i].recipe.consist;
        for(var a = 0; a < ingrConsistWithBalance.length; a++) {
            var currentBalance = getIngrBalance(ingrConsistWithBalance[a].item, props);

            ingrConsistWithBalance[a].balance = currentBalance;
        }
    }

    // props.globalData.Player.recipesAccess
    const listOfRecipes = listRecipeWithBalance.map((arrRecipes, index)=>

        <div className='row-recipe' key={index}
             onClick={() => props.choiceRecipe(arrRecipes.recipe.consist)}
        >

            <div className='row-ingr'>
                {arrRecipes.recipe.consist.map((ingr, recipeIndex) =>
                    <div className={ingr.balance<ingr.quantity?'ingr-box ingr-box-right markRed':'ingr-box ingr-box-right'}  key={recipeIndex}>
                        <img src={ingr.item.image}/>

                        <div className="numberOfItemsShell">
                            <span className={ingr.balance<ingr.quantity?'textColorRed':''}>{ingr.balance}</span>
                            <span>/</span>
                            <span>{ingr.quantity}</span>
                        </div>
                        {/*<span className="numberOfItems">{ingr.balance+'/'+ingr.quantity}</span>*/}
                    </div>
                )}
            </div>

            <div className='row-equal'>=</div>

            <div className='row-result'>
                {arrRecipes.recipe.result.map((result, resultIndex) =>
                    <div className='ingr-box ingr-box-left' key={resultIndex}>
                        <img src={result.item.image}/>
                        <span className="numberOfItems">{result.quantity}</span>
                    </div>
                )}
            </div>
        </div>

    );

    return (
        <div>
            <div className="centered modale-background" style={{display:styleInfoBox}}></div>

            <CSSTransitionGroup
                transitionName="stretchZ"
                transitionAppear={true} transitionAppearTimeout={500}
                transitionEnter={false} transitionEnterTimeout={500}
                transitionLeave={false} transitionLeaveTimeout={500}
            >
                <div className="centered info-box-recipes" style={{display:styleInfoBox}}>
                    <a className='info-box-recipes-header'>Доступные рецепты</a>
                    <a className="close" onClick={() => props.toggleVisionInfoBox(false)}>X</a>

                    <div className='info-box-recipes-rows'>
                        {listOfRecipes}
                    </div>


                </div>
            </CSSTransitionGroup>
        </div>

    );
}

class Craft extends React.Component {
    constructor(props) {
        super(props);
        this.state = {focus:'items', showItemInfo:false, focusItem:''};
    }

    changeTabFocus(newFocus){
        this.setState({focus:newFocus});
    }

    toggleVisionInfoBox(showInfoBox){
        this.setState({showItemInfo:showInfoBox});
    }

    clearCraftSlots(){
        let locationCraft = this.props.data.WorldSettings.worldItemStorage[this.props.data.General.location.id+'Craft'];

        for (var slotNumber=1; slotNumber<5; slotNumber++){

            if (locationCraft['slot'+slotNumber].length>0){
                var itemQuantityOnTheSlot = locationCraft['slot'+slotNumber][0].quantity;

                for (var a=0; a<itemQuantityOnTheSlot; a++){
                    this.moveCraftItem('slot->playerStorage', 0, 'slot'+slotNumber, this.props.data.General.location.id+'Craft');
                }
            }
        }
    }

    choiceRecipe(arrRecipeConsist){
        //очищаем уже установленные ингридиенты
        let locationCraft = this.props.data.WorldSettings.worldItemStorage[this.props.data.General.location.id+'Craft'];

        this.clearCraftSlots();

        let playerStore = this.props.data.Player.playerStore.items;

        let arrRecipeConsistSort = [];
        for(var i = 0; i < arrRecipeConsist.length; i++) {
            let indexItem = findeValueOnTheArray(arrRecipeConsist[i].item.id, playerStore, 'arrayItemId');

            arrRecipeConsistSort[arrRecipeConsistSort.length] = {
                item:arrRecipeConsist[i].item,
                quantity:arrRecipeConsist[i].quantity,
                index:indexItem
            };

            //console.log(arrRecipeConsist[i].item.name+' - '+indexItem);
        }

        arrRecipeConsistSort.sort(function(a, b){
            return b.index-a.index
        })

        //console.log(arrRecipeConsistNew);

        for(var i = 0; i < arrRecipeConsistSort.length; i++) {

            let indexItem = findeValueOnTheArray(arrRecipeConsistSort[i].item.id, playerStore, 'arrayItemId');

            //console.log(arrRecipeConsist[i].item.name+' - '+indexItem);

            //найдем количество ингридиента в слоте найденного ингридиента
            let itemQuantityOnTheSlot = findeItemQuantityOnTheSlot(this.props.data, arrRecipeConsistSort[i].item);

            // var itemQuantityOnTheSlot = 0;
            // var currentSlot = '';
            // for (var slotNumber=1; slotNumber<5; slotNumber++){
            //     currentSlot = 'slot'+slotNumber;
            //     if (locationCraft[currentSlot].length>0){
            //         //console.log(locationCraft['slot'+slotNumber][0].item.id+' = '+arrRecipeConsist[i].item.id);
            //
            //         if (locationCraft[currentSlot][0].item.id == arrRecipeConsistSort[i].item.id){
            //             itemQuantityOnTheSlot = locationCraft['slot'+slotNumber][0].quantity;
            //         }
            //     }
            // }


            if(indexItem!==-1){

                //проверка на количество (списываем только из остатка на складе ... так же учтем количество, которое сейчас в ячейке)

                let quantityToRemove = arrRecipeConsistSort[i].quantity;
                let balance = playerStore[indexItem].quantity+itemQuantityOnTheSlot;

                if (arrRecipeConsistSort[i].quantity>=balance){
                    quantityToRemove = balance;
                }

                console.log(arrRecipeConsistSort[i].item.name+':   remove:'+quantityToRemove+'; recipe:'+arrRecipeConsistSort[i].quantity+'; slot:'+itemQuantityOnTheSlot);

                 for (var a=0; a<quantityToRemove; a++){
                     this.moveCraftItem('playerStorage->slot', indexItem, 'playerItems', this.props.data.General.location.id+'Craft');
                }
            } else {
                //данная ветку нужна, для случая, когда в инвентаре нет предмета, а в одном из слотов есть

                if (itemQuantityOnTheSlot!==0){
                    let storeSlot = this.props.data.WorldSettings.worldItemStorage[this.props.data.General.location.id+'Craft'][currentSlot];
                    for (var a=0; a<itemQuantityOnTheSlot; a++){
                        playerStore[playerStore.length] = {item:storeSlot[0].item,quantity:1};
                        this.moveCraftItem('playerStorage->slot', 0, 'playerItems', this.props.data.General.location.id+'Craft');
                    }
                }
            }
        }

        this.toggleVisionInfoBox(false);
    }

    craft(locationCraft){
        this.props.changeStates('craft', {locationCraft:locationCraft});
    }

    moveCraftItem(moveType, index, source, locationCraft){

        let arrOptions = {
            moveType:moveType,
            index:index,
            source:source,
            locationCraft:locationCraft
        };

        this.props.changeStates('moveCraftItem', arrOptions);
    }

    render() {
        const location = this.props.data.General.location;
        const locationCraft = this.props.data.General.location.id+'Craft';

        const listOfTheItems = this.props.data.Player.playerStore.items.map((arrItem, index)=>
            <div className="item" key={index}
                 onClick={() => this.moveCraftItem('playerStorage->slot', index, 'playerItems', locationCraft)}
            >
                <img src={arrItem.item.image}/>
                <span className="numberOfItems">{arrItem.quantity}</span>
            </div>
        );


        const itemOnTheSlot1 = this.props.data.WorldSettings.worldItemStorage[locationCraft].slot1.map((arr, index)=>
            <div className="itemOnTheSlot" key={index}
                 onClick={() => this.moveCraftItem('slot->playerStorage', index, 'slot1', locationCraft)}
            >
                <img src={arr.item.image}/>
                <span className="numberOfItems">{arr.quantity}</span>
            </div>
        );

        const itemOnTheSlot2 = this.props.data.WorldSettings.worldItemStorage[locationCraft].slot2.map((arr, index)=>
            <div className="itemOnTheSlot" key={index}
                 onClick={() => this.moveCraftItem('slot->playerStorage', index, 'slot2', locationCraft)}
            >
                <img src={arr.item.image}/>
                <span className="numberOfItems">{arr.quantity}</span>
            </div>
        );

        const itemOnTheSlot3 = this.props.data.WorldSettings.worldItemStorage[locationCraft].slot3.map((arr, index)=>
            <div className="itemOnTheSlot" key={index}
                 onClick={() => this.moveCraftItem('slot->playerStorage', index, 'slot3', locationCraft)}
            >
                <img src={arr.item.image}/>
                <span className="numberOfItems">{arr.quantity}</span>
            </div>
        );

        const itemOnTheSlot4 = this.props.data.WorldSettings.worldItemStorage[locationCraft].slot4.map((arr, index)=>
            <div className="itemOnTheSlot" key={index}
                 onClick={() => this.moveCraftItem('slot->playerStorage', index, 'slot4', locationCraft)}
            >
                <img src={arr.item.image}/>
                <span className="numberOfItems">{arr.quantity}</span>
            </div>
        );

        return (
            <div id="background">


                    <div className="game_container centered container_layer txt-no-select">
                        <div className="tpl-background" style={{opacity:0.7}}>
                            <img src={location.img} className="img_background"/>
                        </div>
                        <div className="centered container_layer equipment-background">
                            <a className="close" onClick={() => this.props.changeStates('changeTpl', {tpl:templates.location})}>X</a>

                            <CSSTransitionGroup
                                transitionName="stretchZ"
                                transitionAppear={true} transitionAppearTimeout={500}
                                transitionEnter={false} transitionEnterTimeout={500}
                                transitionLeave={false} transitionLeaveTimeout={500}
                            >
                                <div className="actionRoom-conteiner">
                                    <div className="actionRoom-inventory actionRoomBoxes">
                                        <CSSTransitionGroup transitionName="movingItems" transitionAppear={true} transitionAppearTimeout={500} transitionEnter={true} transitionEnterTimeout={500} transitionLeave={true} transitionLeaveTimeout={500}>
                                            {listOfTheItems}
                                        </CSSTransitionGroup>
                                    </div>

                                    {/*<div className="ctrlPanel" onClick={() => this.build()}>*/}
                                        {/*<div className="button-equipment"><img src={Images.ico.equip}/></div>*/}
                                    {/*</div>*/}

                                    <div className="actionRoom-equipment">
                                        <a className="text-link ingr-box-left" onClick={() => this.toggleVisionInfoBox(true)}>Доступные рецепты</a>
                                        <a className="text-link ingr-box-right" onClick={() => this.clearCraftSlots()}>Очистить</a>

                                        {/*<div className="button-assemble" onClick={() => this.toggleVisionInfoBox(true)}>*/}
                                            {/*<div className="button-assemble-img"><img src={Images.ico.orbGreen}/></div>*/}
                                            {/*<div className="button-assemble-name">Рецепты</div>*/}
                                        {/*</div>*/}

                                        <div className="ingr slot1">
                                            <CSSTransitionGroup transitionName="movingItems" transitionAppear={true} transitionAppearTimeout={500} transitionEnter={true} transitionEnterTimeout={500} transitionLeave={true} transitionLeaveTimeout={500}>
                                                {itemOnTheSlot1}
                                            </CSSTransitionGroup>
                                        </div>
                                        <div className="ingr slot2">
                                            <CSSTransitionGroup transitionName="movingItems" transitionAppear={true} transitionAppearTimeout={500} transitionEnter={true} transitionEnterTimeout={500} transitionLeave={true} transitionLeaveTimeout={500}>
                                                {itemOnTheSlot2}
                                            </CSSTransitionGroup>
                                        </div>
                                        <div className="ingr slot3">
                                            <CSSTransitionGroup transitionName="movingItems" transitionAppear={true} transitionAppearTimeout={500} transitionEnter={true} transitionEnterTimeout={500} transitionLeave={true} transitionLeaveTimeout={500}>
                                                {itemOnTheSlot3}
                                            </CSSTransitionGroup>
                                        </div>
                                        <div className="ingr slot4">
                                            <CSSTransitionGroup transitionName="movingItems" transitionAppear={true} transitionAppearTimeout={500} transitionEnter={true} transitionEnterTimeout={500} transitionLeave={true} transitionLeaveTimeout={500}>
                                                {itemOnTheSlot4}
                                            </CSSTransitionGroup>
                                        </div>


                                        <div className="button-assemble" onClick={() => this.craft(locationCraft)}>
                                            {/*<div className="button-assemble-img"><img src={Images.ico.equip}/></div>*/}
                                            <div className="button-assemble-name">Готовить</div>
                                        </div>

                                    </div>
                                </div>
                            </CSSTransitionGroup>

                            <InfoBox thisState={this.state} globalData={this.props.data} toggleVisionInfoBox={(showInfoBox)=>this.toggleVisionInfoBox(showInfoBox, '')} choiceRecipe={(arrRecipe)=>this.choiceRecipe(arrRecipe)} />
                        </div>

                    </div>

            </div>
        )
    }
}

export default Craft;