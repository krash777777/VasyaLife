import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import CountUp from 'react-countup';

import Images from '../db/db_img.jsx';
import templates from '../db/db_templates.jsx';
import {changeTime,parseTimeData} from '../modules/options.jsx';

class InstantAction extends React.Component {

    constructor(props) {
        super(props);
        this.state = {instantAction:'', key:0};
    }


    goToLocation(transition){
        this.props.changeStates('changeTime', {interval:transition.transitionTime});
        this.props.changeStates('changeLocation', {location:transition.location});
    }

    render() {

        const location = this.props.data.General.location;
        const action = this.props.data.General.action;

        let Time = parseTimeData(this.props.data.General.dateAndTime.time);
        let previousTime = parseTimeData(action.timePreviousValue);

        let hours = <CountUp start={previousTime.hours} end={Time.hours} duration={action.animationTime} />;
        let minutes = <CountUp start={previousTime.minutes} end={Time.minutes} duration={action.animationTime} />;

        return (
            <div id="background">

                    <div className="game_container centered container_layer txt-no-select">
                        <div className="centered container_layer">
                            <img src={location.img} className="img_background"/>
                        </div>



                        <div className="centered container_layer">

                            <div className="centered modale-background"></div>

                            <div className="header-panel">
                                <a className="time" >{Time.prefixH}{hours}<span className="anima-sec">:</span>{Time.prefixM}{minutes}</a>
                            </div>

                            <div className="ia-rightPanel">
                                <div className="ia-option-component" key={0}>
                                    <div className="componen-img"><img src={Images.ico.lifeEnergy}/></div>
                                    <div className={'component-value-minus'}>{'-'}{56}</div>
                                </div>
                                <div className="ia-option-component" key={1}>
                                    <div className="componen-img"><img src={Images.ico.coffee}/></div>
                                    <div className={'component-value-minus'}>{'-'}{56}</div>
                                </div>
                                <div className="ia-option-component" key={2}>
                                    <div className="componen-img"><img src={Images.ico.sleep}/></div>
                                    <div className={'component-value-minus'}>{'-'}{56}</div>
                                </div>
                            </div>

                            <CSSTransitionGroup
                                transitionName="zoomOut"
                                transitionAppear={true} transitionAppearTimeout={500}
                                transitionEnter={false} transitionEnterTimeout={500}
                                transitionLeave={false} transitionLeaveTimeout={500}
                            >
                                <div className="instanAction centered" onClick={() => this.props.changeStates('instantActionisOver')}>



                                    <img className="instanActionImg" src={action.image}/>
                                </div>
                            </CSSTransitionGroup>
                        </div>
                    </div>

            </div>
        )
    }
}

export default InstantAction;