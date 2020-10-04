const square = 64;
const dimensions = square * 8;

export function drawBoard(context){
    context.canvas.height = dimensions;
    context.canvas.width = dimensions;
    drawSquares(context);
}

function drawSquares(context){
    let isWhite = true;
    for(let x=0;x<dimensions;x+=square){
        isWhite = !isWhite;
        for(let y=0;y<dimensions;y+=square){
            isWhite = !isWhite;
            context.fillStyle = isWhite ? '#F4F4DB' : '#a85f00';
            context.fillRect(x, y, dimensions, dimensions);
        }
    }
}