import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';

import Images from '../src/db/db_img.jsx';

class HomePage extends React.Component {
    render() {
        return (
            <div id="background">
                <CSSTransitionGroup
                    transitionName="transparency"
                    transitionAppear={true} transitionAppearTimeout={500}
                    transitionEnter={false} transitionEnterTimeout={500}
                    transitionLeave={false}
                >
                    <div className="game_container centered container_layer">
                        <div className="centered container_layer">
                            <img src={Images.backgrounds.homePage} className="img_background"/>
                        </div>
                        <div className="centered container_layer">
                            <div><a className="game_name txt-no-select">Жизнь и приключения Васи</a></div>
                            <div className="main_menu">
                                <a className="button txt-no-select" onClick={() => this.props.homePageMenuCommands('newGame')}>НОВАЯ ИГРА</a>
                                <a className="button txt-no-select" onClick={() => this.props.homePageMenuCommands('continue')}>ПРОДОЛЖИТЬ</a>
                                <a className="button txt-no-select" onClick={() => this.props.homePageMenuCommands('aboutProject')}>О ПРОЕКТЕ</a>
                            </div>
                        </div>
                    </div>
                </CSSTransitionGroup>
            </div>
        )
    }
}

export default HomePage;