export function parsePgn(pgnRaw){
    return extractHeaderAndMoves(separateGames(pgnRaw));
}

function separateGames(pgnRaw){
    const gamesRaw = pgnRaw.split('\n\n\n').filter((line)=>{
        return line && !line.match(/^\s+$/);
    });
    return gamesRaw;
}

function extractHeaderAndMoves(gamesRaw){
    return gamesRaw.map((game)=>{
        const split = game.split('\n\n');
        return {
            header: parseHeader(split[0]),
            first_move: extractFirstMove(split[1]),
        };
    });
}

function parseHeader(headerRaw){
    const header = {};

    headerRaw.split('\n').forEach((line)=>{
        const key = line.replace(/^\[| .*\].*$/g, '');
        const value = line.replace(/^\[\w+ "|"\].*$/g, '');
        header[key] = value;
    });

    if(header.Result === '1-0'){
        header.Winner = 'White';
    }
    else if(header.Result === '0-1'){
        header.Winner = 'Black';
    }
    else{
        header.Winner = 'Draw';
    }

    return header;
}

function extractFirstMove(movesRaw){
    return movesRaw.replace(/^1\. | .*$/g, '');
}