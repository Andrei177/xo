import { useState } from 'react'
import './App.css'
import { nextStepComputer } from './nextStepComputer';
import { checkWinner } from './minimax';
import { isEndGame } from './isEndGame';

const difficultyLevels = {
  easy: 0,
  medium: 2,
  hard: 6
}

function App() {
  const [gameGrid, setGameGrid] = useState([[null, null, null], [null, null, null], [null, null, null]])
  const [message, setMessage] = useState("")
  const [difficulty, setDifficulty] = useState(difficultyLevels.medium)

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
            const newGrid = nextStepComputer(tempArr, difficulty);
            setGameGrid(newGrid);

            if (checkWinner(newGrid)) {
              setMessage("Компьютер выиграл!")
            }
            else if (isEndGame(newGrid)) {
              setMessage("Ничья!")
            }
        }, 250);
    } else {
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
      <div className="levels">
        <h2>Уровень сложности</h2>
        <button onClick={() => setDifficulty(difficultyLevels.easy)} className={difficulty == difficultyLevels.easy && 'selected'}>Лёгкий</button>
        <button onClick={() => setDifficulty(difficultyLevels.medium)} className={difficulty == difficultyLevels.medium && 'selected'}>Средний</button>
        <button onClick={() => setDifficulty(difficultyLevels.hard)} className={difficulty == difficultyLevels.hard && 'selected'}>Тяжёлый</button>
      </div>
    </div>
  )
}

export default App
