const BLACK = 'b';
const WHITE = 'w';
const EMPTY_CELL = '00';
const PAWN = 'P';
const KNIGHT = 'N';
const BISHOP = 'B';
const QUEEN = 'Q';
const KING = 'K';

function getStartingPostion(){
    return [
        ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR'],
        ['bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP'],
        ['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR'],
    ];
}

function transverseVertical(position, startingRow, shouldReverse, callback){
    if(shouldReverse){
        for(let i=startingRow-1;i>=0;i--){
            const shouldBreak = callback(position[i]);
            if(shouldBreak){
                break;
            }
        }
        return;
    }
    for(let i=startingRow+1;i<position.length;i++){
        const shouldBreak = callback(position[i]);
        if(shouldBreak){
            break;
        }
    }
}

function copyPosition(position){
    return position.map(row => row.slice());
}

function getRow(row){
    return (parseInt(row) - 8) * -1;
}

function getColumn(column){
    const columnCleaned = column.toUpperCase();
    let ret = 0;
    switch(columnCleaned){
        case 'H':
            ret++;
        case 'G':
            ret++;
        case 'F':
            ret++;
        case 'E':
            ret++;
        case 'D':
            ret++;
        case 'C':
            ret++;
        case 'B':
            ret++;
        default:
            break; 
    }
    return ret;
}

function findPieces(position, piece){
    const ret = [];
    position.forEach((line, y) => line.forEach((p, x) => {
        if(p === piece){
            ret.push({
                x,
                y,
            });
        }
    }));
    return ret;
}

function moveKnight(position, move, isWhite){
    const column = getColumn(move[move.length - 2]);
    const row = getRow(move[move.length - 1]);
    const piece = `${isWhite ? WHITE : BLACK}${KNIGHT}`;
    const movedPieceColumn = move.length >= 4 && move[1] !== 'x' ? getColumn(move[1]) : false;
    const foundPieces = findPieces(position, piece);
    const newPosition = copyPosition(position);
    newPosition[row][column] = piece;

    for(let i=0;i<foundPieces.length;i++){
        const coordinate = foundPieces[i];
        if((movedPieceColumn === false || movedPieceColumn === coordinate.x) && (Math.abs(column - coordinate.x) === 1 && Math.abs(row - coordinate.y) === 2) || (Math.abs(column - coordinate.x) === 2 && Math.abs(row - coordinate.y) === 1)){
            newPosition[coordinate.y][coordinate.x] = EMPTY_CELL;
            break;
        }
    }
    
    return newPosition;
}

function moveBishop(position, move, isWhite){
    function getPolarity(n1, n2){
        return n1 % 2 === n2 % 2;
    }

    const column = getColumn(move[move.length - 2]);
    const row = getRow(move[move.length - 1]);
    const piece = `${isWhite ? WHITE : BLACK}${BISHOP}`;
    const piecePolarity = getPolarity(column, row);
    const movedPieceColumn = move.length >= 4 && move[1] !== 'x' ? getColumn(move[1]) : false;
    const foundPieces = findPieces(position, piece);
    const newPosition = copyPosition(position);
    newPosition[row][column] = piece;

    for(let i=0;i<foundPieces.length;i++){
        const coordinate = foundPieces[i];
        if((movedPieceColumn === false || movedPieceColumn === coordinate.x) && (piecePolarity === getPolarity(coordinate.x, coordinate.y))){
            newPosition[coordinate.y][coordinate.x] = EMPTY_CELL;
            break;
        }
    }
    
    return newPosition;
}

function moveSinglePiece(position, move, isWhite, pieceSymbol){
    const column = getColumn(move[move.length - 2]);
    const row = getRow(move[move.length - 1]);
    const piece = `${isWhite ? WHITE : BLACK}${pieceSymbol}`;
    const foundPiece = findPieces(position, piece)[0];
    const newPosition = copyPosition(position);
    newPosition[row][column] = piece;
    newPosition[foundPiece.y][foundPiece.x] = EMPTY_CELL;
    
    return newPosition;
}

function movePawn(position, move, isWhite){
    const column = getColumn(move[0]);
    const row = getRow(move[1]);
    const color = isWhite ? WHITE : BLACK;
    const newPosition = copyPosition(position);
    newPosition[row][column] = `${color}${PAWN}`;

    transverseVertical(newPosition, row, !isWhite, (localRow) => {
        if(localRow[column][1] === PAWN){
            localRow[column] = EMPTY_CELL;
            return true;
        }
    });

    return newPosition;
}

function pawnTakes(position, move, isWhite){
    const column = getColumn(move[2]);
    const row = getRow(move[3]);
    const color = isWhite ? WHITE : BLACK;
    const newPosition = copyPosition(position);
    const piece = `${color}${PAWN}`;
    const rowFrom = isWhite ? row + 1 : row - 1;
    // check for en passant
    if(newPosition[row][column] === EMPTY_CELL){
        newPosition[rowFrom][column] = EMPTY_CELL;
    }
    newPosition[row][column] = piece;
    newPosition[rowFrom][getColumn(move[0])] = EMPTY_CELL;

    return newPosition;
}

function pgnToPosition(moves){
    let position = getStartingPostion();
    let isWhite = false;

    moves.forEach((move) => {
        isWhite = !isWhite;
        switch(true){
            case /^\w\d$/.test(move):
                position = movePawn(position, move, isWhite);
                break;
            case /^[a-h]x/.test(move):
                position = pawnTakes(position, move, isWhite);
                break;
            case /^N[a-h]?x?[a-h]\d$/.test(move):
                position = moveKnight(position, move, isWhite);
                break;
            case /^B[a-h]?x?[a-h]\d$/.test(move):
                position = moveBishop(position, move, isWhite);
                break;
            case /^Qx?[a-h]\d$/.test(move):
                // TODO: this will not work if there are multiple queens
                position = moveSinglePiece(position, move, isWhite, QUEEN);
                break;
            case /^Kx?[a-h]\d$/.test(move):
                position = moveSinglePiece(position, move, isWhite, KING);
                break;
        }
    });

    return position;
}

export default {
    getStartingPostion,
    pgnToPosition,
};