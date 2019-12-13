import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Links from '../api/links';

class PlayerData extends Component {
    render() {
        return (
            <div className="player-data">
                Player Data
            </div>
        );
    }
}

export default withTracker(() => {
    return {
        links: Links.find().fetch(),
    };
})(PlayerData);
