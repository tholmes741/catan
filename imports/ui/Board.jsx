import React, { Component } from 'react';

import Tile from './Tile.jsx';

export default class Board extends Component {
    //Grid of tiles is 11x17 not including room for water

    renderRows() {
        const rows = []
        let tileIdx = 0;
        for (let i = 0; i < 17; i++) {
            rows.push(
                <div className="row" key={i}>
                    {renderSingleRow(i, this.props.game.board)}
                </div>
            )
        }

        function renderSingleRow(rowNumber, board) {
            const rules = [2,3,3,3,4,4,4,5,5,5,4,4,4,3,3,3,2];
    
            const row = [];
            const bound = rules[rowNumber];
            const opperator = rowNumber % 2;
            let vertex;
            let center;
            let key;
            let tileType;
            let isBoard;

            for (let i = 0; i < 11; i++) {
                isBoard = i >= 5 - bound && i <= 5 + bound;
                vertex = i % 2 !== opperator && isBoard;
                center = vertex && rowNumber % 3 === 2 && isBoard;
                key = (rowNumber * 11) + i;
                if (vertex && center && isBoard) {
                    tileType = board[tileIdx];
                    tileIdx++;
                } else {
                    tileType = null;
                }
                row.push(
                    <Tile key={key} vertex={vertex} center={center} tileType={tileType} coordinates={[i,rowNumber]}/>
                )
            }
            return row;
        }
        return rows;
    }

    render() {
        return (
            <div className="board">
                {this.renderRows()}
            </div>
        );
    }
}
