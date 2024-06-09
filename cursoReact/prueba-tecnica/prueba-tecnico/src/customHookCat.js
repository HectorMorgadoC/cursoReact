import { useState, useEffect } from 'react'

// customHook : son hook personalizados
// nota: al contruir una funcion vanilla no se puede usar hooks de react pero al crear un
// customHooks si se pueden usar los hooks de react
export function useCatHooks ({ fast }) {
  const [idImage, setIdImage] = useState()
  useEffect(() => {
    if (!fast) return
    const firsWord = fast.split(' ')[0]
    console.log(firsWord)
    fetch(`https://cataas.com/cat/says/${firsWord}?size=50&color=red&json=true`)
      .then(response => response.json())
      .then(data => {
        const { _id } = data
        setIdImage(_id)
      })
  }, [fast])
  return { idImage }
}
