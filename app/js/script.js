class Cell {

    constructor(x, color, active, set) {
        this.x = x;
        this.color = color;
        this.active = active;
        this.set = set;
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

    setBlock() {
        this.set = true;
    }

    unsetBlock() {
        this.set = false;
    }

}

var boardArr = [];

function initialiseBoard() {

    const board = document.getElementById("board");

    for (let i = 0; i < 128; i++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");

        boardArr.push(new Cell(i, "white", false));
        
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

function newBlock() {
    boardArr[4] = new Cell(4, "red", true, false);
    var cell = document.getElementById("cell-4");
    cell.classList.add("red");
}

function updateBlock() {
    for (var i = 0; i < 128; i++) {
        if (boardArr[i].active) {
            var nextX = boardArr[i].x + 8;
            if (nextX >= 128) {
                setBlock(i);
                newBlock();
                break;
              
            }
            
            moveCell(i, nextX);

            break;
        }
    }
}

function setBlock(x) {
    boardArr[x] = new Cell(x, "red", false, true);
    var cell = document.getElementById("cell-" + x);
    cell.classList.add("red");
}

function moveCell(x, nextX) {
    boardArr[x] = new Cell(x, "white", false, false);
    var cell = document.getElementById("cell-" + x);
    cell.classList.remove("red");
    
    boardArr[nextX] = new Cell(nextX, "red", true, false);
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
    newBlock();
    window.addEventListener("keydown", onKeyPress);

    setInterval(runTetris, 1000);
})();


