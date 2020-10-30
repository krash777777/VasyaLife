import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import CountUp from 'react-countup';

import Images from '../db/db_img.jsx';
import dbItems from '../db/db_items.jsx';
import templates from '../db/db_templates.jsx';

import {findeValueOnTheArray, findeRecepie} from '../modules/service.jsx';

import {HeaderPanelOptions} from './tpl_interfaceParts.jsx';


function ItemsOnInventary(props) {
    let arr = props.arrayData;
    return (
        <CSSTransitionGroup transitionName="movingItems" transitionAppear={true} transitionAppearTimeout={500} transitionEnter={true} transitionEnterTimeout={500} transitionLeave={true} transitionLeaveTimeout={500}>
            <div
                className="item"
                onClick={() => props.toggleVisionInfoBox(true)}
            >
                <img src={arr.item.image}/>
                <span className="numberOfItems">{arr.quantity}</span>
            </div>
        </CSSTransitionGroup>
    );
}

function ItemInteractions(props) {
    let arrData = props.arrayData;
    let interactionIndex = props.interactionIndex;

    let instantEffects = arrData.instantEffects.map((arr, index)=>
        <div className="component" key={index}>
            <div className="componen-img"><img src={arr.option.image}/></div>
            <div className={arr.type =='increase'?'component-value-plus':'component-value-minus'}>{arr.type == 'increase'?'+':'-'}{arr.value}</div>
        </div>
    );
    let effects = instantEffects.length>0?(
        <div className="info-box-effects-instantEffects">

            <div className="info-box-effects-components-name"><a>Мгновенное действие:</a></div>

            <div className="info-box-effects-components">
                {instantEffects}
                <div style={{clear:'both'}}></div>
            </div>
        </div>):''
    ;


    let listModifiers = arrData.modifiers.map((arr, index)=>
        <div className="component" key={index}>
            <div className="componen-img"><img src={arr.modifier.image}/></div>
            <div className={arr.type == 'deleteModifier'?'component-value-minus':'component-value-plus'}>{arr.type == 'deleteModifier'?'-':'+'}</div>
        </div>
    );
    let modifiers = listModifiers.length>0?(
            <div className="info-box-effects-instantEffects">

                <div className="info-box-effects-components-name"><a>Изменение модификаторов:</a></div>

                <div className="info-box-effects-components">
                    {listModifiers}
                    <div style={{clear:'both'}}></div>
                </div>
            </div>
        ):''
    ;


    let listReplacementItems = arrData.replacementItems.map((arr, index)=>
        <div className="component" key={index}>
            <div className="componen-img"><img src={dbItems[arr.itemGroup][arr.itemId].image}/></div>
            <div className={'component-value-plus'}>{'+'}{arr.quantity}</div>
        </div>
    );
    let replacementItems = listReplacementItems.length>0?(
        <div className="info-box-effects-instantEffects">
            <div className="info-box-effects-components-name"><a>Предметы в инвентаре:</a></div>
            <div className="info-box-effects-components">
                {listReplacementItems}
                <div style={{clear:'both'}}></div>
            </div>
        </div>
    ):'';



    return (
        <div className="info-box-effects">
            {effects}
            {modifiers}
            {replacementItems}

            <div className="info-box-button" onClick={() => props.useItem(interactionIndex)}>
                <a className="info-box-nameButton">{arrData.nameMenu}</a>
            </div>

        </div>
    );

}

function ItemInfo(props) {

    let thisState = props.thisState;
    let focusItem = thisState.focusItem;
    let globalDataItems = props.globalData.Player.playerStore.items;



    var itemQuantity = '';

    if (thisState.showItemInfo == false){
        var styleInfoBox = 'none';
        return <div></div>;
    } if (thisState.showItemInfo == true){
        var styleInfoBox = 'block';
        let receiverIndex = findeValueOnTheArray(focusItem.item.id, globalDataItems, 'arrayItemId');

        if (receiverIndex !==-1){
            itemQuantity = globalDataItems[receiverIndex].quantity;
        }
    }

    const listInstantEffect = focusItem.item.interactions.map((arr, index)=>
        <ItemInteractions key={index} interactionIndex={index} arrayData={arr} useItem = {(interactionIndex)=>props.useItem(interactionIndex, itemQuantity)} />
    );

    return (
        <div>
            <div className="centered modale-background" style={{display:styleInfoBox}}></div>

            <CSSTransitionGroup
                transitionName="zoomIn"
                transitionAppear={true} transitionAppearTimeout={500}
                transitionEnter={false} transitionEnterTimeout={500}
                transitionLeave={false} transitionLeaveTimeout={500}
            >
                <div className="centered info-box" style={{display:styleInfoBox}}>
                    <a className="close" onClick={() => props.toggleVisionInfoBox(false)}>X</a>

                    <div className="info-box-image">
                        <img src={focusItem.item.image} className="img_background"/>
                        <span className="numberOfItems">{itemQuantity}</span>
                    </div>

                    <div className="info-box-text">
                        <p className="info-box-header">{focusItem.item.name}</p>
                        <p className="info-box-discription">{focusItem.item.discription}</p>
                    </div>

                    {listInstantEffect}

                </div>
            </CSSTransitionGroup>
        </div>

    );

}

