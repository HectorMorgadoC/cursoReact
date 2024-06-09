import { useEffect,useState } from "react"
import './App.css'

// nota importante : no se puede usar un hook dentro de una condicional o un bucle
function App() {

  const [enabled,setEnabled] = useState(false)
  const [position,setPosition]  = useState({x:0,y:0})

  /*
  otro aporte importante en el hooks effect es que este se puede o mejor dicho se debe de limbiar con el retorno
  los eventos del don al usar en useEffects si no se limpian se monta uno sobre otro generando problemas
  para ver cuantas veces se monta un evento se usa getEventListener(window) en la consola del navegador
  */
  useEffect(() => {

    const handleMove = (event) => {
      const { clientX,clientY } = event
      // console.log('handlemove',{clientX,clientY})
      setPosition({x:clientX,y:clientY})
    }

    if(enabled){
      window.addEventListener('pointermove',handleMove)
    }

    // con el retorn se resetea el useEffect
    // esto se ejecuta cuando el componente se desmonta y cuando las dependencias cambian
    return () => {
      // con esto se remueve el evento 
      window.removeEventListener('pointermove',handleMove)
    }

  },[enabled])

  return (
    <main>
      <div style={{
        position: 'absolute',
        backgroundColor: '#09f',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents:'none',
        left: -20,
        top: -20,
        width: 40,
        height:40,
        transform: `translate(${position.x}px,${position.y}px)`
      }}>

      </div>
      <button onClick={() => setEnabled(!enabled)}>{enabled ? 'habilitado' : 'deshabiltado'} button</button>
    </main>
 
  )
}

export default App
