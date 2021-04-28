

function initialiseBoard() {

    const board = document.getElementById("board");

    for (let i = 0; i < 128; i++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
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

; (function () {

    initialiseBoard();
    initialisePreview();

})();

