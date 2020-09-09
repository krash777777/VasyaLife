import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';

import Images from '../db/db_img.jsx';
import templates from '../db/db_templates.jsx';

class Wardrobe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {indexImg:0};
    }

    slide(direction){
        let currentIndex = this.state.indexImg;
        let maxIndex = this.props.data.Player.clothingSet.setImages.length-1;

        if (direction == 'left'){
            currentIndex==0?currentIndex=maxIndex:currentIndex--;
        }if(direction == 'right'){
            currentIndex==maxIndex?currentIndex=0:currentIndex++;
        }
        this.setState({indexImg:currentIndex});
    }

    changeClothes(type, itemOfClothing, index){
        this.props.changeStates('changeClothes', {type:type, itemOfClothing:itemOfClothing, index:index})
    }

    render() {
        const location = this.props.data.General.location;
        const arrItemsOnTheBody = this.props.data.Player.clothingOnTheBody;
        const clothingSet = this.props.data.Player.clothingSet;
        const imgResult = <img className="centered" src={clothingSet.setImages[this.state.indexImg]}/>;


        const listOfClothing = this.props.data.Player.playerStore.clothing.map((itemOfClothing, index)=>
            <div className="itemOfClothing" key={index.toString()} style={{height:itemOfClothing.size.height,width:itemOfClothing.size.width}} onClick={() => this.changeClothes('putOn',itemOfClothing, index)}>
                <img src={itemOfClothing.image}/>
            </div>
        );


        //className="cellForClothes body"

        const itemOnTheBody = this.props.data.Player.clothingOnTheBody.map((itemOfClothing, index)=>
            <div className={itemOfClothing.partOfBody +' cellForClothes'} key={index.toString()}>
                <div className="itemOfClothing" style={{height:itemOfClothing.size.height,width:itemOfClothing.size.width}} onClick={() => this.changeClothes('takeOff',itemOfClothing, index)}>
                    <img src={itemOfClothing.image}/>
                </div>
            </div>
         );

        const listOfClothingSetDiscription= this.props.data.Player.clothingSet.setOptions.map((option, index)=>
            <div className="infoConteiner" key={index.toString()}>
                <img className="styleInfoImg" src={option.img}/>
                <a className="styleInfoText">{option.text}</a>
            </div>
        );

        return (
            <div id="background">
                    <div className="game_container centered container_layer txt-no-select">

                        <div className="tpl-background" style={{opacity:0.7}}>
                            <img src={location.img} className="img_background"/>
                        </div>



                            <div className="centered container_layer">

                                <a className="close" onClick={() => this.props.changeStates('changeTpl', {tpl:templates.location})}>X</a>

                                <div className="storeClothing">

                                    <CSSTransitionGroup
                                        transitionName="fadeLeft"
                                        transitionAppear={true} transitionAppearTimeout={500}
                                        transitionEnter={false} transitionEnterTimeout={500}
                                        transitionLeave={false} transitionLeaveTimeout={500}
                                    >
                                        <div className="centered clothingOnTheStorage">
                                            <div className="tpl-background"><img src={Images.backgrounds.wardrobeCloset}/></div>
                                            <div className="data">{listOfClothing}</div>
                                        </div>
                                    </CSSTransitionGroup>
                                </div>


                                <div className="clothingOnTheBody">
                                    <CSSTransitionGroup
                                        transitionName="transparency"
                                        transitionAppear={true} transitionAppearTimeout={500}
                                        transitionEnter={false} transitionEnterTimeout={500}
                                        transitionLeave={false} transitionLeaveTimeout={500}
                                    >
                                        <div className="bodyFigure">
                                            <img className="bodyFigureImg" src={Images.character.figure}/>
                                            {itemOnTheBody}
                                        </div>

                                        <div className="infoClothingStyle">{listOfClothingSetDiscription}</div>
                                    </CSSTransitionGroup>
                                </div>

                                <div className="styleOfClothingResult">
                                    <CSSTransitionGroup
                                        transitionName="fadeRight"
                                        transitionAppear={true} transitionAppearTimeout={500}
                                        transitionEnter={false} transitionEnterTimeout={500}
                                        transitionLeave={false} transitionLeaveTimeout={500}
                                    >

                                    <div className="centered closingSet">
                                        {imgResult}

                                        <a className="slideButton slideLeft" onClick={() => this.slide('left')}>{'<'}</a>
                                        <a className="slideButton slideRight" onClick={() => this.slide('right')}>{'>'}</a>
                                    </div>
                                    </CSSTransitionGroup>

                                </div>
                            </div>

                    </div>

            </div>
        )
    }
}

export default Wardrobe;