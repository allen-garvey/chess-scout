import { sortByGameFrequency, getResult } from './util';

export function getFirstMoveStats(games, playerName){
    return {
        white: getFirstMoveStatsForColor(games, playerName, 'White'),
        black: getFirstMoveStatsForColor(games, playerName, 'Black'),
    };
}

function getFirstMoveStatsForColor(games, playerName, color){
    const openings = {};
    games.forEach((game)=>{
        const header = game.header;
        if(header[color] !== playerName){
            return;
        }
        const moveKey = game.moves[0][0];
        const stat = openings[moveKey] || {wins: 0, draws: 0, losses: 0, games: 0};

        const result = getResult(header, color);
        stat.draws += result.draws;
        stat.wins += result.wins;
        stat.losses += result.losses;
        stat.games++;

        openings[moveKey] = stat;
    });

    return Object.keys(openings).map((key) => {
        return [key, openings[key]];
    }).sort(sortByGameFrequency());
}

export function getOpeningStats(games, playerName){
    return {
        white: getOpeningStatsForColor(games, playerName, 'White'),
        black: getOpeningStatsForColor(games, playerName, 'Black'),
    };
}

function getOpeningStatsForColor(games, playerName, color){
    const openings = {};
    games.forEach((game)=>{
        const header = game.header;
        if(header[color] !== playerName){
            return;
        }
        const key = header.Opening;
        const stat = openings[key] || {wins: 0, draws: 0, losses: 0, games: 0, eco: header.ECO};

        const result = getResult(header, color);
        stat.draws += result.draws;
        stat.wins += result.wins;
        stat.losses += result.losses;
        stat.games++;

        openings[key] = stat;
    });

    return Object.keys(openings).map((key) => {
        return [key, openings[key]];
    }).sort(sortByGameFrequency());
}