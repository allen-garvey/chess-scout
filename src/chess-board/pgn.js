const BLACK = 'b';
const WHITE = 'w';
const EMPTY_CELL = '00';
const PAWN = 'P';

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

function pgnToPosition(moves){
    let position = getStartingPostion();
    let isWhite = false;

    moves.forEach((move) => {
        isWhite = !isWhite;
        switch(true){
            case /^\w\d$/.test(move):
                position = movePawn(position, move, isWhite);
                break;
        }
    });

    return position;
}

export default {
    getStartingPostion,
    pgnToPosition,
};