import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';


export default class CreateGame extends Component {
    handleSubmit(event) {
        event.preventDefault();
        const player2 = ReactDOM.findDOMNode(this.refs.player2).value.trim();

        Meteor.call('games.insert', player2, (err, res) => {
            if (err) {
                alert(err);
            }
        });
    }

    render() {
        return (
            <div className="create-game">
                Add Players to game
                <form className="new-game" onSubmit={this.handleSubmit.bind(this)} >
                    <input
                        type="text"
                        ref="player2"
                        placeholder="Type to add a player"
                    />
                </form>
            </div>
        );
    }
}
