import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import CountUp from 'react-countup';


import {changeTime,parseTimeData} from '../modules/options.jsx';
import {findeNpcInLocation} from '../modules/npc.jsx';
import {findeValueOnTheArray, findeRecepie, getNpcRelations, checkConditions} from '../modules/service.jsx';

import ScenesGeneral from '../db/db_scenesGeneral.jsx';
import Images from '../db/db_img.jsx';
import templates from '../db/db_templates.jsx';
import animations from '../db/db_animation.jsx';


import {HeaderPanelOptions} from './tpl_interfaceParts.jsx';

function getAvailableActions(actions, gameStatus) {
    var availableActions =[];

    for (var i = 0; i < actions.length; i++){

        if (actions[i].conditions.length !== 0){
            var checkConditionResult = checkConditions(actions[i].conditions, gameStatus);

            if (checkConditionResult == 'success'){
                availableActions[availableActions.length+1]=actions[i];
            }
        }else{
            availableActions[availableActions.length+1]=actions[i];
        }

    }

    return availableActions;
}

function getClassBoxShadow(hour){

    let classBoxShadow = '';

    if (hour>=0){
        classBoxShadow = 'box_shadow_deep_night';
    } if (hour>=3){
        classBoxShadow = 'box_shadow_night';
    } if (hour>=4){
        classBoxShadow = 'box_shadow_evening';
    } if (hour>=6){
        classBoxShadow = 'box_shadow_dusk';
    } if (hour>=7){
        classBoxShadow = '';
    } if (hour>=16){
        classBoxShadow = 'box_shadow_dusk';
    } if (hour>=19){
        classBoxShadow = 'box_shadow_evening';
    }if (hour>=21){
        classBoxShadow = 'box_shadow_night';
    }if (hour>=23){
        classBoxShadow = 'box_shadow_deep_night';
    }

    //console.log(classBoxShadow);

    return classBoxShadow;
}

class Location extends React.Component {

    constructor(props) {
        super(props);
        this.state = {instantAction:'', animate:'instantActionAnimation'};
    }

    doInstantAction(actOptions){
        this.props.changeStates('launchInstantAction', {act:actOptions.act});
    }

    initConversation(arrNpc){
        this.props.changeStates('launchScene', {arrNpc});
    }

    goToLocation(transition){
        this.props.changeStates('goToLocation', {location:transition.location, interval:transition.transitionTime});
    }

    relax(interval){
        this.props.changeStates('relax', {interval:interval});
    }

