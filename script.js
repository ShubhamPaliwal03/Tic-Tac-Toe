const cells = document.querySelectorAll('.cell');
const turn_container = document.getElementById('turn-container');
const turn_image = document.getElementById('turn-image');
const turn_text = document.getElementById('turn-text');
const winStrikeLine = document.getElementById('line');
const reset_btn = document.getElementById('reset-button');
const confetti_btn = document.getElementById('confetti-button');
const victory_sound = new Audio('sounds/victory-sound.mp3');
victory_sound.volume = 0.1;

let turn = "x"; // as x always starts first
let turns = 0;
let won = false;

const checkWin = () => {
    
    const winConditions =

        [
            // (cell1, cell2, cell3) for winning condition, and (top, left, deg of rotate transform, width) for placing strikethrough line

            [1,  2,  3,   2.38,   1,   0,  15],
            [4,  5,  6,   8.38,   1,   0,  15],
            [7,  8,  9,  14.38,   1,   0,  15],
            [1,  4,  7,    8.4,  -5,  90,  15],
            [2,  5,  8,    8.4,   1,  90,  15],
            [3,  6,  9,    8.4,   7,  90,  15],
            [1,  5,  9,    8.4,  -2,  45,  21],
            [3,  5,  7,    8.4,  -2, -45,  21]
        ];
    
        winConditions.forEach(condition => {

            // storing the reference of all the 3 cells of the possible winning condition

            const cell1 = cells[condition[0] - 1];
            const cell2 = cells[condition[1] - 1];
            const cell3 = cells[condition[2] - 1];

            // storing the values of the top, left, deg of rotate transform, and width of the win strike line

            const top = condition[3];
            const left = condition[4];
            const transform = condition[5];
            const width = condition[6];

            if(cell1.id != "" && cell1.id === cell2.id && cell2.id === cell3.id){

                if(cell1.id === "X") {
                    turn_image.src = "images/x_image.svg";
                    turn_image.className = "x-image";
                }
                else {
                    turn_image.src = "images/o_image.png";
                    turn_image.className = "o-image";
                }

                winStrikeLine.style.display = "block";
                winStrikeLine.style.top = top+"em";
                winStrikeLine.style.left = left+"em";
                winStrikeLine.style.transform = "rotate("+transform+"deg)";
                winStrikeLine.style.width = width+"em";

                turn_text.innerText = "WON!";

                won = true;

                cells.forEach(cell => {
                    cell.removeEventListener('click', playTurn);
                });

                confetti_btn.click();

                victory_sound.play();
            }
        });
};

const playTurn = (event) => {

    const cell = event.target;

    if (cell.id === "") {

        new Audio('sounds/piece_move-sound.mp3').play();

        if (turn === "x") {

            const x_image = document.createElement("img");
            x_image.className = "x-o-image x-image";
            x_image.src = "images/x_image.svg";
            x_image.alt = "X";
            cell.appendChild(x_image);

            turn_image.src = "images/o_image.png";
            turn_image.className = "o-image";

            cell.id = "X";
            turn = "o";
        }
        else {

            const o_image = document.createElement("img");
            o_image.className = "x-o-image o-image";
            o_image.src = "images/o_image.png";
            o_image.alt = "Y";
            cell.appendChild(o_image);

            turn_image.src = "images/x_image.svg";
            turn_image.className = "x-image";

            cell.id = "O";
            turn = "x";
        }

        checkWin();

        cell.removeEventListener('click', playTurn);
    
        turns++;

        if(turns === 9 && !won) {
            turn_container.removeChild(turn_image);

            // const x_image = document.createElement("img");
            // x_image.className = "xo-image x-image";
            // x_image.src = "images/x_image.svg";
            // x_image.alt = "X";
            
            // turn_container.appendChild(x_image);

            // turn_image.src = "images/o_image.png";
            // turn_image.className = "o-image";

            // const o_image = document.createElement("img");
            // o_image.className = "xo-image o-image";
            // o_image.src = "images/o_image.png";
            // o_image.alt = "Y";
            // cell.appendChild(o_image);

            // turn_image.src = "images/x_image.svg";
            // turn_image.className = "x-image";

            // turn_container.appendChild(o_image);

            turn_text.innerText = "TIE!";
        }
    }
}

let eventListenersAdded = false;

if (!eventListenersAdded) {

    cells.forEach((cell) => {
        cell.addEventListener('click', playTurn);
    });

    eventListenersAdded = true;
}

reset_btn.addEventListener('click', () => {
    window.location.reload();
});