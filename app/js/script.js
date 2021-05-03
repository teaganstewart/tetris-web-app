class Cell {

    constructor( color, active, set) {
        this.color = color;
        this.active = active;
        this.set = set;
    }

    setColor(color) {
        this.color = color;
    }

    removeColor() {
        this.color = "white";
    }

    setActive() {
        this.active = true;
    }

    setInactive() {
        this.active = false;
    }

    setSet() {
        this.set = true;
    }

    unsetBlock() {
        this.set = false;
    }
}

function findColor(colorNo) {
    switch (colorNo) {
        case 0:
            return "blue";
        case 1:
            return "yellow";
        case 2:
            return "green";
        case 3:
            return "red";
        case 4:
            return "purple";
        case 5:
            return "orange";
        case 6:
            return "darkblue";
        default:
            break;
    }
}


var boardArr = [];

function initialiseBoard() {

    const board = document.getElementById("board");

    for (let i = 0; i < 128; i++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");

        boardArr.push(new Cell( "white", false, false));
        
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
    var random = Math.floor((Math.random() * 7));
    boardArr[4].setActive();
    boardArr[4].setColor(findColor(random));

    var cell = document.getElementById("cell-4");
    cell.classList.add(boardArr[4].color);
}

function updateBlock() {
    for (var i = 0; i < 128; i++) {
        if (boardArr[i].active) {
            var nextX = i + 8;
            if (canSetBlock(nextX)) {
                setBlock(i);
                clearRows();

                if (i >= 8) {
                    newBlock();
                }
                else {
                    console.log("game over ay");
                }
                break;
              
            }  
            
            moveCell(i, nextX);

            break;
        }
    }
}

function clearRows() {

    var count = 0;
    var clear = false;
    while (!clear) {
        
    
        for (let i = 0; i < 128; i++) {
            if (boardArr[i].set) { count++; }
            if (i % 8 == 7) {
                if (count == 8) {
                    clearRow(i);
                    break;
                }

                count = 0;
            }
        }

        clear = true;
    }

    console.log("hmm");
}

function clearRow(i) {
    for (var x = i; x >= 8; x--) {
        var cell = document.getElementById("cell-" + x);
        cell.classList.remove(boardArr[x].color);
        boardArr[x].setColor(boardArr[x - 8].color);
        cell.classList.add(boardArr[x].color);
        if (!boardArr[x - 8].set) {
            boardArr[x].unsetBlock();
        }
    }
    // for(var 0)
}

function canSetBlock(nextX) {
    if (nextX >= 128 || boardArr[nextX].set) {
        return true;
    }

    return false;
}

function setBlock(x) {
    boardArr[x].setSet();
    boardArr[x].setInactive();
}

function moveCell(x, nextX) {
    boardArr[x].setInactive();
    var cell = document.getElementById("cell-" + x);
    cell.classList.remove(boardArr[x].color);
    
    boardArr[nextX].setActive();
    cell = document.getElementById("cell-" + nextX);
    cell.classList.add(boardArr[x].color);
    boardArr[nextX].setColor(boardArr[x].color);
    boardArr[x].removeColor();
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

            var nextX = i - 1;
            if (i % 8 == 0 || canSetBlock(nextX)) {
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

            var nextX = i + 1;
            if (nextX  % 8 == 0 || canSetBlock(nextX)) {
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


