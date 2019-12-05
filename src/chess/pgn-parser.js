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

    return header;
}

function extractFirstMove(movesRaw){
    return movesRaw.replace(/^1\. | .*$/g, '');
}