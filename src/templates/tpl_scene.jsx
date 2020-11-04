import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import Typist from 'react-typist';
import CountUp from 'react-countup';
import {findeValueOnTheArray, findeRecepie, getNpcRelations, checkConditions} from '../modules/service.jsx';
import {changeTime,parseTimeData, getSkyOpasity} from '../modules/options.jsx';


import Images from '../db/db_img.jsx';

class SceneTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {strIndex:0};
    }

    getNewTxtLine(index){
        if (this.props.data.iteration_text.length == (index+1)){
            if (this.props.data.transitions[0] !== 'end'){
                this.setState({strIndex:0});
            }
            this.props.makeTransition(this.props.data.transitions[0], this.props.data);
        } else {
            const nextIndex = index+1;
            this.setState({strIndex:nextIndex});
        }
    }

    getAvailableTransitions(arrTransitions){

        const gameData = JSON.parse(localStorage.getItem("VL"));

        var transitions = [], condition = [], arrQuests = gameData.GameMarks.quests, conditionCount = 0;
        for (var index = 0; index < arrTransitions.length; index++){

            condition = arrTransitions[index].condition;
            conditionCount = 0;
            for (var i = 0; i < condition.length; i++){
                //перебираем все указанные условия

                if (condition[i].type === 'quest'){
                    //проверям наличие квестов

                    for (var a = 0; a < arrQuests.length; a++){
                        //console.log(arrQuests[a].id + ' - '+condition[i].value);
                        if (arrQuests[a].id === condition[i].value){
                            conditionCount++; // увеличиваем счетчик если есть такой активный квест
                        }
                    }
                }
            }

            //если количество условий совпадает со счетчиком условий, значит добавляем такой переход
            if (condition.length === conditionCount){
                transitions[transitions.length+1]=arrTransitions[index];
            }


        }
        return transitions;
    }

    render() {
        const data = this.props.data;
        const block = this.props.block;

        const typeClass = "img_background";
        const npcClass = typeClass+" "+data.animationNPC;
        const npc = data.img_npc==''?'':
            <div className="npc">
                <img src={data.img_npc} className={npcClass}/>
            </div>;

        var transitions, text, playerSays, char, npcSays, npcOptions;


        if (data.type == 'transitions'){
            var availableTransitions = this.getAvailableTransitions(data.transitions);
            //console.log(availableTransitions);

            //const listTransitions = data.transitions.map((transition) =>
            const listTransitions = availableTransitions.map((transition) =>
                <li key={transition.text.toString()} onClick={() => this.props.makeTransition(transition.address, data)}>{transition.text}</li>
        );
            transitions =
                <div className="transitions-wrap">
                    <ul>{listTransitions}</ul>
                </div>;
        } if (data.type == 'playerSays'){
            text = data.iteration_text[this.state.strIndex];
            playerSays =
                <div className="txt-wrap" onClick={() => this.getNewTxtLine(this.state.strIndex)}>
                    <a className="txt-no-select">
                        <Typist key={block+''+this.state.strIndex} avgTypingDelay={30} startDelay={0} cursor={{show: false}}>{text}</Typist>
                    </a>
                </div>;

            char =
                <div className="char-ico">
                    <img src={data.img_character} className="img_background"/>
                </div>;
        } if (data.type == 'npcSays') {
             text = data.iteration_text[this.state.strIndex];
             npcSays =
                <div className="txt-wrap" onClick={() => this.getNewTxtLine(this.state.strIndex)}>
                    <a className="txt-no-select" style={{marginLeft: '2vw'}}>
                        <Typist key={block+''+this.state.strIndex} avgTypingDelay={30} startDelay={0} cursor={{show: false}} >{text}</Typist>
                    </a>
                </div>;

             npcOptions =
                <div className="scene-npcOptions-wrap">
                    <div className="scene-npcOption scene-npcOption-mood">
                        <p className="scene-npcOption-header">Настроение</p>
                        <p className="scene-npcOption-value">25</p>
                    </div>
                    <div className="scene-npcOption scene-npcOption-corruption">
                        <p className="scene-npcOption-header">Похоть</p>
                        <p className="scene-npcOption-value">15</p>
                    </div>
                </div>;
        }




        var optionsData = '', options = '';

        let changeState = data.change_states;
        for(var i = 0; i < changeState.length; i++) {
            var type = changeState[i].changeType;

            if (type == 'changeOptions'){
                optionsData = changeState[i].changeValue.map((arrOption, index)=>
                    <div key={index}>
                        <CSSTransitionGroup
                            transitionName="pulse"
                            transitionAppear={true} transitionAppearTimeout={500}
                            transitionEnter={false} transitionEnterTimeout={500}
                            transitionLeave={false} transitionLeaveTimeout={500}
                        >
                            <div className="ia-option-component" >
                                <div className="componen-img"><img src={arrOption.option.image}/></div>
                                <div className={arrOption.type=='increase'?'component-value-plus':'component-value-minus'}>{arrOption.type=='increase'?'+':'-'}<CountUp start={0} end={arrOption.value} duration={3} /></div>
                            </div>
                        </CSSTransitionGroup>
                    </div>
                );

                options =
                    <div className="scene-options-wrap">
                        {optionsData}
                    </div>
                ;
            }
        }



        return (
            <div className="centered container_layer">
                {npc}
                {transitions}
                {playerSays}
                {char}
                {npcSays}
                {npcOptions}
                {options}
            </div>
        )
    }
}

