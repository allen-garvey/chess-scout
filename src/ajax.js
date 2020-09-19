import { parsePgn } from './chess/pgn-parser';
import { getOpeningStats, getFirstMoveStats } from './chess/stats';
import { getOpeningStatsCondensed } from './chess/opening-stats-condensed';

function getApiUrlForUser(userName){
    const apiUrlBase = 'http://lichess.org/api/games/user/';
    const queryParamBase = '?max=30&opening=true';
    // return `${apiUrlBase}${encodeURIComponent(userName)}${queryParamBase}`;
    // for testing so not rate limited by lichess
    return '/assets/test1.pgn';
}

export function getUserGamesStats(userName){
    return fetch(getApiUrlForUser(userName)).then((res)=>{
        if(res.status !== 200){
            throw new Error('Error reaching lichess api');
        }
        return res.text();
    }).then((text)=>{
        const games = parsePgn(text);
        const openingStats = getOpeningStats(games, userName);
        return {
            openingStats,
            openingStatsCondensed: getOpeningStatsCondensed(openingStats),
            firstMoveStats: getFirstMoveStats(games, userName),
        };
    });
}