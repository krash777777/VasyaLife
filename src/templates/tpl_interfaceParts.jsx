import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import CountUp from 'react-countup';

//import {changeTimeData,parseTimeData} from '../modules/time.jsx';
import {changeTime,parseTimeData} from '../modules/options.jsx';

import {findeNpcInLocation} from '../modules/npc.jsx';

import ScenesGeneral from '../db/db_scenesGeneral.jsx';
import Images from '../db/db_img.jsx';
import templates from '../db/db_templates.jsx';


function TimePresent(props) {
    let parseTime = parseTimeData(props.value);
    //let timePresent = parseTime.prefixH+parseTime.hours+':'+parseTime.prefixM+parseTime.minutes;

    if (props.value>6039){
        return <a>{'∞'}</a>;
    } else {
        // return <a>{parseTime.prefixH+parseTime.hours}<span className="anima-sec">:</span>{parseTime.prefixM+parseTime.minutes}</a>;

        return <a>{parseTime.hours+':'+parseTime.prefixM+parseTime.minutes}</a>;
    }
}

function HeaderPanelOptions(props) {
    const location = props.thisData.General.location;

    const playerOptions = props.thisData.Player.options.map((arr, index)=>
        <div className="ico-wrapper"
             title={arr.option.name}
             key={index}
             onClick={() => props.changeTpl()}
        >
            <img src={arr.option.image} className="img_background"/>
            <a className="characteristic-value">{arr.value}</a>
            {/*<a className="characteristic-value">{<CountUp start={arr.value<1 ? 0 : arr.value-1} end={arr.value} duration={1} />}</a>*/}
        </div>
    );

    const playerCharacteristics = props.thisData.Player.characteristics.map((arr, index)=>
        <div className='ico-wrapper'
             title={arr.option.name}
             key={index}
             onClick={() => props.changeTpl()}
        >
            <img src={arr.option.image} className="img_background"/>
            <a className={arr.style+' '+arr.animation+' characteristic-value'}>{arr.totalValue}</a>
            {/*<a className="characteristic-value">{<CountUp start={arr.value<1 ? 0 : arr.value-1} end={arr.value} duration={1} />}</a>*/}
        </div>
    );

    const playerOptionsModifiers = props.thisData.Player.modifiers.map((arr, index)=>
    // ico-modifires-wrapper
        <div className="ico-wrapper"
             title={arr.modifier.name + '. Осталось '+arr.actionTime+' минут'}
             key={index}
             onClick={() => props.changeTpl()}
        >
            <img src={arr.modifier.image} className="img_background"/>
            {/*<a className="characteristic-value">{arr.actionTime}</a>*/}
            <TimePresent key={index} value={arr.actionTime} />
        </div>
    );



    return (
        <div>
            <div style={{display:location.panelsVision.optionsPanel}} className="options-panel">{playerCharacteristics}<div style={{clear:'both'}}></div></div>
            <div style={{display:location.panelsVision.optionsPanel}} className="modifires">

                <CSSTransitionGroup transitionName="movingItems" transitionAppear={true} transitionAppearTimeout={500} transitionEnter={true} transitionEnterTimeout={500} transitionLeave={true} transitionLeaveTimeout={500}>
                    {playerOptionsModifiers}
                </CSSTransitionGroup>
                <div style={{clear:'both'}}></div>
            </div>
        </div>
    );
}

export {HeaderPanelOptions, TimePresent};
