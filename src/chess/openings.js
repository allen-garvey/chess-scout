export function getSortFunc(){
    return (a, b) => b[1].games - a[1].games;
}