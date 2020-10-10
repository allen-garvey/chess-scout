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
    t.deepEqual(pgn.pgnToPosition(['e4']), [
        ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR'],
        ['bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', '00', '00', 'wP', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['wP', 'wP', 'wP', 'wP', '00', 'wP', 'wP', 'wP'],
        ['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR'],
    ]);

    t.deepEqual(pgn.pgnToPosition(['d4', 'c5']), [
        ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR'],
        ['bP', 'bP', '00', 'bP', 'bP', 'bP', 'bP', 'bP'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', 'bP', '00', '00', '00', '00', '00'],
        ['00', '00', '00', 'wP', '00', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['wP', 'wP', 'wP', '00', 'wP', 'wP', 'wP', 'wP'],
        ['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR'],
    ]);

    t.deepEqual(pgn.pgnToPosition(['d4', 'd5', 'c4']), [
        ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR'],
        ['bP', 'bP', 'bP', '00', 'bP', 'bP', 'bP', 'bP'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', '00', 'bP', '00', '00', '00', '00'],
        ['00', '00', 'wP', 'wP', '00', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['wP', 'wP', '00', '00', 'wP', 'wP', 'wP', 'wP'],
        ['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR'],
    ]);
});

test('PGN module #pgnToPosition pawn takes correctly', t => {
    t.deepEqual(pgn.pgnToPosition(['d4', 'd5', 'c4', 'dxc4']), [
        ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR'],
        ['bP', 'bP', 'bP', '00', 'bP', 'bP', 'bP', 'bP'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', 'bP', 'wP', '00', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['wP', 'wP', '00', '00', 'wP', 'wP', 'wP', 'wP'],
        ['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR'],
    ]);
    t.deepEqual(pgn.pgnToPosition(['e4', 'd5', 'exd5']), [
        ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR'],
        ['bP', 'bP', 'bP', '00', 'bP', 'bP', 'bP', 'bP'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', '00', 'wP', '00', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['wP', 'wP', 'wP', 'wP', '00', 'wP', 'wP', 'wP'],
        ['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR'],
    ]);
});

test('PGN module #pgnToPosition pawn takes correctly en passant', t => {
    t.deepEqual(pgn.pgnToPosition(['e4', 'a6', 'e5', 'd5', 'exd6']), [
        ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR'],
        ['00', 'bP', 'bP', '00', 'bP', 'bP', 'bP', 'bP'],
        ['bP', '00', '00', 'wP', '00', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['wP', 'wP', 'wP', 'wP', '00', 'wP', 'wP', 'wP'],
        ['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR'],
    ]);

    t.deepEqual(pgn.pgnToPosition(['a3', 'e5', 'h3', 'e4', 'd4', 'exd3']), [
        ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR'],
        ['bP', 'bP', 'bP', 'bP', '00', 'bP', 'bP', 'bP'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['wP', '00', '00', 'bP', '00', '00', '00', 'wP'],
        ['00', 'wP', 'wP', '00', 'wP', 'wP', 'wP', '00'],
        ['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR'],
    ]);
});

test('PGN module #pgnToPosition moves knights correctly', t => {
    t.deepEqual(pgn.pgnToPosition(['Nf3']), [
        ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR'],
        ['bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', '00', '00', '00', 'wN', '00', '00'],
        ['wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP'],
        ['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', '00', 'wR'],
    ]);

    t.deepEqual(pgn.pgnToPosition(['d4', 'Nf6']), [
        ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', '00', 'bR'],
        ['bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP'],
        ['00', '00', '00', '00', '00', 'bN', '00', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', '00', 'wP', '00', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['wP', 'wP', 'wP', '00', 'wP', 'wP', 'wP', 'wP'],
        ['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR'],
    ]);

    t.deepEqual(pgn.pgnToPosition(['e4', 'd6', 'Ne2', 'Nd7']), [
        ['bR', '00', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR'],
        ['bP', 'bP', 'bP', 'bN', 'bP', 'bP', 'bP', 'bP'],
        ['00', '00', '00', 'bP', '00', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', '00', '00', 'wP', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['wP', 'wP', 'wP', 'wP', 'wN', 'wP', 'wP', 'wP'],
        ['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', '00', 'wR'],
    ]);
});

test('PGN module #pgnToPosition knight takes correctly', t => {
    t.deepEqual(pgn.pgnToPosition(['Nf3', 'e5', 'Nxe5']), [
        ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR'],
        ['bP', 'bP', 'bP', 'bP', '00', 'bP', 'bP', 'bP'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', '00', '00', 'wN', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP'],
        ['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', '00', 'wR'],
    ]);
    
    t.deepEqual(pgn.pgnToPosition(['e4', 'Nf6', 'd4', 'Nxe4']), [
        ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', '00', 'bR'],
        ['bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', '00', 'wP', 'bN', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['wP', 'wP', 'wP', '00', '00', 'wP', 'wP', 'wP'],
        ['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR'],
    ]);
});

test('PGN module #pgnToPosition knight moves correctly when knight column is specified', t => {
    t.deepEqual(pgn.pgnToPosition(['e4', 'c6', 'd4', 'd5', 'Nc3', 'dxe4', 'Nxe4', 'Nd7', 'Nf3', 'Ngf6']), [
        ['bR', '00', 'bB', 'bQ', 'bK', 'bB', '00', 'bR'],
        ['bP', 'bP', '00', 'bN', 'bP', 'bP', 'bP', 'bP'],
        ['00', '00', 'bP', '00', '00', 'bN', '00', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', '00', 'wP', 'wN', '00', '00', '00'],
        ['00', '00', '00', '00', '00', 'wN', '00', '00'],
        ['wP', 'wP', 'wP', '00', '00', 'wP', 'wP', 'wP'],
        ['wR', '00', 'wB', 'wQ', 'wK', 'wB', '00', 'wR'],
    ]);
});

test('PGN module #pgnToPosition moves bishops correctly', t => {
    t.deepEqual(pgn.pgnToPosition(['e4', 'e5', 'Bc4']), [
        ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR'],
        ['bP', 'bP', 'bP', 'bP', '00', 'bP', 'bP', 'bP'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', '00', '00', 'bP', '00', '00', '00'],
        ['00', '00', 'wB', '00', 'wP', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['wP', 'wP', 'wP', 'wP', '00', 'wP', 'wP', 'wP'],
        ['wR', 'wN', 'wB', 'wQ', 'wK', '00', 'wN', 'wR'],
    ]);

    t.deepEqual(pgn.pgnToPosition(['d4', 'd5', 'c4', 'Bf5']), [
        ['bR', 'bN', '00', 'bQ', 'bK', 'bB', 'bN', 'bR'],
        ['bP', 'bP', 'bP', '00', 'bP', 'bP', 'bP', 'bP'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', '00', 'bP', '00', 'bB', '00', '00'],
        ['00', '00', 'wP', 'wP', '00', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['wP', 'wP', '00', '00', 'wP', 'wP', 'wP', 'wP'],
        ['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR'],
    ]);
});