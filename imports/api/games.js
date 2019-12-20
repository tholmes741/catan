import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Games = new Mongo.Collection('games');

// export const TILESET = ['brick', 'ore', 'sheep', 'wheat', 'wood', 'desert'];

const tiles = [1,1,1,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6];

Meteor.methods({
    'games.init'(player2) {
        check(player2, 'String');

        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        player2 = Users.find({username: player2});
        let board = shuffle(tiles);

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



function shuffleArray(a) {
    let x = a.slice()
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
