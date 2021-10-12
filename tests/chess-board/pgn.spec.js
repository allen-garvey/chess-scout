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

test('PGN module #pgnToPosition moves kings correctly', t => {
    t.deepEqual(pgn.pgnToPosition(['e4', 'e5', 'Ke2']), [
        ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR'],
        ['bP', 'bP', 'bP', 'bP', '00', 'bP', 'bP', 'bP'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', '00', '00', 'bP', '00', '00', '00'],
        ['00', '00', '00', '00', 'wP', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['wP', 'wP', 'wP', 'wP', 'wK', 'wP', 'wP', 'wP'],
        ['wR', 'wN', 'wB', 'wQ', '00', 'wB', 'wN', 'wR'],
    ]);

    t.deepEqual(pgn.pgnToPosition(['e4', 'e5', 'Ke2', 'Ke7']), [
        ['bR', 'bN', 'bB', 'bQ', '00', 'bB', 'bN', 'bR'],
        ['bP', 'bP', 'bP', 'bP', 'bK', 'bP', 'bP', 'bP'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', '00', '00', 'bP', '00', '00', '00'],
        ['00', '00', '00', '00', 'wP', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['wP', 'wP', 'wP', 'wP', 'wK', 'wP', 'wP', 'wP'],
        ['wR', 'wN', 'wB', 'wQ', '00', 'wB', 'wN', 'wR'],
    ]);
});

test('PGN module #pgnToPosition moves queens correctly', t => {
    t.deepEqual(pgn.pgnToPosition(['e4', 'e5', 'Qf3']), [
        ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR'],
        ['bP', 'bP', 'bP', 'bP', '00', 'bP', 'bP', 'bP'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', '00', '00', 'bP', '00', '00', '00'],
        ['00', '00', '00', '00', 'wP', '00', '00', '00'],
        ['00', '00', '00', '00', '00', 'wQ', '00', '00'],
        ['wP', 'wP', 'wP', 'wP', '00', 'wP', 'wP', 'wP'],
        ['wR', 'wN', 'wB', '00', 'wK', 'wB', 'wN', 'wR'],
    ]);

    t.deepEqual(pgn.pgnToPosition(['e4', 'd5', 'exd5', 'Qxd5']), [
        ['bR', 'bN', 'bB', '00', 'bK', 'bB', 'bN', 'bR'],
        ['bP', 'bP', 'bP', '00', 'bP', 'bP', 'bP', 'bP'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', '00', 'bQ', '00', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['wP', 'wP', 'wP', 'wP', '00', 'wP', 'wP', 'wP'],
        ['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR'],
    ]);
});

test('PGN module #pgnToPosition returns correct position when there are checks', t => {
    t.deepEqual(pgn.pgnToPosition(['d4', 'Nf6', 'c4', 'e6', 'Nf3', 'Bb4+']), [
        ['bR', 'bN', 'bB', 'bQ', 'bK', '00', '00', 'bR'],
        ['bP', 'bP', 'bP', 'bP', '00', 'bP', 'bP', 'bP'],
        ['00', '00', '00', '00', 'bP', 'bN', '00', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', 'bB', 'wP', 'wP', '00', '00', '00', '00'],
        ['00', '00', '00', '00', '00', 'wN', '00', '00'],
        ['wP', 'wP', '00', '00', 'wP', 'wP', 'wP', 'wP'],
        ['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', '00', 'wR'],
    ]);
});

test('PGN module #pgnToPosition returns correct position when there is checkmate', t => {
    t.deepEqual(pgn.pgnToPosition(['g4',  'e5',  'f3',  'Qh4']), [
        ['bR', 'bN', 'bB', '00', 'bK', 'bB', 'bN', 'bR'],
        ['bP', 'bP', 'bP', 'bP', '00', 'bP', 'bP', 'bP'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', '00', '00', 'bP', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', 'wP', 'bQ'],
        ['00', '00', '00', '00', '00', 'wP', '00', '00'],
        ['wP', 'wP', 'wP', 'wP', 'wP', '00', '00', 'wP'],
        ['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR'],
    ]);
});

test('PGN module #pgnToPosition short castles correctly', t => {
    t.deepEqual(pgn.pgnToPosition(['Nf3', 'd5', 'g3', 'c5', 'Bg2', 'Nc6', 'O-O']), [
        ['bR', '00', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR'],
        ['bP', 'bP', '00', '00', 'bP', 'bP', 'bP', 'bP'],
        ['00', '00', 'bN', '00', '00', '00', '00', '00'],
        ['00', '00', 'bP', 'bP', '00', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', '00', '00', '00', 'wN', 'wP', '00'],
        ['wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wB', 'wP'],
        ['wR', 'wN', 'wB', 'wQ', '00', 'wR', 'wK', '00'],
    ]);

    t.deepEqual(pgn.pgnToPosition(['d4', 'Nf6', 'c4', 'e6', 'Nc3', 'Bb4', 'Qc2', 'O-O']), [
        ['bR', 'bN', 'bB', 'bQ', '00', 'bR', 'bK', '00'],
        ['bP', 'bP', 'bP', 'bP', '00', 'bP', 'bP', 'bP'],
        ['00', '00', '00', '00', 'bP', 'bN', '00', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', 'bB', 'wP', 'wP', '00', '00', '00', '00'],
        ['00', '00', 'wN', '00', '00', '00', '00', '00'],
        ['wP', 'wP', 'wQ', '00', 'wP', 'wP', 'wP', 'wP'],
        ['wR', '00', 'wB', '00', 'wK', 'wB', 'wN', 'wR'],
    ]);
});

test('PGN module #pgnToPosition long castles correctly', t => {
    t.deepEqual(pgn.pgnToPosition(['d4', 'd5', 'Bf4', 'Nc6', 'Nc3', 'Nf6', 'Qd2', 'Bf5', 'O-O-O']), [
        ['bR', '00', '00', 'bQ', 'bK', 'bB', '00', 'bR'],
        ['bP', 'bP', 'bP', '00', 'bP', 'bP', 'bP', 'bP'],
        ['00', '00', 'bN', '00', '00', 'bN', '00', '00'],
        ['00', '00', '00', 'bP', '00', 'bB', '00', '00'],
        ['00', '00', '00', 'wP', '00', 'wB', '00', '00'],
        ['00', '00', 'wN', '00', '00', '00', '00', '00'],
        ['wP', 'wP', 'wP', 'wQ', 'wP', 'wP', 'wP', 'wP'],
        ['00', '00', 'wK', 'wR', '00', 'wB', 'wN', 'wR'],
    ]);

    t.deepEqual(pgn.pgnToPosition(['d4', 'd5', 'Nf3', 'Bf5', 'e3', 'Qd7', 'Nc3', 'Nc6', 'Be2', 'O-O-O']), [
        ['00', '00', 'bK', 'bR', '00', 'bB', 'bN', 'bR'],
        ['bP', 'bP', 'bP', 'bQ', 'bP', 'bP', 'bP', 'bP'],
        ['00', '00', 'bN', '00', '00', '00', '00', '00'],
        ['00', '00', '00', 'bP', '00', 'bB', '00', '00'],
        ['00', '00', '00', 'wP', '00', '00', '00', '00'],
        ['00', '00', 'wN', '00', 'wP', 'wN', '00', '00'],
        ['wP', 'wP', 'wP', '00', 'wB', 'wP', 'wP', 'wP'],
        ['wR', '00', 'wB', 'wQ', 'wK', '00', '00', 'wR'],
    ]);
});

test('PGN module #pgnToPosition moves rooks correctly', t => {
    t.deepEqual(pgn.pgnToPosition(['Nf3', 'Nf6', 'Rg1', 'Rg8']), [
        ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bR', '00'],
        ['bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP'],
        ['00', '00', '00', '00', '00', 'bN', '00', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', '00', '00', '00', 'wN', '00', '00'],
        ['wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP'],
        ['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wR', '00'],
    ]);
});

test('PGN module #pgnToPosition moves rooks when column is specified', t => {
    t.deepEqual(pgn.pgnToPosition(['e4', 'e6', 'd4', 'd6', 'Bc4', 'f6', 'Nf3', 'g6', 'Nc3', 'c6', 'Be3', 'b6', 'Qd2', 'h6', 'Ke2', 'a6', 'Rhb1']), [
        ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', 'wB', 'wP', 'wP', '00', '00', '00'],
        ['00', '00', 'wN', '00', 'wB', 'wN', '00', '00'],
        ['wP', 'wP', 'wP', 'wQ', 'wK', 'wP', 'wP', 'wP'],
        ['wR', 'wR', '00', '00', '00', '00', '00', '00'],
    ]);
});

test('PGN module #pgnToPosition moves rooks when row is specified', t => {
    t.deepEqual(pgn.pgnToPosition(['h4', 'e6', 'Nf3', 'f6', 'e4', 'd6', 'Be2', 'g6', 'd4', 'c6', 'Be3', 'b6', 'Qd3', 'a6', 'Nc3', 'h6', 'Kd2', 'Ra7', 'Rh3', 'Rhh7', 'Rah1', 'Ne7', 'R1h2']), [
        ['00', 'bN', 'bB', 'bQ', 'bK', 'bB', '00', '00'],
        ['bR', '00', '00', '00', 'bN', '00', '00', 'bR'],
        ['bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', '00', 'wP', 'wP', '00', '00', 'wP'],
        ['00', '00', 'wN', 'wQ', 'wB', 'wN', '00', 'wR'],
        ['wP', 'wP', 'wP', 'wK', 'wB', 'wP', 'wP', 'wR'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
    ]);
});

test('PGN module #pgnToPosition pawn promotes to Queen', t => {
    t.deepEqual(pgn.pgnToPosition(['h4', 'h5', 'g4', 'hxg4', 'h5', 'd5', 'h6', 'Nf6', 'h7', 'Rg8', 'h8=Q']), [
        ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bR', 'wQ'],
        ['bP', 'bP', 'bP', '00', 'bP', 'bP', 'bP', '00'],
        ['00', '00', '00', '00', '00', 'bN', '00', '00'],
        ['00', '00', '00', 'bP', '00', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', 'bP', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['wP', 'wP', 'wP', 'wP', 'wP', 'wP', '00', '00'],
        ['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR'],
    ]);

    t.deepEqual(pgn.pgnToPosition(['h4', 'h5', 'Nf3', 'g5', 'hxg5', 'h4', 'g3', 'h3', 'Rg1', 'h2', 'Bg2', 'h1=Q']), [
        ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR'],
        ['bP', 'bP', 'bP', 'bP', 'bP', 'bP', '00', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', 'wP', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', '00', '00', '00', 'wN', 'wP', '00'],
        ['wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wB', '00'],
        ['wR', 'wN', 'wB', 'wQ', 'wK', '00', 'wR', 'bQ'],
    ]);
});

test('PGN module #pgnToPosition pawn promotes to Queen by capture', t => {
    t.deepEqual(pgn.pgnToPosition(['h4', 'h5', 'g4', 'hxg4', 'h5', 'd5', 'h6', 'Nf6', 'h7', 'Rg8', 'hxg8=Q']), [
        ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'wQ', '00'],
        ['bP', 'bP', 'bP', '00', 'bP', 'bP', 'bP', '00'],
        ['00', '00', '00', '00', '00', 'bN', '00', '00'],
        ['00', '00', '00', 'bP', '00', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', 'bP', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['wP', 'wP', 'wP', 'wP', 'wP', 'wP', '00', '00'],
        ['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR'],
    ]);
});

test('PGN module #pgnToPosition pawn promotes to Knight', t => {
    t.deepEqual(pgn.pgnToPosition(['h4', 'h5', 'g4', 'hxg4', 'h5', 'd5', 'h6', 'Nf6', 'h7', 'Rg8', 'h8=N']), [
        ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bR', 'wN'],
        ['bP', 'bP', 'bP', '00', 'bP', 'bP', 'bP', '00'],
        ['00', '00', '00', '00', '00', 'bN', '00', '00'],
        ['00', '00', '00', 'bP', '00', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', 'bP', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['wP', 'wP', 'wP', 'wP', 'wP', 'wP', '00', '00'],
        ['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR'],
    ]);
});

test('PGN module #pgnToPosition pawn promotes to Knight by capture', t => {
    t.deepEqual(pgn.pgnToPosition(['h4', 'h5', 'g4', 'hxg4', 'h5', 'd5', 'h6', 'Nf6', 'h7', 'Rg8', 'hxg8=N']), [
        ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'wN', '00'],
        ['bP', 'bP', 'bP', '00', 'bP', 'bP', 'bP', '00'],
        ['00', '00', '00', '00', '00', 'bN', '00', '00'],
        ['00', '00', '00', 'bP', '00', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', 'bP', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['wP', 'wP', 'wP', 'wP', 'wP', 'wP', '00', '00'],
        ['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR'],
    ]);
});

test('PGN module #pgnToPosition pawn promotes to Bishop', t => {
    t.deepEqual(pgn.pgnToPosition(['h4', 'h5', 'g4', 'hxg4', 'h5', 'd5', 'h6', 'Nf6', 'h7', 'Rg8', 'h8=B']), [
        ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bR', 'wB'],
        ['bP', 'bP', 'bP', '00', 'bP', 'bP', 'bP', '00'],
        ['00', '00', '00', '00', '00', 'bN', '00', '00'],
        ['00', '00', '00', 'bP', '00', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', 'bP', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['wP', 'wP', 'wP', 'wP', 'wP', 'wP', '00', '00'],
        ['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR'],
    ]);
});

test('PGN module #pgnToPosition pawn promotes to Bishop by capture', t => {
    t.deepEqual(pgn.pgnToPosition(['h4', 'h5', 'g4', 'hxg4', 'h5', 'd5', 'h6', 'Nf6', 'h7', 'Rg8', 'hxg8=B']), [
        ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'wB', '00'],
        ['bP', 'bP', 'bP', '00', 'bP', 'bP', 'bP', '00'],
        ['00', '00', '00', '00', '00', 'bN', '00', '00'],
        ['00', '00', '00', 'bP', '00', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', 'bP', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['wP', 'wP', 'wP', 'wP', 'wP', 'wP', '00', '00'],
        ['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR'],
    ]);
});

test('PGN module #pgnToPosition pawn promotes to Rook', t => {
    t.deepEqual(pgn.pgnToPosition(['h4', 'h5', 'g4', 'hxg4', 'h5', 'd5', 'h6', 'Nf6', 'h7', 'Rg8', 'h8=R']), [
        ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bR', 'wR'],
        ['bP', 'bP', 'bP', '00', 'bP', 'bP', 'bP', '00'],
        ['00', '00', '00', '00', '00', 'bN', '00', '00'],
        ['00', '00', '00', 'bP', '00', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', 'bP', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['wP', 'wP', 'wP', 'wP', 'wP', 'wP', '00', '00'],
        ['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR'],
    ]);
});

test('PGN module #pgnToPosition pawn promotes to Rook by capture', t => {
    t.deepEqual(pgn.pgnToPosition(['h4', 'h5', 'g4', 'hxg4', 'h5', 'd5', 'h6', 'Nf6', 'h7', 'Rg8', 'hxg8=R']), [
        ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'wR', '00'],
        ['bP', 'bP', 'bP', '00', 'bP', 'bP', 'bP', '00'],
        ['00', '00', '00', '00', '00', 'bN', '00', '00'],
        ['00', '00', '00', 'bP', '00', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', 'bP', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['wP', 'wP', 'wP', 'wP', 'wP', 'wP', '00', '00'],
        ['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR'],
    ]);
});

test('PGN module #pgnToPosition multiple Queens unambiguous move', t => {
    t.deepEqual(pgn.pgnToPosition(['e4','d5','Nc3','Nf6','e5','d4','exf6','dxc3','fxg7','cxb2','gxh8=Q','bxa1=Q','Qxa1']), [
        ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', '00', '00'],
        ['bP', 'bP', 'bP', '00', 'bP', 'bP', '00', 'bP'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['wP', '00', 'wP', 'wP', '00', 'wP', 'wP', 'wP'],
        ['wQ', '00', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR'],
    ]);
});

test('PGN module #pgnToPosition multiple Queens with specified column', t => {
    t.deepEqual(pgn.pgnToPosition(['e4','d5','Nc3','d4','f4','dxc3','Nf3','cxb2','Be2','bxa1=Q','O-O','Qxa2','Qe1','Qxc2','d4','Qxd4+','Kh1','Qcd2','Ba3']), [
        ['bR', 'bN', 'bB', '00', 'bK', 'bB', 'bN', 'bR'],
        ['bP', 'bP', 'bP', '00', 'bP', 'bP', 'bP', 'bP'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', '00', 'bQ', 'wP', 'wP', '00', '00'],
        ['wB', '00', '00', '00', '00', 'wN', '00', '00'],
        ['00', '00', '00', 'bQ', 'wB', '00', 'wP', 'wP'],
        ['00', '00', '00', '00', 'wQ', 'wR', '00', 'wK'],
    ]);
});

test('PGN module #pgnToPosition multiple Queens with specified row', t => {
    t.deepEqual(pgn.pgnToPosition(['e4','d5','Nc3','d4','f4','dxc3','Nf3','cxb2','Be2','bxa1=Q','O-O','Qxa2','Qe1','Qxc2','d4','Qxd4+','Kh1','Qcd2','Ba3','Q4b2','Rg1','Qdb4','Qf1','Q2c3']), [
        ['bR', 'bN', 'bB', '00', 'bK', 'bB', 'bN', 'bR'],
        ['bP', 'bP', 'bP', '00', 'bP', 'bP', 'bP', 'bP'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', 'bQ', '00', '00', 'wP', 'wP', '00', '00'],
        ['wB', '00', 'bQ', '00', '00', 'wN', '00', '00'],
        ['00', '00', '00', '00', 'wB', '00', 'wP', 'wP'],
        ['00', '00', '00', '00', '00', 'wQ', 'wR', 'wK'],
    ]);
});

test('PGN module #pgnToPosition multiple Queens vertical battery move', t => {
    t.deepEqual(pgn.pgnToPosition(['e4','d5','Nc3','d4','f4','dxc3','Nf3','cxb2','Be2','bxa1=Q','O-O','Qxa2','Qe1','Qxc2','d4','Qxd4+','Kh1','Qcd2','Ba3','Qd1']), [
        ['bR', 'bN', 'bB', '00', 'bK', 'bB', 'bN', 'bR'],
        ['bP', 'bP', 'bP', '00', 'bP', 'bP', 'bP', 'bP'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', '00', 'bQ', 'wP', 'wP', '00', '00'],
        ['wB', '00', '00', '00', '00', 'wN', '00', '00'],
        ['00', '00', '00', '00', 'wB', '00', 'wP', 'wP'],
        ['00', '00', '00', 'bQ', 'wQ', 'wR', '00', 'wK'],
    ]);
});

test('PGN module #pgnToPosition multiple Queens horizontal battery move', t => {
    t.deepEqual(pgn.pgnToPosition(['e4','d5','Nc3','d4','f4','dxc3','Nf3','cxb2','Be2','bxa1=Q','O-O','Qxa2','Qe1','Qxc2','d4','Qxd4+','Kh1','Qcd2','Ba3','Q4b2','Rg1','Qxe2']), [
        ['bR', 'bN', 'bB', '00', 'bK', 'bB', 'bN', 'bR'],
        ['bP', 'bP', 'bP', '00', 'bP', 'bP', 'bP', 'bP'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', '00', '00', 'wP', 'wP', '00', '00'],
        ['wB', '00', '00', '00', '00', 'wN', '00', '00'],
        ['00', 'bQ', '00', '00', 'bQ', '00', 'wP', 'wP'],
        ['00', '00', '00', '00', 'wQ', '00', 'wR', 'wK'],
    ]);
});

test('PGN module #pgnToPosition multiple Queens diagonal battery move', t => {
    t.deepEqual(pgn.pgnToPosition(['e4','d5','Nc3','d4','f4','dxc3','Nf3','cxb2','Be2','bxa1=Q','O-O','Qxa2','Qe1','Qxc2','d4','Qxd4+','Kh1','Qcd2','Ba3','Q4b2','Rg1','Qbc3','h3','Qa5']), [
        ['bR', 'bN', 'bB', '00', 'bK', 'bB', 'bN', 'bR'],
        ['bP', 'bP', 'bP', '00', 'bP', 'bP', 'bP', 'bP'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['bQ', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', '00', '00', 'wP', 'wP', '00', '00'],
        ['wB', '00', '00', '00', '00', 'wN', '00', 'wP'],
        ['00', '00', '00', 'bQ', 'wB', '00', 'wP', '00'],
        ['00', '00', '00', '00', 'wQ', '00', 'wR', 'wK'],
    ]);
});
