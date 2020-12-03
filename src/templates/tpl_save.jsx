import React from 'react';
//import ReactDOM from 'react-dom';

import { CSSTransitionGroup } from 'react-transition-group';

import templates from '../db/db_templates.jsx';
import Images from '../db/db_img.jsx';
import animations from '../db/db_animation.jsx';

class Location extends React.Component {

    loadGame(currentIndex){
        this.props.loadAndSave('loadGame', {currentIndex});
    }

    render() {

        let gameSave = JSON.parse(localStorage.getItem("VL_saveList"));
        //console.log(gameSave);

        var arrSave = [];
        if (!gameSave){
            var sStr = {date:'',time:'',data:''};

            for(var i = 0; i < 9; i++) {
                arrSave[i] = sStr;
            }
        } else {
            arrSave = gameSave;
        }

        let loadList = arrSave.map((arr, index)=>
            <div
                key={index}
                className="seve_unit"
                onClick={() => this.loadGame(index)}
            >
                <img src={arr.data == ''?Images.backgrounds.bubbles:arr.data.General.location.img} className={arr.data == ''?'cellSaveOpacity img_background backdround_layer':"img_background backdround_layer"}/>
                <h3 className="text-save">{arr.date == ''?'>---<':arr.date}</h3>
                <h4 className="text-save">{arr.time == ''?'>---<':arr.time}</h4>
            </div>
        );

        return (
            <div id="background">

                <div className="game_container centered container_layer">
                    <div className="centered container_layer">
                        <img src={Images.backgrounds.homePage} className="img_background"/>
                    </div>
                </div>

                <CSSTransitionGroup
                    transitionName={animations.transparency}
                    transitionAppear={true} transitionAppearTimeout={500}
                    transitionEnter={false} transitionEnterTimeout={500}
                    transitionLeave={false} transitionLeaveTimeout={500}
                >


                    <div className="centered container_layer game_container txt-no-select">
                        <a className="close" onClick={() => this.props.changeStates('changeTpl', {tpl:templates.homePage})}>X</a>

                        <h1 className="tpl_header">Сохранения</h1>

                        {loadList}
                    </div>

                </CSSTransitionGroup>
            </div>
        )
    }
}

export default Location;