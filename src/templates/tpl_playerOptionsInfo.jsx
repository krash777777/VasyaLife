import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import CountUp from 'react-countup';

import Images from '../db/db_img.jsx';
import templates from '../db/db_templates.jsx';
import animation from '../db/db_animation.jsx';

import {changeTime,parseTimeData} from '../modules/options.jsx';
import {TimePresent} from '../templates/tpl_interfaceParts.jsx';


function OptionPresent(props) {

    let arr = props.arrayData;

    var optionValue = arr.optionValue;
    var modifiersSumm = arr.modifierValue;

    var changeInfo = '';
    if (modifiersSumm>0){
        changeInfo = optionValue+'+'+modifiersSumm;
    }if (modifiersSumm<0){
        changeInfo = ''+optionValue+''+modifiersSumm;
    }


    var arrComponens = [];
    const modifiers = props.globalPlayerOtions.modifiers;
    for(var i = 0; i < modifiers.length; i++) {
        var modOPtions = modifiers[i].modifier.modifiers;
        for(var a = 0; a < modOPtions.length; a++){

            if (modOPtions[a].option.id == arr.option.id ){
                arrComponens[arrComponens.length] = {image:modifiers[i].modifier.image, value:modOPtions[a].value};
            }
        }
    }

    let mod = arrComponens.map((arrMod, index)=>

        <div className="component" key={index}>
            <div className="componen-img"><img src={arrMod.image}/></div>
            <div className={arrMod.value>0?'component-value-plus':'component-value-minus'}>{arrMod.value>0?'+':''}{arrMod.value}</div>
        </div>

    );

    let classValue = 'component-value-norm';
    if (mod.length>0){
        classValue = modifiersSumm<0?'component-value-minus':'component-value-plus';
    }

    return (
        <div className="infoBox">


            <div className="info-visual">

                <div className="infoImg">
                    <img src={arr.option.image}/>
                </div>
                <div className="infoValue">
                    <a className={classValue}>{arr.totalValue}</a>
                </div>

                {/*<div className="infoValueComponents">*/}
                    {/*<a className={modifiersSumm>0?'component-value-plus':'component-value-minus'}>{modifiersSumm==0?'':modifiersSumm}</a>*/}
                {/*</div>*/}
            </div>

            <div className="info-discription">
                <p className="info-discription-header">{arr.option.name}</p>
                <p className="info-discription-string">{arr.option.discription}</p>
            </div>

            <div className="info-components">
                {mod}
            </div>

            {/*этот див нужен для автоматического растягивания родительского*/}
            <div style={{clear:'both'}}></div>
        </div>
    );

}

function ModifierPresent(props) {

    let arr = props.arrayData;
    let modOptions = arr.modifier.modifiers;

    let modOption = modOptions.map((arrOption, index)=>

        <div className="component" key={index}>
            <div className="componen-img"><img src={arrOption.option.image}/></div>
            <div className={arrOption.value>0?'component-value-plus':'component-value-minus'}>{arrOption.value>0?'+':''}{arrOption.value}</div>
        </div>

    );
    return (

        <div className="infoBox">
            <div className="info-visual">
                <div className="infoImg">
                    <img src={arr.modifier.image}/>
                </div>
                <div className="infoValueModifier">
                    <TimePresent value={arr.actionTime} />
                </div>
            </div>
            <div className="info-discription">
                <p className="info-discription-header">{arr.modifier.name}</p>
                <p className="info-discription-string">{arr.modifier.discription}</p>
            </div>

            <div className="info-components">
                {modOption}
            </div>

            {/*этот див нужен для автоматического растягивания родительского*/}
            <div style={{clear:'both'}}></div>
        </div>

    );
}


class PlayerOptionsInfo extends React.Component {

    render() {
        const location = this.props.data.General.location;

        const playerOptions = this.props.data.Player.characteristics.map((arr, index)=>

            <OptionPresent key={index} arrayData={arr} globalPlayerOtions={this.props.data.Player} />

        );

        const playerOptionsModifiers = this.props.data.Player.modifiers.map((arr, index)=>

            <ModifierPresent key={index} arrayData={arr} globalPlayerOtions={this.props.data.Player} />

        );

        return (
            <div id="background">


                    <div className="game_container centered container_layer txt-no-select">
                        <div className="tpl-background" style={{opacity:0.7}}>
                            <img src={location.img} className="img_background"/>
                        </div>



                            <div className="centered container_layer">
                                <div className="header-panel">
                                    <a className="close" onClick={() => this.props.changeStates('changeTpl', {tpl:templates.location})}>X</a>
                                </div>

                                <CSSTransitionGroup
                                    transitionName='zoomIn'
                                    transitionAppear={true} transitionAppearTimeout={500}
                                    transitionEnter={false} transitionEnterTimeout={500}
                                    transitionLeave={false} transitionLeaveTimeout={500}
                                >

                                    <div className="optionsInfo inventory">
                                        <div className="options">
                                            <div className="label"><a>Параметры</a></div>
                                                {playerOptions}

                                            {/*<div className="infoBox">*/}


                                                {/*<div className="info-visual">*/}
                                                    {/*<div className="infoImg">*/}
                                                        {/*<img src={Images.ico.heart}/>*/}
                                                    {/*</div>*/}
                                                    {/*<div className="infoValue">*/}
                                                        {/*<a>259 <span style={{color:'black'}}>/</span> 22%</a>*/}
                                                    {/*</div>*/}
                                                    {/*<div className="infoValueComponents">*/}
                                                        {/*<a>259+79</a>*/}
                                                    {/*</div>*/}
                                                {/*</div>*/}

                                                {/*<div className="info-discription">*/}
                                                    {/*<p className="info-discription-header">Жизненная энергия</p>*/}
                                                    {/*<p className="info-discription-string">Оооочень длинное описание</p>*/}
                                                {/*</div>*/}

                                                {/*<div className="info-components">*/}
                                                    {/*<div className="component">*/}
                                                        {/*<div className="componen-img"><img src={Images.ico.poison}/></div>*/}
                                                        {/*<div className="component-value-minus">-15</div>*/}
                                                    {/*</div>*/}
                                                    {/*<div className="component">*/}
                                                        {/*<div className="componen-img"><img src={Images.ico.shower}/></div>*/}
                                                        {/*<div className="component-value-plus">+15</div>*/}
                                                    {/*</div>*/}
                                                    {/*<div className="component">*/}
                                                        {/*<div className="componen-img"><img src={Images.ico.coffee}/></div>*/}
                                                        {/*<div className="component-value-plus">+15</div>*/}
                                                    {/*</div>*/}
                                                    {/*<div className="component">*/}
                                                        {/*<div className="componen-img"><img src={Images.ico.coffee}/></div>*/}
                                                        {/*<div className="component-value-plus">+15</div>*/}
                                                    {/*</div>*/}
                                                {/*</div>*/}



                                                {/*/!*этот див нужен для автоматического растягивания родительского*!/*/}
                                                {/*<div style={{clear:'both'}}></div>*/}
                                            {/*</div>*/}

                                        </div>
                                        <div className="modifiers">
                                            <div className="label"><a>Модификаторы</a></div>
                                                {playerOptionsModifiers}
                                        </div>
                                    </div>

                                </CSSTransitionGroup>

                            </div>



                    </div>

            </div>
        )
    }
}

export default PlayerOptionsInfo;