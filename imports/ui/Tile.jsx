import React, { Component } from 'react';
import classnames from 'classnames';
import * as gameData from '../api/gameData.json';

export default class Tile extends Component {
    renderTile() {
        // if (this.props.center) {
        //     return <img src="/images/brick-tile.png" />;
        // }
    }

    render() {
        const tileClassName = classnames({
            tile: true,
            vertex: this.props.vertex,
            center: this.props.center
        });

        let tileType;
        if (Number.isInteger(this.props.tileType)) {
            tileType = gameData.tileNames[this.props.tileType];
        }

        return (
            <div className={tileClassName}>
                {this.props.number} {tileType}
                {/* {this.renderTile()} */}
            </div>
        );
    }
}
