import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';

import Images from '../db/db_img.jsx';
import templates from '../db/db_templates.jsx';

class Craft extends React.Component {
    constructor(props) {
        super(props);
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
                                            <div className="button-assemble-img"><img src={Images.ico.equip}/></div>
                                            <div className="button-assemble-name">Приготовить</div>
                                        </div>
                                    </div>
                                </div>
                            </CSSTransitionGroup>
                        </div>

                    </div>

            </div>
        )
    }
}

export default Craft;