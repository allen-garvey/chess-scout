import { sortByGameFrequency } from './util';

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
        const moveKey = game.first_move;
        const stat = openings[moveKey] || {wins: 0, draws: 0, losses: 0, games: 0};

        if(header.Winner === 'Draw'){
            stat.draws += 1;
        }
        else if(header.Winner === color){
            stat.wins += 1;
        }
        else{
            stat.losses += 1;
        }

        stat.games++;

        openings[moveKey] = stat;
    });

    return Object.keys(openings).map((key) => {
        return [key, openings[key]];
    }).sort((a, b)=>{
        const stat1 = a[1];
        const stat2 = b[1];

        if(stat1.wins < stat2.wins){
            return -1;
        }
        if(stat1.losses > stat2.losses){
            return -1;
        }
        if(stat1.draws === stat2.draws){
            return 0;
        }
        return 1;
    });
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

        if(header.Winner === 'Draw'){
            stat.draws += 1;
        }
        else if(header.Winner === color){
            stat.wins += 1;
        }
        else{
            stat.losses += 1;
        }

        stat.games++;

        openings[key] = stat;
    });

    return Object.keys(openings).map((key) => {
        return [key, openings[key]];
    }).sort(sortByGameFrequency());
}