    render() {
        const location = this.props.data.General.location;
        const Time = parseTimeData(this.props.data.General.dateAndTime.time);

        let hours = <CountUp start={Time.hours<1 ? 0 : Time.hours-1} end={Time.hours} duration={1} />;
        let minutes = <CountUp start={Time.minutes<10 ? 0 : Time.minutes-10} end={Time.minutes} duration={1} />;

        //console.log(Time.hours);
        let classBoxShadowNight = getClassBoxShadow(Time.hours);


        const listTransitions = location.transitions.map((transition) =>
            <div
                className="motion"
                key={transition.name.toString()}
                style={{top:transition.indentationTop, left:transition.indentationLeft}}
                onClick={() => this.goToLocation(transition)}
            >
            <img className="icoTransition" src={transition.img}/>
                <a className="textTransition">{transition.name}</a>
            </div>
        );

        const listActionRoom = location.actionRoom.map((act, index) =>
            <div
                className="actionRoom"
                key={index}
                style={{top:act.indentationTop, left:act.indentationLeft}}
                onClick={() => this.props.changeStates('changeTpl', {tpl:act.tpl})}
            >
                <img className="icoTransition" src={act.img}/>
                <a className="textTransition">{act.name}</a>
            </div>
        );

        let varActions = getAvailableActions(location.actions, this.props.data);
        const listActions = varActions.map((act) =>
            <div
                className="actionRoom"
                key={act.name.toString()}
                style={{top:act.indentationTop, left:act.indentationLeft}}
                onClick={() => this.props.changeStates('changeTplAndAction', {tpl:act.tpl, action:act.action})}
            >
                <img className="icoTransition" src={act.img}/>
                <a className="textTransition">{act.name}</a>
            </div>
        );


        // const listActions = location.actions.map((act) =>
        //     <div
        //         className="actionRoom"
        //         key={act.name.toString()}
        //         style={{top:act.indentationTop, left:act.indentationLeft}}
        //         onClick={() => this.props.changeStates('changeTplAndAction', {tpl:act.tpl, action:act.action})}
        //     >
        //         <img className="icoTransition" src={act.img}/>
        //         <a className="textTransition">{act.name}</a>
        //     </div>
        // );

        const listInstantActions = location.instantAction.map((ia, index) =>
            <div
                className="actionRoom"
                key={index}
                style={{top:ia.indentationTop, left:ia.indentationLeft}}
                onClick={()=>this.doInstantAction(ia)}
            >
                <img className="icoTransition" src={ia.act.ico}/>
                <a className="textTransition">{ia.act.text}</a>
            </div>
        );

        const playerOptions = this.props.data.Player.options.map((arr)=>
            <div className="ico-wrapper"
                 title={arr.option.name}
                 key={arr.option.name.toString()}
                 onClick={() => this.props.changeStates('changeTpl', {tpl:templates.playerOptionsInfo})}
            >
                <img src={arr.option.image} className="img_background"/>
                <a className="characteristic-value">{arr.value}</a>
                {/*<a className="characteristic-value">{<CountUp start={arr.value<1 ? 0 : arr.value-1} end={arr.value} duration={1} />}</a>*/}
            </div>
        );

        const playerOptionsModifiers = this.props.data.Player.modifiers.map((arr, index)=>
            <div className="ico-modifires-wrapper"
                 title={arr.modifier.name + '. Осталось '+arr.actionTime+' минут'}
                 key={index}
                 onClick={() => this.props.changeStates('changeTpl', {tpl:templates.playerOptionsInfo})}
            >
                <img src={arr.modifier.image} className="img_background"/>
                {/*<a className="characteristic-value textDecoration-lowLevel">24h</a>*/}
            </div>
        );

        const cls = 'instanAction centered '+this.state.animate;
        const instantAction = this.state.instantAction==''?'':
            <div className={cls}>
                <img className="instanActionImg" src={this.state.instantAction}/>
            </div>

        let listNpc = this.props.data.General.npcInLocation.map((arrNpc, index)=>
            <div key={index}
                 className="npcInLocation"
                 style={{height:arrNpc.height, width:arrNpc.width, top:arrNpc.top, left:arrNpc.left}}
                 onClick={()=>this.initConversation(arrNpc)}
            >
                <img src={arrNpc.image}/>
            </div>
        );

        return (
            <div id="background">

                {/*stretchHorizontally*/}
                {/*zoomIn*/}
                {/*stretchZ*/}
                {/*blurBlinkAnimation*/}
                {/*blur*/}

                <CSSTransitionGroup
                    transitionName={animations.zoomIn}
                    transitionAppear={true} transitionAppearTimeout={500}
                    transitionEnter={true} transitionEnterTimeout={500}
                    transitionLeave={false} transitionLeaveTimeout={500}
                >

                    <div className="game_container centered container_layer txt-no-select">
                        <div className="centered container_layer">

                            {/*classBoxShadowNight*/}

                            <img src={location.img} className="img_background"/>
                        </div>
                        <div className={classBoxShadowNight+" centered container_layer"}>
                            <div className="header-panel">
                                <a style={{display:location.panelsVision.time}} className="time" onClick={() => this.relax(30)}>{Time.prefixH}{hours}<span className="anima-sec">:</span>{Time.prefixM}{minutes}</a>

                                <HeaderPanelOptions thisData={this.props.data} changeTpl={() => this.props.changeStates('changeTpl', {tpl:templates.playerOptionsInfo})} />

                                {/*<div style={{display:location.panelsVision.optionsPanel}} className="options-panel">*/}
                                    {/*{playerOptions}*/}
                                {/*</div>*/}

                                {/*<div style={{display:location.panelsVision.optionsPanel}} className="modifires">*/}
                                    {/*{playerOptionsModifiers}*/}

                                    {/*<div className="ico-modifires-wrapper">*/}
                                        {/*<img src={Images.ico.poison} title={'Истощение. Осталось 11 дней.'} className="img_background"/>*/}
                                        {/*<a className="characteristic-value textDecoration-lowLevel">24h</a>*/}
                                    {/*</div>*/}
                                    {/*<div className="ico-modifires-wrapper">*/}
                                        {/*<img src={Images.ico.dispenser} className="img_background"/>*/}
                                        {/*<a className="characteristic-value textDecoration-averageLevel">25</a>*/}
                                    {/*</div>*/}
                                    {/*<div className="ico-modifires-wrapper">*/}
                                        {/*<img src={Images.ico.health} className="img_background"/>*/}
                                        {/*<a className="characteristic-value textDecoration-averageLevel">45</a>*/}
                                    {/*</div>*/}
                                {/*</div>*/}


                            </div>

                            <div className="right-panel">
                                <div style={{display:location.panelsVision.inventar}} className="panel-inventory" onClick={() => this.props.changeStates('changeTpl', {tpl:templates.inventory})}><img src={Images.ico.inventory}/></div>
                                <div style={{display:location.panelsVision.tablet}} className="panel-tablet" onClick={() => this.props.changeStates('changeTpl', {tpl:templates.information})}><img src={Images.ico.information}/></div>
                            </div>

                            {listTransitions}
                            {listActionRoom}
                            {listActions}

                            {listInstantActions}
                            {instantAction}

                            {listNpc}
                        </div>
                    </div>

                </CSSTransitionGroup>
            </div>
        )
    }
}

export default Location;