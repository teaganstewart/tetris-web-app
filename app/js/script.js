class Cell {

    constructor(x, color, active) {
        this.x = x;
        this.color = color;
        this.active = active;
    }

    updateColor(color) {
        this.color = color;
    }

    setActive() {
        this.active = true;
    }

    setInactive() {
        this.active = false;
    }

}

var boardArr = [];

function initialiseBoard() {

    const board = document.getElementById("board");

    for (let i = 0; i < 128; i++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");

        if (i == 4) {
            boardArr.push(new Cell(i, "red", true));
        }
        else {
            boardArr.push(new Cell(i, "white", false));
        }
        
        cell.id = "cell-" + i;
        board.appendChild(cell);

    }
}

function initialisePreview() {
    const preview = document.getElementById("preview-board");

    for (let i = 0; i < 24; i++) {
        let cell = document.createElement("div");
        cell.classList.add("score-cell");
        preview.appendChild(cell);

    }
}

function runTetris() {
    updateBlock();
    
}

function updateBlock() {
    for (var i = 0; i < 128; i++) {
        if (boardArr[i].active) {
            var nextX = boardArr[i].x + 8;
            if (nextX >= 128) {
                nextX = 4;
            }
            
            moveCell(i, nextX);

            break;
        }
    }
}

function moveCell(x, nextX) {
    boardArr[x] = new Cell(x, "white", false);
    var cell = document.getElementById("cell-" + x);
    cell.classList.remove("red");
    
    boardArr[nextX] = new Cell(nextX, "red", true);
    cell = document.getElementById("cell-" + nextX);
    cell.classList.add("red");
}

function onKeyPress(event) {
    switch (event.keyCode) {
        case 37:
            moveLeft();
            break;
        case 39:
            moveRight();
            break;
        case 40:
            updateBlock();
            break;
        default:
            break;
    }
}

function moveLeft() {
    for (var i = 0; i < 128; i++) {
        if (boardArr[i].active) {

            var nextX = boardArr[i].x - 1;
            if (i % 8 == 0) {
                break;
            }
            
            moveCell(i, nextX);

            break;
        }
    }
}

function moveRight() {
    for (var i = 0; i < 128; i++) {
        if (boardArr[i].active) {

            var nextX = boardArr[i].x + 1;
            if (nextX  % 8 == 0) {
                break;
            }
            
            moveCell(i, nextX);

            break;
        }
    }
}

; (function () {

    initialiseBoard();
    initialisePreview();

    window.addEventListener("keydown", onKeyPress);

    setInterval(runTetris, 1000);
})();


