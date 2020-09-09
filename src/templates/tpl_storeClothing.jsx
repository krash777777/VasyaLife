import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';

import Images from '../db/db_img.jsx';
import templates from '../db/db_templates.jsx';
import shopsAndGoods from '../db/db_shopsAndGoods.jsx';
import CountUp from 'react-countup';

class Shop extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const location = this.props.data.General.location;
        const arrMoney = this.props.findePlayerOption('money');
        const money = <CountUp start={arrMoney.value+10} end={arrMoney.value} duration={1} />;

        const listOfClothing = this.props.data.Player.playerStore.clothing.map((arr)=>
            <div className="itemOfClothing" key={arr.name.toString()} style={{height:arr.size.height,width:arr.size.width}}>
                <img src={arr.image}/>
            </div>
        );

        const listOfGoods = shopsAndGoods.clothing[this.props.data.General.location.id].map((clothing, index)=>
            <div className="clothingOnTheShop" key={index.toString()}>
                <div className="clothingInfoBox" style={{height:'6vw'}}><img style={{height:clothing.size.height,width:clothing.size.width}} src={clothing.image}/></div>
                <div className="clothingInfoBox clothingInfoPanel">
                    <div className="price" style={{textAlign:'center'}}><a>{clothing.price}$</a></div>
                    <div className="buttonBuy" onClick={() => this.props.changeStates('purchaseClothing', {clothing:clothing, playerStore:'clothing'})}><a>Купить</a></div>
                </div>
            </div>
        );
        return (
            <div id="background">

                    <div className="game_container centered container_layer txt-no-select">
                        <div className="tpl-background" style={{opacity:0.7}}>
                            <img src={location.img} className="img_background"/>
                        </div>

                        <div className="storeOptionsWrapper">
                            <div className="storeOptions">
                                <img className="optionImg" src={Images.ico.money}/>
                                <a className="optionValue">{money}<span>$</span></a>
                            </div>
                        </div>

                        <CSSTransitionGroup
                            transitionName="transparency"
                            transitionAppear={true} transitionAppearTimeout={500}
                            transitionEnter={false} transitionEnterTimeout={500}
                            transitionLeave={false} transitionLeaveTimeout={500}
                        >

                            <div className="centered container_layer equipment-background">
                                <a className="close" onClick={() => this.props.changeStates('changeTpl', {tpl:templates.location})}>X</a>

                                <CSSTransitionGroup transitionName="stretchZ"
                                                    transitionAppear={true} transitionAppearTimeout={500}
                                                    transitionEnter={false} transitionEnterTimeout={500}
                                                    transitionLeave={false} transitionLeaveTimeout={500}
                                >
                                    <div className="actionRoom-conteiner">
                                        <div className="actionRoom-store actionRoomBoxes items">
                                            <CSSTransitionGroup transitionName="movingItems" transitionAppear={true} transitionAppearTimeout={500} transitionEnter={true} transitionEnterTimeout={500} transitionLeave={true} transitionLeaveTimeout={500}>
                                                {listOfClothing}
                                            </CSSTransitionGroup>
                                        </div>

                                        <div className="actionRoom-inventory clothingStoreBox clothing">{listOfGoods}
                                            {/*<div className="clothingOnTheShop">*/}
                                                {/*<div className="clothingInfoBox" style={{height:'6vw',width:'4vw'}}><img src={Images.clothing.orangeShirt}/></div>*/}
                                                {/*<div className="clothingInfoBox clothingInfoPanel">*/}
                                                    {/*<div className="price" style={{textAlign:'center'}}><a>50$</a></div>*/}
                                                    {/*<div className="buttonBuy"><a>Купить</a></div>*/}
                                                {/*</div>*/}
                                            {/*</div>*/}
                                        </div>



                                    </div>
                                </CSSTransitionGroup>
                            </div>
                        </CSSTransitionGroup>
                    </div>

            </div>
        )
    }
}

export default Shop;