export const isWinner = (gameGrid, player) => {
    if(
      (gameGrid[0][0] == player && gameGrid[0][1] == player && gameGrid[0][2] == player) ||
      (gameGrid[1][0] == player && gameGrid[1][1] == player && gameGrid[1][2] == player) ||
      (gameGrid[2][0] == player && gameGrid[2][1] == player && gameGrid[2][2] == player) ||
      (gameGrid[0][0] == player && gameGrid[1][0] == player && gameGrid[2][0] == player) ||
      (gameGrid[0][1] == player && gameGrid[1][1] == player && gameGrid[2][1] == player) ||
      (gameGrid[0][2] == player && gameGrid[1][2] == player && gameGrid[2][2] == player) ||
      (gameGrid[0][0] == player && gameGrid[1][1] == player && gameGrid[2][2] == player) ||
      (gameGrid[2][0] == player && gameGrid[1][1] == player && gameGrid[0][2] == player)
      ) {
        return true;
        } else {
        return false;
        }
  }