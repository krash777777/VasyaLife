import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
// import { Draggable, Droppable } from 'react-drag-and-drop'

import Images from '../db/db_img.jsx';
import templates from '../db/db_templates.jsx';

class MovingItems extends React.Component {
    constructor(props) {
        super(props);
    }

    moveItems(index, source, receiver){
        //console.log(source);
        let arrOptions = {
            index:index,
            source:source,
            receiver:receiver
        };


        this.props.changeStates('moveItems', arrOptions);
    }

    render() {

        const location = this.props.data.General.location;

        const listOfTheItems = this.props.data.Player.playerStore.items.map((items, index)=>
            <div className="item" key={items.item.id.toString()}
                 onClick={() => this.moveItems(index, 'playerItems', this.props.data.General.location.id)}
            >
                <img src={items.item.image}/>
                <span className="numberOfItems">{items.quantity}</span>
            </div>
        );

        const listOnTheStorage = this.props.data.WorldSettings.worldItemStorage[this.props.data.General.location.id].map((items, index)=>


            <div className="item" key={items.item.id.toString()}
                 onClick={() => this.moveItems(index, this.props.data.General.location.id, 'playerItems')}
            >
                <img src={items.item.image}/>
                <span className="numberOfItems">{items.quantity}</span>
            </div>

        );

        return (
            <div id="background">
                {/*<CSSTransitionGroup*/}
                    {/*transitionName="zoomIn"*/}
                    {/*transitionAppear={true} transitionAppearTimeout={500}*/}
                    {/*transitionEnter={false} transitionEnterTimeout={500}*/}
                    {/*transitionLeave={false} transitionLeaveTimeout={500}*/}
                {/*>*/}

                    <div className="game_container centered container_layer txt-no-select">
                        <div className="tpl-background" style={{opacity:0.7}}>
                            <img src={location.img} className="img_background"/>
                        </div>

                        <div className="centered container_layer equipment-background">
                            <a className="close" onClick={() => this.props.changeStates('changeTpl', {tpl:templates.location})}>X</a>

                            <CSSTransitionGroup transitionName="stretchZ"
                                                transitionAppear={true} transitionAppearTimeout={500}
                                                transitionEnter={false} transitionEnterTimeout={500}
                                                transitionLeave={false} transitionLeaveTimeout={500}
                            >
                                <div className="actionRoom-conteiner">

                                    <div className="actionRoom-inventory actionRoomBoxes items">
                                        <CSSTransitionGroup transitionName="movingItems" transitionAppear={true} transitionAppearTimeout={500} transitionEnter={true} transitionEnterTimeout={500} transitionLeave={true} transitionLeaveTimeout={500}>
                                            {listOfTheItems}
                                        </CSSTransitionGroup>
                                    </div>

                                    <div className="actionRoom-store actionRoomBoxes items">
                                        <CSSTransitionGroup transitionName="movingItems" transitionAppear={true} transitionAppearTimeout={500} transitionEnter={true} transitionEnterTimeout={500} transitionLeave={true} transitionLeaveTimeout={500}>
                                            {listOnTheStorage}
                                        </CSSTransitionGroup>
                                    </div>

                                </div>
                            </CSSTransitionGroup>
                        </div>

                    </div>
                {/*</CSSTransitionGroup>*/}
            </div>
        )



    }
}

export default MovingItems;