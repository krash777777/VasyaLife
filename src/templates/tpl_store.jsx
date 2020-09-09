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

        const listOfTheItems = this.props.data.Player.playerStore.items.map((items, index)=>
            <div className="item" key={items.item.id.toString()}>
                <img src={items.item.image}/>
                <span className="numberOfItems">{ <CountUp start={items.quantity-items.item.numberOfItems} end={items.quantity} duration={1} />}</span>
            </div>
        );

        const listOfGoods = shopsAndGoods.items[this.props.data.General.location.id].map((item, index)=>
            <div className="itemOnTheShop" key={index.toString()}>
                <div className="itemInfoBox" ><img src={item.image}/></div>
                <div className="itemInfoBox itemInfoBoxRightPanel">
                    <div className="price"><a>Цена:</a><a>{item.price}$</a></div>
                    <div className="quantity"><a>Количество:</a><a>{item.numberOfItems}</a></div>
                    <div className="buttonBuy" onClick={() => this.props.changeStates('purchaseGoods', {goods:item, playerStore:'items', quantity:item.numberOfItems})}><a>Купить</a></div>
                </div>
            </div>
        );

        return (
            <div id="background">


                    <div className="game_container centered container_layer txt-no-select">
                        <div className="tpl-background" style={{opacity:0.7}}>
                            <img src={location.img} className="img_background"/>
                        </div>

                        <CSSTransitionGroup
                            transitionName="transparency"
                            transitionAppear={true} transitionAppearTimeout={500}
                            transitionEnter={false} transitionEnterTimeout={500}
                            transitionLeave={false} transitionLeaveTimeout={500}
                        >

                            <div className="centered container_layer equipment-background">
                                <a className="close" onClick={() => this.props.changeStates('changeTpl', {tpl:templates.location})}>X</a>

                                <div className="storeOptionsWrapper">
                                    <div className="storeOptions">
                                        <img className="optionImg" src={Images.ico.money}/>
                                        <a className="optionValue">{money}<span>$</span></a>
                                    </div>
                                </div>

                                <CSSTransitionGroup transitionName="stretchZ"
                                                    transitionAppear={true} transitionAppearTimeout={500}
                                                    transitionEnter={false} transitionEnterTimeout={500}
                                                    transitionLeave={false} transitionLeaveTimeout={500}
                                >
                                    <div className="actionRoom-conteiner">
                                        <div className="actionRoom-store actionRoomBoxes items">
                                            <CSSTransitionGroup transitionName="movingItems" transitionAppear={true} transitionAppearTimeout={500} transitionEnter={true} transitionEnterTimeout={500} transitionLeave={true} transitionLeaveTimeout={500}>
                                                {listOfTheItems}
                                            </CSSTransitionGroup>
                                        </div>

                                        <div className="actionRoom-inventory actionRoomBoxes items">
                                            {listOfGoods}
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