function NpcOptions(props) {
    if (props.npcRelations !== undefined) {
        return (
            <div className="scene-npcOptions-wrap">
                <div className="scene-npcOption scene-npcOption-mood">
                    <p className="npc-options-header">Отношения</p>
                    <img src={Images.ico.relations} className="npc-options-ico"/>
                    <div className="npc-options-value">{props.npcRelations.relations}</div>
                </div>

                <div className="scene-npcOption scene-npcOption-corruption">
                    <p className="npc-options-header">Разврат</p>
                    <img src={Images.ico.corruption} className="npc-options-ico"/>
                    <div className="npc-options-value">{props.npcRelations.corruption}</div>
                </div>
            </div>
        )
    }

    return <div></div>;
}

function Options(props) {
    let changeState = props.scene.change_states;
    for(var i = 0; i < changeState.length; i++) {
        var type = changeState[i].changeType;

        if (type == 'changeOptions'){
            var optionsData = changeState[i].changeValue.map((arrOption, index)=>
                <div key={index}>
                    <CSSTransitionGroup
                        transitionName="pulse"
                        transitionAppear={true} transitionAppearTimeout={500}
                        transitionEnter={false} transitionEnterTimeout={500}
                        transitionLeave={false} transitionLeaveTimeout={500}
                    >
                        <div className="ia-option-component" >
                            <div className="componen-img"><img src={arrOption.option.image}/></div>
                            <div className={arrOption.type=='increase'?'component-value-plus':'component-value-minus'}>{arrOption.type=='increase'?'+':'-'}<CountUp start={0} end={arrOption.value} duration={3} /></div>
                        </div>
                    </CSSTransitionGroup>
                </div>
            );

            return (
                <div className="scene-options-wrap">
                    {optionsData}
                </div>
            );

        }
    }

    return <div></div>
}

function getAvailableTransitions(arrTransitions, gameStatus) {
    var transitions = [];

    for (var index = 0; index < arrTransitions.length; index++){

        var checkConditionResult = checkConditions(arrTransitions[index].condition, gameStatus);

        if (checkConditionResult == 'success'){
            transitions[transitions.length+1]=arrTransitions[index];
        }
    }
    return transitions;
}

