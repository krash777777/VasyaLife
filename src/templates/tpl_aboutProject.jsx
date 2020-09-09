import React from 'react';
//import ReactDOM from 'react-dom';
import { CSSTransitionGroup } from 'react-transition-group';

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

                    <h1>О проекте</h1>

                </CSSTransitionGroup>
            </div>
        )
    }
}

export default Location;