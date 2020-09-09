import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import CountUp from 'react-countup';

import Images from '../db/db_img.jsx';
import Video from '../db/db_video.jsx';
import templates from '../db/db_templates.jsx';
import {HeaderPanelOptions} from './tpl_interfaceParts.jsx';


class Action extends React.Component {
    constructor(props) {
        super(props);
        this.state = {block:'init'};
    }

    makeActTransition(options){
        if (options.address == 'end'){
            this.props.changeStates('sceneIsOver', []);
        } else {
            this.props.changeStates('nextScene', options);
            this.setState({block:options.address});
        }
    }

    render() {
        const currentBlock = this.state.block;
        const location = this.props.data.General.location;
        const act = this.props.data.General.action[currentBlock];


        const playerOptions = this.props.data.Player.options.map((arr)=>
            <div className="ico-wrapper" title={arr.option.name} key={arr.option.name.toString()}>
                <img src={arr.option.image} className="img_background"/>
                {/*<a className="characteristic-value">{arr.value}</a>*/}
                <a className="characteristic-value">{<CountUp start={arr.value<1 ? 0 : arr.value-1} end={arr.value} duration={1} />}</a>
            </div>
        );

        const transitionList = act.transitions.map((arrTransition, index)=>
            <div className="actionControlCommand" key={index} onClick={() => this.makeActTransition(arrTransition)}>
                <img className="actionIco" src={arrTransition.img}/>
                <a className="actionText">{arrTransition.text}</a>
            </div>
        );

        return (
            <div id="background">

                <CSSTransitionGroup
                    transitionName="stretchHorizontally"
                    transitionAppear={true} transitionAppearTimeout={500}
                    transitionEnter={true} transitionEnterTimeout={500}
                    transitionLeave={false} transitionLeaveTimeout={500}
                >
                    <div className="centered videoAction txt-no-select">
                    {/*<div className="game_container centered container_layer txt-no-select">*/}
                        <div className="tpl-background">
                            <video className="videoAction game_container" src={act.video} type="video/mp4" autoPlay loop />
                        </div>

                        <div className="centered videoAction equipment-background">
                            <HeaderPanelOptions thisData={this.props.data} changeTpl={() => this.props.changeStates('changeTpl', {tpl:templates.playerOptionsInfo})} />

                            {/*<div className="optionsChangePanel fadeInDown">*/}
                                {/*<div className="optionsChange minus">*/}
                                    {/*<img className="icoOption" src={Images.ico.female}/>*/}
                                    {/*<a className="optionChangeSign optionText">-</a>*/}
                                    {/*<a className="optionChangeValue optionText">10</a>*/}
                                {/*</div>*/}
                                {/*<div className="optionsChange plus">*/}
                                    {/*<img className="icoOption" src={Images.ico.strawberry}/>*/}
                                    {/*<a className="optionChangeSign optionText">+</a>*/}
                                    {/*<a className="optionChangeValue optionText">15</a>*/}
                                {/*</div>*/}
                            {/*</div>*/}

                            <div className="actionControlPanel">
                                {transitionList}
                            </div>

                        </div>
                    </div>
                </CSSTransitionGroup>
            </div>
        )
    }
}

export default Action;