function getAvailableTransitions2(arrTransitions, npcRelations) {
    const gameData = JSON.parse(localStorage.getItem("VL"));

    var transitions = [], condition = [], arrQuests = gameData.GameMarks.quests, conditionCount = 0;
    for (var index = 0; index < arrTransitions.length; index++){

        condition = arrTransitions[index].condition;
        conditionCount = 0;
        for (var i = 0; i < condition.length; i++){
            //перебираем все указанные условия

            if (condition[i].option == 'quest'){
                //проверям наличие квестов

                if (condition[i].type == 'equally'){
                    for (var a = 0; a < arrQuests.length; a++){
                        if (arrQuests[a].id == condition[i].value){
                            conditionCount++; // увеличиваем счетчик если есть такой активный квест
                        }
                    }
                }
            }

            if (condition[i].option == 'relations'){
                if (condition[i].type == 'more'){if (npcRelations.relations > condition[i].value){conditionCount++}}
                if (condition[i].type == 'equally'){if (npcRelations.relations < condition[i].value){conditionCount++}}
                if (condition[i].type == 'equally'){if (npcRelations.relations = condition[i].value){conditionCount++}}
            }

            if (condition[i].option == 'corruption'){
                if (condition[i].type == 'more'){if (npcRelations.corruption > condition[i].value){conditionCount++}}
                if (condition[i].type == 'equally'){if (npcRelations.corruption < condition[i].value){conditionCount++}}
                if (condition[i].type == 'equally'){if (npcRelations.corruption = condition[i].value){conditionCount++}}
            }

            if (condition[i].option == 'item'){
                let playerItems = gameData.Player.playerStore.items;

                for (var indexItem = 0; indexItem < playerItems.length; indexItem++){
                    if (playerItems[indexItem].item.id == condition[i].value.id){
                        conditionCount++
                    }
                }

            }

        }


        //если количество условий совпадает со счетчиком условий, значит добавляем такой переход
        if (condition.length === conditionCount){
            transitions[transitions.length+1]=arrTransitions[index];
        }


    }
    return transitions;
}

function Transitions(props) {

    if (props.scene.type !=='transitions'){
        return <div></div>;
    } else {
        let transitions = props.scene.transitions;

        var availableTransitions = getAvailableTransitions(transitions, props.data);
        //var availableTransitions = getAvailableTransitions(transitions, props.npcRelations);

        let listTransitions = availableTransitions.map((transition, index) =>
            <li key={index} onClick={() => props.makeTransition(transition.address, props.scene)}>
                <img className="icoTransitionText" src={Images.ico.map}/>
                {transition.text}
            </li>
        );

        if (listTransitions.length>0){
            return (
                <div className="transitions-wrap">
                    <ul>{listTransitions}</ul>
                </div>
            );
        }

        return <div></div>;
    }
}

function getNpcRelations2(npc, arrNpcGlobal) {

    if (npc !== ''){
        for(var i = 0; i < arrNpcGlobal.length; i++) {
            if (arrNpcGlobal[i].npc.id == npc.id){
                return {relations:arrNpcGlobal[i].relations, corruption:arrNpcGlobal[i].corruption};
            }
        }
    }

    return undefined;
}

function getNpcReaction(scene, npcRelations) {
    let npcStyle = scene.npcStyle;

    if (npcRelations !== 'undefined'){

        let npcMoodOptions = scene.npc.moodOptions;
        for(var i = 0; i < npcMoodOptions.length; i++) {
            if (npcRelations.relations>=npcMoodOptions[i].relationsMin && npcRelations.relations<npcMoodOptions[i].relationsMax){
                let npcImage = npcStyle.interior[npcMoodOptions[i].mood];
                let npcReactionText = npcMoodOptions[i].text;
                return {image:npcImage, text:npcReactionText};
            }
        }
    }
}

function ImageNpc(props) {
    let scene = props.scene;


    let typeClass = "img_background";
    let npcClass = typeClass+" "+scene.animationNPC;

    if (scene.npcImage==''){
        return <div></div>;
    } if (scene.npcImage=='react'){

        let npcReaction = getNpcReaction(scene, props.npcRelations);

        return (
            <div>
                <div className="npc">
                    <img src={npcReaction.image} className={npcClass}/>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <div className="npc">
                    <img src={scene.npcImage} className={npcClass}/>
                </div>
            </div>
        )
    }

}