class Inventory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {focus:'items', showItemInfo:false, focusItem:''};
    }

    changeTabFocus(newFocus){
        this.setState({focus:newFocus});
    }

    getTabStyle(focus){
        if (focus == 'items'){
            let tabsStyle = {
                items: {
                    tabButton: {backgroundColor: '#e0e1e0', color:'#351728', fontWeight:'bold'},
                    tabPanel: {display: 'block'}
                },
                clothing:{
                    tabButton: {},
                    tabPanel: {display: 'none'}
                },
                magic:{
                    tabButton: {},
                    tabPanel: {display: 'none'}
                }
            }

            return tabsStyle;
        }if (focus == 'clothing'){
            let tabsStyle = {
                items: {
                    tabButton: {},
                    tabPanel: {display: 'none'}
                },
                clothing:{
                    tabButton: {backgroundColor: '#e0e1e0', color:'#351728', fontWeight:'bold'},
                    tabPanel: {display: 'block'}
                },
                magic:{
                    tabButton: {},
                    tabPanel: {display: 'none'}
                }
            }
            return tabsStyle;
        }if (focus == 'magic'){
            let tabsStyle = {
                items: {
                    tabButton: {},
                    tabPanel: {display: 'none'}
                },
                clothing:{
                    tabButton: {},
                    tabPanel: {display: 'none'}
                },
                magic:{
                    tabButton: {backgroundColor: '#e0e1e0', color:'#351728', fontWeight:'bold'},
                    tabPanel: {display: 'block'}
                }
            }
            return tabsStyle;
        }
    }

    useItem(interactionIndex, itemQuantity){
        if (itemQuantity>0){
            this.props.changeStates('useItem', {item:this.state.focusItem.item, interactionIndex:interactionIndex});
        } else {
            alert('Не достаточное количество для использования!');
        }
    }

    toggleVisionInfoBox(showInfoBox, item){
        this.setState({showItemInfo:showInfoBox, focusItem:item});
    }

    render() {
        const location = this.props.data.General.location;
        const tabStyle = this.getTabStyle(this.state.focus);

        const listOfTheItems = this.props.data.Player.playerStore.items.map((arr, index)=>
            <ItemsOnInventary key={index} arrayData={arr} globalData={this.props.data} toggleVisionInfoBox={(showInfoBox)=>this.toggleVisionInfoBox(showInfoBox, arr)} />
        );

        const listOfClothing = this.props.data.Player.playerStore.clothing.map((arr)=>
            <div className="itemOfClothing" key={arr.name.toString()} style={{height:arr.size.height,width:arr.size.width}}>
                <img src={arr.image}/>
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

                            <div className="centered container_layer">
                                <div className="header-panel">
                                    <a className="close" onClick={() => this.props.changeStates('changeTpl', {tpl:templates.location})}>X</a>
                                    <HeaderPanelOptions thisData={this.props.data} changeTpl={() => this.props.changeStates('changeTpl', {tpl:templates.playerOptionsInfo})} />
                                </div>

                                <div className="inventory">
                                    <div className="tabs">
                                        <div style={tabStyle.items.tabButton} className="tabButton" onClick={() => this.changeTabFocus('items')}>
                                            <img src={Images.ico.store} className="tabButtonImg"/>
                                            <a className="tabButtonText">Предметы</a>
                                        </div>
                                        <div style={tabStyle.clothing.tabButton} className="tabButton" onClick={() => this.changeTabFocus('clothing')}>
                                            <img src={Images.ico.hanger} className="tabButtonImg"/>
                                            <a className="tabButtonText">Одежда</a>
                                        </div>
                                        <div style={tabStyle.magic.tabButton} className="tabButton" onClick={() => this.changeTabFocus('magic')}>
                                            <img src={Images.ico.energyYellow} className="tabButtonImg"/>
                                            <a className="tabButtonText">Магия</a>
                                        </div>
                                    </div>

                                    <div style={tabStyle.items.tabPanel} className="tabPanel items">

                                        <CSSTransitionGroup transitionName="movingItems" transitionAppear={true} transitionAppearTimeout={500} transitionEnter={true} transitionEnterTimeout={500} transitionLeave={true} transitionLeaveTimeout={500}>
                                            {listOfTheItems}
                                        </CSSTransitionGroup>

                                    </div>

                                    <div style={tabStyle.clothing.tabPanel} className="tabPanel clothing">{listOfClothing}</div>
                                    <div style={tabStyle.magic.tabPanel} className="tabPanel magic"></div>
                                </div>
                            </div>
                        </CSSTransitionGroup>

                        <ItemInfo thisState={this.state} globalData={this.props.data} toggleVisionInfoBox={(showInfoBox)=>this.toggleVisionInfoBox(showInfoBox, '')} useItem = {(interactionIndex, itemQuantity)=>this.useItem(interactionIndex, itemQuantity)} />
                    </div>
            </div>
        )
    }
}

export default Inventory;