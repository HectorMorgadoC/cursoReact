import './App.css'
import { useEffect, useState } from 'react'

function App() {

const [ number, setNumber ] = useState(0)

const aumento = () => {
  setNumber( number + 1 )
}

const decremento = () => {
  setNumber ( number - 1)
}

useEffect(() => {
  console.log(number)
},[number])


  return (
    <>
      <h1>hola mundo</h1>
      <button onClick={aumento}>Incremento</button>
      <button onClick={decremento}>decremento</button>
      <h2 style={{
        backgroundColor: 'black',
        color: 'while'
      }}>{number > 10 ? number + ' mayor' : number + ' menor'}</h2>
    </>
    

  )
}

export default App
