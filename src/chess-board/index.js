const square = 64;
const dimensions = square * 8;

export function drawBoard(context){
    context.canvas.height = dimensions;
    context.canvas.width = dimensions;
    drawSquares(context);
    drawPieces(context);
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

function drawPieces(context){
    let isWhite = true;
    for(let x=0;x<dimensions;x+=square){
        isWhite = !isWhite;
        for(let y=0;y<dimensions;y+=square){
            drawPawn(context, x, y, isWhite);
        }
    }
}

function drawPawn(context, x, y, isWhite){
    context.resetTransform();
    context.translate(x+2, y);
    context.scale(1.3, 1.3);
    const path = new Path2D('M 22,9 C 19.79,9 18,10.79 18,13 C 18,13.89 18.29,14.71 18.78,15.38 C 16.83,16.5 15.5,18.59 15.5,21 C 15.5,23.03 16.44,24.84 17.91,26.03 C 14.91,27.09 10.5,31.58 10.5,39.5 L 33.5,39.5 C 33.5,31.58 29.09,27.09 26.09,26.03 C 27.56,24.84 28.5,23.03 28.5,21 C 28.5,18.59 27.17,16.5 25.22,15.38 C 25.71,14.71 26,13.89 26,13 C 26,10.79 24.21,9 22,9 z');
    context.fillStyle = isWhite ? '#fff' : '#000';
    context.fill(path);
    context.strokeStyle = '#000';
    context.lineWidth = 1.5;
    context.stroke(path);
}