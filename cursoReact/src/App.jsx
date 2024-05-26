import { useState } from "react"
import confetti from "canvas-confetti"
import { Square } from "./components/Square.jsx"
import { TURNS } from "./constants.js"
import { checkWinnerFrom } from "./logic/board.js"
import { WinnerModal } from "./components/WinnerModal.jsx"

// crear un arreglo de 9 posiciones y rellenar con null
// const board = Array(9).fill(null)

function App() {
  const [board,setBoard] = useState(Array(9).fill(null))

  const [turn,setTurn] = useState(TURNS.X)
  // null es que no hay ganador y false es que hay un empate
  const [winner,setWinner] = useState(null)

  const updateBoard = (index) => {

    if(board[index] || winner) return // si existe valor en el board[index] retornar ese mismo valor

    const newBoard = [...board] // copiar el arrego de manera superficial
    newBoard[index] = turn // x u o
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      setWinner(newWinner)
      confetti()
    } else if (checkEndGame(newBoard)) {
      setWinner(false) // empate
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const checkEndGame = (newBoard) => {
    // revisamos si hay un empate
    // si no ha espacios vacios en el tablero

    return newBoard.every((Square) => Square != null)
  }

  return(
    <main className="board">
      <h1>TIC TAC TOE</h1>
      <section className="game">
        {
          board.map((square,index) => {
            return(
              <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
              >
                {square}
              </Square>
            )
          })
        }
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
      <section>
        <WinnerModal winner={winner} resetGame={resetGame}/> 
      </section>
    </main>
  )
}

export default App
