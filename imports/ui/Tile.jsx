import React, { Component } from 'react';
import classnames from 'classnames';

export default class Tile extends Component {
    render() {
        const tileClassName = classnames({
            tile: true,
            vertex: this.props.vertex,
            center: this.props.center
        });
        return (
            <div className={tileClassName}>
                tile
            </div>
        );
    }
}
