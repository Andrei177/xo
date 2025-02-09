export const isEndGame = (gameGrid) => {
    
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (gameGrid[i][j] == "X" || gameGrid[i][j] == "O") {
                continue
            }
            else return false
        }
    }
    return true
}