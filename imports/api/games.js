import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Games = new Mongo.Collection('games');

export const TILESET = ['brick', 'ore', 'sheep', 'wheat', 'wood', 'desert'];

const tiles = [0,0,0,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5];

Meteor.methods({
    'games.insert'(player2) {
        check(player2, String);

        if (!this.userId) {
            throw new Meteor.Error('not-authorized', 'reason number 1');
        }

        player2 = Meteor.users.findOne({username: player2, _id: {$ne: this.userId}});
        if (!player2) {
            throw new Meteor.Error('invalid-user', 'user doesn\'t exist');
        }

        let board = tiles.slice();
        for (let i = board.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [board[i], board[j]] = [board[j], board[i]];
        }

        let game = {
            player1: {
                id: this.userId,
                resources: [],
                developmentCards: [],
                towns: 5,
                cities: 4,
                roads: 15
            },
            player2: {
                id: player2._id,
                resources: [],
                developmentCards: [],
                towns: 5,
                cities: 4,
                roads: 15
            },
            currentTurn: 1,
            previousRoll: 7,
            board: board, //the order of the tiles will be generated and placed in here
            robber: board.indexOf(6),
            createdOn: new Date(),

        }
        Games.insert(game);
    }
});