function Text(props) {

    let scene = props.scene;

    if (scene.type == 'transitions'){
        return <div></div>;
    } else {

        let text = scene.iteration_text[props.strIndex];

        if (scene.iteration_text[0]=='react'){
            //получим реакцию НИП

            let npcReaction = getNpcReaction(scene, props.npcRelations);
            text = npcReaction.text;
        }


        let npcSays =
            <div className="txt-wrap" onClick={() => props.getNewTxtLine(props.strIndex)}>
                <a className="txt-no-select" style={{marginLeft: '2vw'}}>
                    <Typist key={props.block+''+props.strIndex} avgTypingDelay={30} startDelay={0} cursor={{show: false}} >{text}</Typist>
                </a>
            </div>;

        return <div>{npcSays}</div>;
    }
}

class Scene extends React.Component {
    constructor(props) {
        super(props);
        this.state = {block:'block00', strIndex:0}; //устанавливаем блок по умлочанию - если сцена
    }

    makeTransition(transition, scene){

        let options = [];

        if (transition == 'end') {

            this.props.changeStates('sceneIsOver', options);

        }if (transition == 'gameOver'){

            this.props.changeStates('gameOver', options);

        } else {

            this.setState({block:transition});

        }

        if (scene.change_states !== undefined){
            if (scene.change_states.length>0) {
                this.props.changeStates('changeGameStates', scene.change_states);
            }
        }
    }

    getNewTxtLine(strIndex, arrInteraction) {
        if (arrInteraction.iteration_text.length == (strIndex+1)){
            if (arrInteraction.transitions[0] !== 'end'){
                this.setState({strIndex:0});
            }
            this.makeTransition(arrInteraction.transitions[0], arrInteraction);
        } else {
            let newIndex = strIndex+1;
            this.setState({strIndex:newIndex});
        }
    }


    render(){
        let arrInteraction = this.props.data.General.action[this.state.block];
        let npcRelations = getNpcRelations(arrInteraction.npc, this.props.data.Npc);


        let Time = parseTimeData(this.props.data.General.dateAndTime.time);

        let skyGradient = 'sky-gradient-'+Time.prefixH+Time.hours;
        let skyOpacity = getSkyOpasity(Time.hours);

        //console.log(arrInteraction);

        const classLayerDefoult = "game_container centered container_layer txt-no-select transparencyAnimation1s";
        const layerClass = classLayerDefoult+" "+arrInteraction.animationBlock;

        return (
            <div id="background">

                <div className={skyGradient+' centered'} style={{opacity:skyOpacity}}></div>

                <div className={layerClass}>

                    <div className="centered container_layer">
                        <img src={arrInteraction.img_background==''?this.props.data.General.location.img:arrInteraction.img_background} className="img_background"/>
                    </div>

                    <ImageNpc scene={arrInteraction} npcRelations = {npcRelations} />

                    <Transitions scene={arrInteraction} data={this.props.data} npcRelations = {npcRelations} makeTransition={(transition, scene) => this.makeTransition(transition, scene)} />;

                    <Text scene={arrInteraction} npcRelations = {npcRelations} block={this.state.block} strIndex={this.state.strIndex} getNewTxtLine={(strIndex) => this.getNewTxtLine(strIndex, arrInteraction)} />

                    <Options scene={arrInteraction} />

                    <NpcOptions scene={arrInteraction} npcRelations = {npcRelations} />

                    {/*<div className="scene-npcOptions-wrap">*/}
                    {/*    <div className="scene-npcOption scene-npcOption-mood">*/}

                    {/*        <p className="npc-options-header">Отношения</p>*/}

                    {/*        <img src={Images.ico.relations} className="npc-options-ico"/>*/}
                    {/*        <div className="npc-options-value">10</div>*/}

                    {/*    </div>*/}

                    {/*</div>*/}

                    {/*<SceneTemplate data={scene} block={this.state.block} makeTransition={(transition, scene) => this.makeTransition(transition, scene)} />*/}

                </div>
            </div>
        )
    }
}

export default Scene;