import React from 'react';
//import ReactDOM from 'react-dom';

import { CSSTransitionGroup } from 'react-transition-group';

import templates from '../db/db_templates.jsx';
import Images from '../db/db_img.jsx';

class Location extends React.Component {

    render() {
        return (
            <div id="background">
                <CSSTransitionGroup
                    transitionName="zoomIn"
                    transitionAppear={true} transitionAppearTimeout={500}
                    transitionEnter={false} transitionEnterTimeout={500}
                    transitionLeave={false} transitionLeaveTimeout={500}
                >

                    <div className="centered container_layer game_container txt-no-select">
                        <a className="close" onClick={() => this.props.changeStates('changeTpl', {tpl:templates.homePage})}>X</a>

                        <h1 className="tpl_header">Сохранения</h1>

                        <div className="seve_unit" onClick={() => alert('1')}>
                            <img src={Images.backgrounds.death} className="img_background backdround_layer"/>
                            <h3 className="text-save">15.02.2020</h3>
                            <h4 className="text-save">15:43</h4>
                        </div>

                        <div className="seve_unit"></div>
                        <div className="seve_unit"></div>

                        <div className="seve_unit"></div>
                        <div className="seve_unit"></div>
                        <div className="seve_unit"></div>

                        <div className="seve_unit"></div>
                        <div className="seve_unit"></div>
                        <div className="seve_unit"></div>

                        {/*<img src={arrInteraction.img_background==''?this.props.data.General.location.img:arrInteraction.img_background} className="img_background"/>*/}
                    </div>



                </CSSTransitionGroup>
            </div>
        )
    }
}

export default Location;