const square = 64;
const dimensions = square * 8;
const LINE_WIDTH = 1.5;
const WHITE = '#fff';
const BLACK = '#000';

export function drawBoard(context){
    context.canvas.height = dimensions;
    context.canvas.width = dimensions;
    drawSquares(context);
    drawPieces(context, getStartingPostion());
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

function getStartingPostion(){
    return [
        ['00', '00', '00', '00', '00', '00', '00', '00', ],
        ['bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP', ],
        ['00', '00', '00', '00', '00', '00', '00', '00', ],
        ['00', '00', '00', '00', '00', '00', '00', '00', ],
        ['00', '00', '00', '00', '00', '00', '00', '00', ],
        ['00', '00', '00', '00', '00', '00', '00', '00', ],
        ['wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP', ],
        ['wQ', 'wQ', 'wQ', 'wQ', 'wQ', 'wQ', 'wQ', 'wQ', ],
    ];
}

function drawPieces(context, board){
    board.forEach((line, y) => line.forEach((piece, x) => {
        const xPosition = x * square;
        const yPosition = y * square;
        switch(piece){
            case 'wQ':
                return drawWhiteQueen(context, xPosition, yPosition);
            case 'wP':
                return drawPawn(context, xPosition, yPosition, true);
            case 'bP':
                return drawPawn(context, xPosition, yPosition, false);
            default:
                return;
        }
    }));
}

function drawPawn(context, x, y, isWhite){
    context.resetTransform();
    context.translate(x+2, y);
    context.scale(1.3, 1.3);
    const path = new Path2D('M 22,9 C 19.79,9 18,10.79 18,13 C 18,13.89 18.29,14.71 18.78,15.38 C 16.83,16.5 15.5,18.59 15.5,21 C 15.5,23.03 16.44,24.84 17.91,26.03 C 14.91,27.09 10.5,31.58 10.5,39.5 L 33.5,39.5 C 33.5,31.58 29.09,27.09 26.09,26.03 C 27.56,24.84 28.5,23.03 28.5,21 C 28.5,18.59 27.17,16.5 25.22,15.38 C 25.71,14.71 26,13.89 26,13 C 26,10.79 24.21,9 22,9 z');
    context.fillStyle = isWhite ? WHITE : BLACK;
    context.strokeStyle = BLACK;
    context.lineWidth = LINE_WIDTH;
    context.lineCap = 'round';
    context.fill(path);
    context.stroke(path);
}

function drawWhiteQueen(context, x, y){
    const circleSvg = 'M 9 13 A 2 2 0 1 1  5,13 A 2 2 0 1 1  9 13 z';
    const createQueenCirclePath = (xTranslate, yTranslate) => {
        const path = new Path2D(circleSvg);
        const matrix = document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGMatrix();
        matrix.a = 1;
        matrix.b = 0;
        matrix.c = 0;
        matrix.d = 1;
        matrix.e = xTranslate;
        matrix.f = yTranslate;
        
        return [path, matrix];
    }; 

    context.resetTransform();
    context.translate(x, y);
    context.scale(1.3, 1.3);
    context.fillStyle = WHITE;
    context.strokeStyle = BLACK;
    context.lineWidth = LINE_WIDTH;
    context.lineCap = 'butt';

    const path2 = new Path2D('M 9,26 C 17.5,24.5 30,24.5 36,26 L 38,14 L 31,25 L 31,11 L 25.5,24.5 L 22.5,9.5 L 19.5,24.5 L 14,10.5 L 14,25 L 7,14 L 9,26 z');
    context.fill(path2);
    context.stroke(path2);

    const path3 = new Path2D('M 9,26 C 9,28 10.5,28 11.5,30 C 12.5,31.5 12.5,31 12,33.5 C 10.5,34.5 10.5,36 10.5,36 C 9,37.5 11,38.5 11,38.5 C 17.5,39.5 27.5,39.5 34,38.5 C 34,38.5 35.5,37.5 34,36 C 34,36 34.5,34.5 33,33.5 C 32.5,31 32.5,31.5 33.5,30 C 34.5,28 36,28 36,26 C 27.5,24.5 17.5,24.5 9,26 z');
    context.fill(path3);
    context.stroke(path3);

    context.stroke(new Path2D('M 11.5,30 C 15,29 30,29 33.5,30'));
    context.stroke(new Path2D('M 12,33.5 C 18,32.5 27,32.5 33,33.5'));

    // circles
    const path = new Path2D(circleSvg);
    path.addPath(...createQueenCirclePath(15.5, -5.5));
    path.addPath(...createQueenCirclePath(32, -1));
    path.addPath(...createQueenCirclePath(7, -4.5));
    path.addPath(...createQueenCirclePath(24, -4));

    context.fill(path);
    context.stroke(path);
}