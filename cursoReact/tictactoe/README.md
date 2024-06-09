# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

el key en los componectes es el indentificador unico del mismo
tic tac toe (primera fase)

const TURNS = {
  X:'x',
  O:'o'
}

const Square = ({ children, updateBoard, index}) => {
  return (
    <div className="square">
      {children}
    </div>
  )
}


// crear un arreglo de 9 posiciones y rellenar con null
const board = Array(9).fill(null)

function App() {
  return(
    <main className="board">
      <h1>TIC TAC TOE</h1>
      <section className="game">
        {
          board.map((_,index) => {
            return(
              <Square
              key={index}
              index={index}
              >
                {index}
              </Square>
            )
          })
        }
      </section>
    </main>
  )
}

export default App

tic tac toe( segunda fases )

import { useState } from "react"

const TURNS = {
  X:'x',
  O:'o'
}

const Square = ({ children, isSelected,updateBoard, index}) => {
  const  className = `square ${isSelected ? 'is-selected' : ''}`
  
  const handleClick = () => {
    updateBoard(index)
  }
  
  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

// NOTA MUY IMPORTANTE: LA ACTUALIZACION DE ESTADOS EN REACT SON ASINCRONOS
const WINNER_COMBOS = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0.3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]

// crear un arreglo de 9 posiciones y rellenar con null
// const board = Array(9).fill(null)

function App() {
  const [board,setBoard] = useState(Array(9).fill(null))

  const [turn,setTurn] = useState(TURNS.X)

  // null es que no hay ganador y false es que hay un empate
  const [winner,setWinner] = useState(null)


  const checkWinner = (boardToCheck) => {
    // revisamos todas las combinaciones ganadoras
    // para ver si X u O gano
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if(
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a]
      }
    }

    return null
  }


  const updateBoard = (index) => {

    if(board[index] || winner) return // si existe valor en el board[index] retornar ese mismo valor

    const newBoard = [...board] // copiar el arrego de manera superficial
    newBoard[index] = turn // x u o
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  return(
    <main className="board">
      <h1>TIC TAC TOE</h1>
      <section className="game">
        {
          board.map((_,index) => {
            return(
              <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
              >
                {board[index]}
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
        {
          winner != null && (
            <section className="winner">
              <div className="text">
                <h2>
                  {
                    winner === false
                    ? 'EMPATE'
                    : 'GANO:'
                  }
                </h2>

                <header className="win">
                  {winner && <Square>{winner}</Square>}
                </header>

                <footer>
                  <button onClick={resetGame}>Empezar de nuevo</button>
                </footer>

              </div>
            </section>
          )
        }
      </section>

    </main>
  )
}

export default App

tic tac toe( tercera fase )
import { useState } from "react"
import confetti from "canvas-confetti"



const TURNS = {
  X:'x',
  O:'o'
}

const Square = ({ children, isSelected,updateBoard, index}) => {
  const  className = `square ${isSelected ? 'is-selected' : ''}`
  
  const handleClick = () => {
    updateBoard(index)
  }
  
  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

// NOTA MUY IMPORTANTE: LA ACTUALIZACION DE ESTADOS EN REACT SON ASINCRONOS
const WINNER_COMBOS = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0.3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]

// crear un arreglo de 9 posiciones y rellenar con null
// const board = Array(9).fill(null)

function App() {
  const [board,setBoard] = useState(Array(9).fill(null))

  const [turn,setTurn] = useState(TURNS.X)

  // null es que no hay ganador y false es que hay un empate
  const [winner,setWinner] = useState(null)


  const checkWinner = (boardToCheck) => {
    // revisamos todas las combinaciones ganadoras
    // para ver si X u O gano
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if(
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a]
      }
    }

    return null
  }


  const updateBoard = (index) => {

    if(board[index] || winner) return // si existe valor en el board[index] retornar ese mismo valor

    const newBoard = [...board] // copiar el arrego de manera superficial
    newBoard[index] = turn // x u o
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    const newWinner = checkWinner(newBoard)
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
        {
          winner != null && (
            <section className="winner">
              <div className="text">
                <h2>
                  {
                    winner === false
                    ? 'EMPATE'
                    : 'GANO:'
                  }
                </h2>

                <header className="win">
                  {winner && <Square>{winner}</Square>}
                </header>

                <footer>
                  <button onClick={resetGame}>Empezar de nuevo</button>
                </footer>

              </div>
            </section>
          )
        }
      </section>

    </main>
  )
}

export default App

tic tac toe( cuarta fase )

app.jsx
import { useEffect, useState } from "react"
import confetti from "canvas-confetti"
import { Square } from "./components/Square.jsx"
import { TURNS } from "./constants.js"
import { checkWinnerFrom,checkEndGame } from "./logic/board.js"
import { WinnerModal } from "./components/WinnerModal.jsx"


// NOTA IMPORTANTE: los useState nunca se pueden usar dentro de condicionales no bucles

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

