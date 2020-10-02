export function sortByGameFrequency(){
    return (a, b) => b[1].games - a[1].games;
}