import { useState } from 'react'
import './App.css'
import { nextStepComputer } from './nextStepComputer';
import { checkWinner } from './minimax';
import { isEndGame } from './isEndGame';

function App() {
  const [gameGrid, setGameGrid] = useState([[null, null, null], [null, null, null], [null, null, null]])
  const [message, setMessage] = useState("")

  const handleRetry = () => {
    setMessage("")
    setGameGrid([[null, null, null], [null, null, null], [null, null, null]])
  }

  const handleClick = (strIndex, cellIndex) => {
    if (gameGrid[strIndex][cellIndex] || checkWinner(gameGrid)) return;

    const tempArr = JSON.parse(JSON.stringify(gameGrid));
    tempArr[strIndex][cellIndex] = 'X';
    setGameGrid(tempArr);

    if (!checkWinner(tempArr)) {
        setTimeout(() => {
            const newGrid = nextStepComputer(tempArr);
            setGameGrid(newGrid);

            if (checkWinner(newGrid)) {
              console.log("Компьютер выиграл!");
              setMessage("Компьютер выиграл!")
            }
            else if (isEndGame(newGrid)) {
              console.log("Ничья!");
              setMessage("Ничья!")
            }
        }, 250);
    } else {
        console.log("Пользователь выиграл!");
        setMessage("Пользователь выиграл!")
    }
};

  return (
    <div className="game-wrapper">
      {
        message 
        && 
        <div className="message">
          <h1>{message}</h1>
          <button className="btn" onClick={handleRetry}>↻</button>
        </div>
      }
      <div className="game-grid">
        {
          gameGrid.map((str, strIndex) => {
            return str.map((cell, cellIndex) => {
              return <div className="cell" onClick={() => handleClick(strIndex, cellIndex)} key={String(strIndex) + String(cellIndex)} style={cell && {cursor: "default"}}>
                {
                  cell && cell
                }
              </div>
            })
          })
        }
      </div>
    </div>
  )
}

export default App
