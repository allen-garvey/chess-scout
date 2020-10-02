import { sortByGameFrequency } from './util';

function getCombinedStats(stats){
    const openings = stats.reduce((combinedStats, [name, stat]) => {
        const key = name.replace(/(:|,).*$/, '');
        if(key in combinedStats){
            const current = combinedStats[key];
            current.games += stat.games;
            current.wins += stat.wins;
            current.draws += stat.draws;
            current.losses += stat.losses;
        }
        else{
            combinedStats[key] = {
                games: stat.games,
                wins: stat.wins,
                draws: stat.draws,
                losses: stat.losses,
            };
        }
        return combinedStats;
    }, {});
    return Object.keys(openings).map((key) => {
        const opening = openings[key];
        return [key, opening];
    }).sort(sortByGameFrequency());
}

export function getOpeningStatsCondensed({white, black}){
    return {
        white: getCombinedStats(white),
        black: getCombinedStats(black),
    };
}