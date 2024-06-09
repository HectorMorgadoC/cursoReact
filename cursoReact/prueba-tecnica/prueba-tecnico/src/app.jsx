import { useEffect, useState } from 'react'
import { getRandomFact } from './facts.js'
import { useCatHooks } from './customHookCat.js'

export function App () {
  // const CAT_ENDPOINT_FACT_URL = 'https://catfact.ninja/fact'
  // const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${firsWord}?size=50&color=red&json=true`

  const [fast, setFast] = useState()

  useEffect(() => {
    getRandomFact().then(setFast) // aqui se resume lo siguiente .then(newFast => setFast(newFast))
  }, [])

  const reset = async () => {
    const newFact = await getRandomFact()
    setFast(newFact)
  }
  const { idImage } = useCatHooks({ fast })

  return (
    <>
      <button onClick={reset}>refresh</button>
      <h1>Aplicacion de gatos</h1>
      {fast && <p>{fast}</p>}
      {idImage && <h2>{idImage}</h2>}
      <img src={`https://cataas.com/cat/says/${idImage}`} alt='cat' />
    </>

  )
}
