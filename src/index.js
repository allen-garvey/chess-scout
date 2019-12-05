import { parsePgn } from './chess/pgn-parser';
import { getOpeningStats, getFirstMoveStats } from './chess/stats';

// const apiUrl = 'http://lichess.org/api/games/user/classyplays?max=10&opening=true';
const apiUrl = '/assets/test1.pgn';

const userName = 'classyplays';

fetch(apiUrl).then((res)=>{
    if(res.status !== 200){
        throw new Error('Error reaching lichess api');
    }
    return res.text();
}).then((text)=>{
    // console.log(text);
    const games = parsePgn(text);
    console.log(games);
    console.log(getOpeningStats(games, userName));
    console.log(getFirstMoveStats(games, userName));
});