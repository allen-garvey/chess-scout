import pgn from '../../src/chess-board/pgn';

describe('#pgnToPosition board setup', () => {
    test('Returns starting position with no moves', () => {
        expect(pgn.pgnToPosition([])).toEqual([
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
});

describe('#pgnToPosition pawn moves', () => {
    test('Moves pawns correctly', () => {
        expect(pgn.pgnToPosition(['e4'])).toEqual([
            ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR'],
            ['bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP'],
            ['00', '00', '00', '00', '00', '00', '00', '00'],
            ['00', '00', '00', '00', '00', '00', '00', '00'],
            ['00', '00', '00', '00', 'wP', '00', '00', '00'],
            ['00', '00', '00', '00', '00', '00', '00', '00'],
            ['wP', 'wP', 'wP', 'wP', '00', 'wP', 'wP', 'wP'],
            ['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR'],
        ]);
    
        expect(pgn.pgnToPosition(['d4', 'c5'])).toEqual([
            ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR'],
            ['bP', 'bP', '00', 'bP', 'bP', 'bP', 'bP', 'bP'],
            ['00', '00', '00', '00', '00', '00', '00', '00'],
            ['00', '00', 'bP', '00', '00', '00', '00', '00'],
            ['00', '00', '00', 'wP', '00', '00', '00', '00'],
            ['00', '00', '00', '00', '00', '00', '00', '00'],
            ['wP', 'wP', 'wP', '00', 'wP', 'wP', 'wP', 'wP'],
            ['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR'],
        ]);
    
        expect(pgn.pgnToPosition(['d4', 'd5', 'c4'])).toEqual([
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
    
    test('pawn takes correctly', () => {
        expect(pgn.pgnToPosition(['d4', 'd5', 'c4', 'dxc4'])).toEqual([
            ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR'],
            ['bP', 'bP', 'bP', '00', 'bP', 'bP', 'bP', 'bP'],
            ['00', '00', '00', '00', '00', '00', '00', '00'],
            ['00', '00', '00', '00', '00', '00', '00', '00'],
            ['00', '00', 'bP', 'wP', '00', '00', '00', '00'],
            ['00', '00', '00', '00', '00', '00', '00', '00'],
            ['wP', 'wP', '00', '00', 'wP', 'wP', 'wP', 'wP'],
            ['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR'],
        ]);
        expect(pgn.pgnToPosition(['e4', 'd5', 'exd5'])).toEqual([
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
    
    test('pawn takes correctly en passant', () => {
        expect(pgn.pgnToPosition(['e4', 'a6', 'e5', 'd5', 'exd6'])).toEqual([
            ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR'],
            ['00', 'bP', 'bP', '00', 'bP', 'bP', 'bP', 'bP'],
            ['bP', '00', '00', 'wP', '00', '00', '00', '00'],
            ['00', '00', '00', '00', '00', '00', '00', '00'],
            ['00', '00', '00', '00', '00', '00', '00', '00'],
            ['00', '00', '00', '00', '00', '00', '00', '00'],
            ['wP', 'wP', 'wP', 'wP', '00', 'wP', 'wP', 'wP'],
            ['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR'],
        ]);
    
        expect(pgn.pgnToPosition(['a3', 'e5', 'h3', 'e4', 'd4', 'exd3'])).toEqual([
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
});

describe('#pgnToPosition Knight moves', () => {
    test('moves knights correctly', () => {
        expect(pgn.pgnToPosition(['Nf3'])).toEqual([
            ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR'],
            ['bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP'],
            ['00', '00', '00', '00', '00', '00', '00', '00'],
            ['00', '00', '00', '00', '00', '00', '00', '00'],
            ['00', '00', '00', '00', '00', '00', '00', '00'],
            ['00', '00', '00', '00', '00', 'wN', '00', '00'],
            ['wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP'],
            ['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', '00', 'wR'],
        ]);
    
        expect(pgn.pgnToPosition(['d4', 'Nf6'])).toEqual([
            ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', '00', 'bR'],
            ['bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP'],
            ['00', '00', '00', '00', '00', 'bN', '00', '00'],
            ['00', '00', '00', '00', '00', '00', '00', '00'],
            ['00', '00', '00', 'wP', '00', '00', '00', '00'],
            ['00', '00', '00', '00', '00', '00', '00', '00'],
            ['wP', 'wP', 'wP', '00', 'wP', 'wP', 'wP', 'wP'],
            ['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR'],
        ]);
    
        expect(pgn.pgnToPosition(['e4', 'd6', 'Ne2', 'Nd7'])).toEqual([
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
    
    test('knight takes correctly', () => {
        expect(pgn.pgnToPosition(['Nf3', 'e5', 'Nxe5'])).toEqual([
            ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR'],
            ['bP', 'bP', 'bP', 'bP', '00', 'bP', 'bP', 'bP'],
            ['00', '00', '00', '00', '00', '00', '00', '00'],
            ['00', '00', '00', '00', 'wN', '00', '00', '00'],
            ['00', '00', '00', '00', '00', '00', '00', '00'],
            ['00', '00', '00', '00', '00', '00', '00', '00'],
            ['wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP'],
            ['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', '00', 'wR'],
        ]);
        
        expect(pgn.pgnToPosition(['e4', 'Nf6', 'd4', 'Nxe4'])).toEqual([
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
    
    test('knight moves correctly when knight column is specified', () => {
        expect(pgn.pgnToPosition(['e4', 'c6', 'd4', 'd5', 'Nc3', 'dxe4', 'Nxe4', 'Nd7', 'Nf3', 'Ngf6'])).toEqual([
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
});

describe('#pgnToPosition Bishop moves', () => {
    test('moves bishops correctly', () => {
        expect(pgn.pgnToPosition(['e4', 'e5', 'Bc4'])).toEqual([
            ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR'],
            ['bP', 'bP', 'bP', 'bP', '00', 'bP', 'bP', 'bP'],
            ['00', '00', '00', '00', '00', '00', '00', '00'],
            ['00', '00', '00', '00', 'bP', '00', '00', '00'],
            ['00', '00', 'wB', '00', 'wP', '00', '00', '00'],
            ['00', '00', '00', '00', '00', '00', '00', '00'],
            ['wP', 'wP', 'wP', 'wP', '00', 'wP', 'wP', 'wP'],
            ['wR', 'wN', 'wB', 'wQ', 'wK', '00', 'wN', 'wR'],
        ]);
    
        expect(pgn.pgnToPosition(['d4', 'd5', 'c4', 'Bf5'])).toEqual([
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
});

describe('#pgnToPosition King moves', () => {
    test('moves kings correctly', () => {
        expect(pgn.pgnToPosition(['e4', 'e5', 'Ke2'])).toEqual([
            ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR'],
            ['bP', 'bP', 'bP', 'bP', '00', 'bP', 'bP', 'bP'],
            ['00', '00', '00', '00', '00', '00', '00', '00'],
            ['00', '00', '00', '00', 'bP', '00', '00', '00'],
            ['00', '00', '00', '00', 'wP', '00', '00', '00'],
            ['00', '00', '00', '00', '00', '00', '00', '00'],
            ['wP', 'wP', 'wP', 'wP', 'wK', 'wP', 'wP', 'wP'],
            ['wR', 'wN', 'wB', 'wQ', '00', 'wB', 'wN', 'wR'],
        ]);
    
        expect(pgn.pgnToPosition(['e4', 'e5', 'Ke2', 'Ke7'])).toEqual([
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
});

describe('#pgnToPosition Queen moves', () => {
    test('moves queens correctly', () => {
        expect(pgn.pgnToPosition(['e4', 'e5', 'Qf3'])).toEqual([
            ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR'],
            ['bP', 'bP', 'bP', 'bP', '00', 'bP', 'bP', 'bP'],
            ['00', '00', '00', '00', '00', '00', '00', '00'],
            ['00', '00', '00', '00', 'bP', '00', '00', '00'],
            ['00', '00', '00', '00', 'wP', '00', '00', '00'],
            ['00', '00', '00', '00', '00', 'wQ', '00', '00'],
            ['wP', 'wP', 'wP', 'wP', '00', 'wP', 'wP', 'wP'],
            ['wR', 'wN', 'wB', '00', 'wK', 'wB', 'wN', 'wR'],
        ]);
    
        expect(pgn.pgnToPosition(['e4', 'd5', 'exd5', 'Qxd5'])).toEqual([
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
});

describe('#pgnToPosition checks and checkmates', () => {
    test('returns correct position when there are checks', () => {
        expect(pgn.pgnToPosition(['d4', 'Nf6', 'c4', 'e6', 'Nf3', 'Bb4+'])).toEqual([
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
    
    test('returns correct position when there is checkmate', () => {
        expect(pgn.pgnToPosition(['g4',  'e5',  'f3',  'Qh4'])).toEqual([
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
});

describe('#pgnToPosition castles', () => {
    test('short castles correctly', () => {
        expect(pgn.pgnToPosition(['Nf3', 'd5', 'g3', 'c5', 'Bg2', 'Nc6', 'O-O'])).toEqual([
            ['bR', '00', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR'],
            ['bP', 'bP', '00', '00', 'bP', 'bP', 'bP', 'bP'],
            ['00', '00', 'bN', '00', '00', '00', '00', '00'],
            ['00', '00', 'bP', 'bP', '00', '00', '00', '00'],
            ['00', '00', '00', '00', '00', '00', '00', '00'],
            ['00', '00', '00', '00', '00', 'wN', 'wP', '00'],
            ['wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wB', 'wP'],
            ['wR', 'wN', 'wB', 'wQ', '00', 'wR', 'wK', '00'],
        ]);
    
        expect(pgn.pgnToPosition(['d4', 'Nf6', 'c4', 'e6', 'Nc3', 'Bb4', 'Qc2', 'O-O'])).toEqual([
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
    
    test('long castles correctly', () => {
        expect(pgn.pgnToPosition(['d4', 'd5', 'Bf4', 'Nc6', 'Nc3', 'Nf6', 'Qd2', 'Bf5', 'O-O-O'])).toEqual([
            ['bR', '00', '00', 'bQ', 'bK', 'bB', '00', 'bR'],
            ['bP', 'bP', 'bP', '00', 'bP', 'bP', 'bP', 'bP'],
            ['00', '00', 'bN', '00', '00', 'bN', '00', '00'],
            ['00', '00', '00', 'bP', '00', 'bB', '00', '00'],
            ['00', '00', '00', 'wP', '00', 'wB', '00', '00'],
            ['00', '00', 'wN', '00', '00', '00', '00', '00'],
            ['wP', 'wP', 'wP', 'wQ', 'wP', 'wP', 'wP', 'wP'],
            ['00', '00', 'wK', 'wR', '00', 'wB', 'wN', 'wR'],
        ]);
    
        expect(pgn.pgnToPosition(['d4', 'd5', 'Nf3', 'Bf5', 'e3', 'Qd7', 'Nc3', 'Nc6', 'Be2', 'O-O-O'])).toEqual([
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
});

describe('#pgnToPosition Rook moves', () => {
    test('moves rooks correctly', () => {
        expect(pgn.pgnToPosition(['Nf3', 'Nf6', 'Rg1', 'Rg8'])).toEqual([
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
    
    test('moves rooks when column is specified', () => {
        expect(pgn.pgnToPosition(['e4', 'e6', 'd4', 'd6', 'Bc4', 'f6', 'Nf3', 'g6', 'Nc3', 'c6', 'Be3', 'b6', 'Qd2', 'h6', 'Ke2', 'a6', 'Rhb1'])).toEqual([
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
    
    test('moves rooks when row is specified', () => {
        expect(pgn.pgnToPosition(['h4', 'e6', 'Nf3', 'f6', 'e4', 'd6', 'Be2', 'g6', 'd4', 'c6', 'Be3', 'b6', 'Qd3', 'a6', 'Nc3', 'h6', 'Kd2', 'Ra7', 'Rh3', 'Rhh7', 'Rah1', 'Ne7', 'R1h2'])).toEqual([
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
});

describe('#pgnToPosition pawn promotion', () => {
    test('pawn promotes to Queen', () => {
        expect(pgn.pgnToPosition(['h4', 'h5', 'g4', 'hxg4', 'h5', 'd5', 'h6', 'Nf6', 'h7', 'Rg8', 'h8=Q'])).toEqual([
            ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bR', 'wQ'],
            ['bP', 'bP', 'bP', '00', 'bP', 'bP', 'bP', '00'],
            ['00', '00', '00', '00', '00', 'bN', '00', '00'],
            ['00', '00', '00', 'bP', '00', '00', '00', '00'],
            ['00', '00', '00', '00', '00', '00', 'bP', '00'],
            ['00', '00', '00', '00', '00', '00', '00', '00'],
            ['wP', 'wP', 'wP', 'wP', 'wP', 'wP', '00', '00'],
            ['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR'],
        ]);
    
        expect(pgn.pgnToPosition(['h4', 'h5', 'Nf3', 'g5', 'hxg5', 'h4', 'g3', 'h3', 'Rg1', 'h2', 'Bg2', 'h1=Q'])).toEqual([
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
    
    test('pawn promotes to Queen by capture', () => {
        expect(pgn.pgnToPosition(['h4', 'h5', 'g4', 'hxg4', 'h5', 'd5', 'h6', 'Nf6', 'h7', 'Rg8', 'hxg8=Q'])).toEqual( [
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
    
    test('pawn promotes to Knight', () => {
        expect(pgn.pgnToPosition(['h4', 'h5', 'g4', 'hxg4', 'h5', 'd5', 'h6', 'Nf6', 'h7', 'Rg8', 'h8=N'])).toEqual([
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
    
    test('pawn promotes to Knight by capture', () => {
        expect(pgn.pgnToPosition(['h4', 'h5', 'g4', 'hxg4', 'h5', 'd5', 'h6', 'Nf6', 'h7', 'Rg8', 'hxg8=N'])).toEqual( [
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
    
    test('pawn promotes to Bishop', () => {
        expect(pgn.pgnToPosition(['h4', 'h5', 'g4', 'hxg4', 'h5', 'd5', 'h6', 'Nf6', 'h7', 'Rg8', 'h8=B'])).toEqual([
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
    
    test('pawn promotes to Bishop by capture', () => {
        expect(pgn.pgnToPosition(['h4', 'h5', 'g4', 'hxg4', 'h5', 'd5', 'h6', 'Nf6', 'h7', 'Rg8', 'hxg8=B'])).toEqual( [
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
    
    test('pawn promotes to Rook', () => {
        expect(pgn.pgnToPosition(['h4', 'h5', 'g4', 'hxg4', 'h5', 'd5', 'h6', 'Nf6', 'h7', 'Rg8', 'h8=R'])).toEqual([
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
    
    test('pawn promotes to Rook by capture', () => {
        expect(pgn.pgnToPosition(['h4', 'h5', 'g4', 'hxg4', 'h5', 'd5', 'h6', 'Nf6', 'h7', 'Rg8', 'hxg8=R'])).toEqual( [
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
});

describe('#pgnToPosition multiple Queens multiple Queens', () => {
    test('multiple Queens unambiguous move', () => {
        expect(pgn.pgnToPosition(['e4','d5','Nc3','Nf6','e5','d4','exf6','dxc3','fxg7','cxb2','gxh8=Q','bxa1=Q','Qxa1'])).toEqual([
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
    
    test('multiple Queens with specified column', () => {
        expect(pgn.pgnToPosition(['e4','d5','Nc3','d4','f4','dxc3','Nf3','cxb2','Be2','bxa1=Q','O-O','Qxa2','Qe1','Qxc2','d4','Qxd4+','Kh1','Qcd2','Ba3'])).toEqual([
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
    
    test('multiple Queens with specified row', () => {
        expect(pgn.pgnToPosition(['e4','d5','Nc3','d4','f4','dxc3','Nf3','cxb2','Be2','bxa1=Q','O-O','Qxa2','Qe1','Qxc2','d4','Qxd4+','Kh1','Qcd2','Ba3','Q4b2','Rg1','Qdb4','Qf1','Q2c3'])).toEqual([
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
    
    test('multiple Queens vertical battery move', () => {
        expect(pgn.pgnToPosition(['e4','d5','Nc3','d4','f4','dxc3','Nf3','cxb2','Be2','bxa1=Q','O-O','Qxa2','Qe1','Qxc2','d4','Qxd4+','Kh1','Qcd2','Ba3','Qd1'])).toEqual([
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
    
    test('multiple Queens horizontal battery move', () => {
        expect(pgn.pgnToPosition(['e4','d5','Nc3','d4','f4','dxc3','Nf3','cxb2','Be2','bxa1=Q','O-O','Qxa2','Qe1','Qxc2','d4','Qxd4+','Kh1','Qcd2','Ba3','Q4b2','Rg1','Qxe2'])).toEqual([
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
    
    test('multiple Queens diagonal battery move', () => {
        expect(pgn.pgnToPosition(['e4','d5','Nc3','d4','f4','dxc3','Nf3','cxb2','Be2','bxa1=Q','O-O','Qxa2','Qe1','Qxc2','d4','Qxd4+','Kh1','Qcd2','Ba3','Q4b2','Rg1','Qbc3','h3','Qa5'])).toEqual([
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
});
