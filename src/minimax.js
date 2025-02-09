export function minimax(board, depth, isMaximizing, maxDepth) {
    let result = checkWinner(board);
    if (result !== false) {
        return result - (isMaximizing ? depth : -depth); // Учитываем глубину
    }

    // Ограничиваем глубину поиска
    if (depth >= maxDepth) {
        return 0; // Если достигли максимальной глубины, просто возвращаем 0 (ничья)
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (board[row][col] === null) {
                    let tempBoard = board.map(row => [...row]);
                    tempBoard[row][col] = 'X';
                    let score = minimax(tempBoard, depth + 1, false, maxDepth);
                    bestScore = Math.max(score, bestScore);
                }
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (board[row][col] === null) {
                    let tempBoard = board.map(row => [...row]);
                    tempBoard[row][col] = 'O';
                    let score = minimax(tempBoard, depth + 1, true, maxDepth);
                    bestScore = Math.min(score, bestScore);
                }
            }
        }
        return bestScore;
    }
}

export function checkWinner(board) {
    // Проверяем строки и столбцы
    for (let i = 0; i < 3; i++) {
        if (board[i][0] && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
            return board[i][0] === 'X' ? 10 : -10;
        }
        if (board[0][i] && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
            return board[0][i] === 'X' ? 10 : -10;
        }
    }

    // Проверяем диагонали
    if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        return board[0][0] === 'X' ? 10 : -10;
    }
    if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
        return board[0][2] === 'X' ? 10 : -10;
    }

    // Проверяем ничью
    if (board.flat().every(cell => cell !== null)) {
        return 0;
    }

    return false; // Игра продолжается
}
