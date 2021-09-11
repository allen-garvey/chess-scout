import { parsePgn } from './chess/pgn-parser';
import { getOpeningStats, getFirstMoveStats } from './chess/stats';
import { getOpeningStatsCondensed } from './chess/opening-stats-condensed';
import { getMoveTrees } from './chess/move-tree';

function getApiUrlForUser(userName){
    const apiUrlBase = 'https://lichess.org/api/games/user/';
    const queryParamBase = '?max=30&opening=true&perfType=ultraBullet,bullet,blitz,rapid,classical';
    // return `${apiUrlBase}${encodeURIComponent(userName)}${queryParamBase}`;
    // for testing so not rate limited by lichess
    return `/assets/${userName}.pgn`;
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
            moveTrees: getMoveTrees(games, userName),
        };
    });
}