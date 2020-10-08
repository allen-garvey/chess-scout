import pgn from '../../src/chess-board/pgn';
const test = require('ava');

test('PGN module #pgnToPosition returns starting position with no moves', t => {
    t.deepEqual(pgn.pgnToPosition([]), [
        ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR'],
        ['bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP'],
        ['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR'],
    ]);
});

test('PGN module #pgnToPosition moves pawns correctly', t => {
    t.deepEqual(pgn.pgnToPosition(['E4']), [
        ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR'],
        ['bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', '00', '00', 'wP', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['wP', 'wP', 'wP', 'wP', '00', 'wP', 'wP', 'wP'],
        ['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR'],
    ]);

    t.deepEqual(pgn.pgnToPosition(['D4', 'C5']), [
        ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR'],
        ['bP', 'bP', '00', 'bP', 'bP', 'bP', 'bP', 'bP'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', 'bP', '00', '00', '00', '00', '00'],
        ['00', '00', '00', 'wP', '00', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['wP', 'wP', 'wP', '00', 'wP', 'wP', 'wP', 'wP'],
        ['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR'],
    ]);
});