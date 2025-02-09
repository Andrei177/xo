import { minimax } from "./minimax";

export const nextStepComputer = (board) => {
    let bestScore = Infinity; // Минимизация для "O"
    let move = { row: -1, col: -1 };

    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (board[row][col] === null) {
                let tempBoard = board.map(row => [...row]); // Создаем копию доски
                tempBoard[row][col] = 'O';
                let score = minimax(tempBoard, 0, true);
                
                if (score < bestScore) {
                    bestScore = score;
                    move = { row, col };
                }
            }
        }
    }
    if(move.row == -1 && move.col == -1){
        return board
    }
    let newBoard = board.map(row => [...row]);
    newBoard[move.row][move.col] = "O";
    return newBoard;
};
