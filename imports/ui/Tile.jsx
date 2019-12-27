import React, { Component } from 'react';
import classnames from 'classnames';

const TILESET = [null, 'brick', 'ore', 'sheep', 'wheat', 'wood', 'desert'];

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
            tileType = TILESET[this.props.tileType];
        }

        return (
            <div className={tileClassName}>
                {tileType}
                {/* {this.renderTile()} */}
            </div>
        );
    }
}
