import { useEffect, useState } from "react"
import confetti from "canvas-confetti"
import { Square } from "./components/Square.jsx"
import { TURNS } from "./constants.js"
import { checkWinnerFrom,checkEndGame } from "./logic/board.js"
import { WinnerModal } from "./components/WinnerModal.jsx"


// NOTA IMPORTANTE: los useState nunca se pueden usar dentro de condicionales no 

// NOTA standard js es el linter para los standares de javascript 
//npm install standard --global

// el leer del localstorage es lento hay que tener mucho cuidado al renderizar
// crear un arreglo de 9 posiciones y rellenar con null
// const board = Array(9).fill(null)



function App() {
  const [board,setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if(boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  })

  const [turn,setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turns')
    return turnFromStorage ?? TURNS.X 
  })
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

window.localStorage.setItem('board',JSON.stringify(newBoard))
window.localStorage.setItem('turn',newTurn)

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


  /* este hooks se usa en el cuerpo de un componente y este ejecutara un codigo albitrario, cuando 
  el componente se renderiza , si no se le coloca dependencias este se ejecutara cada vez que se renderize
  el componente , de lo contrario se ejecutara cada vez que las dependencias se lo permitan

  useEffect(callback que ejecuta el cidigo arbitario, arreglo donde van las dependencias (opcional))

  */
  useEffect(() => {
    console.log('useEffect')
  } )

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
