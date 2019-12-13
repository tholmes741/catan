import React, { Component } from 'react';

import Tile from './Tile.jsx';

export default class Board extends Component {
    //Grid of tiles is 11x17 not including room for water
    state = {
        tiles: [],
    }

    renderSingleRow(rowNumber) {
        const row = [];
        const opperator = rowNumber % 2;
        let vertex;
        let center;
        let key;
        for (let i = 0; i < 11; i++) {
            vertex = i % 2 !== opperator;
            center = vertex && rowNumber % 3 === 2;
            key = (rowNumber * 11) + i;
            row.push(
                <Tile key={key} vertex={vertex} center={center}/>
            )
        }
        return row;
    }

    renderRows() {
        const rows = []
        for (let i = 0; i < 17; i++) {
            rows.push(
                <div className="row" key={i}>
                    {this.renderSingleRow(i)}
                </div>
            )
        }
        return rows;
    }

    render() {
        return (
            <div className="board">
                Here is the board
                {this.renderRows()}
            </div>
        );
    }
}
