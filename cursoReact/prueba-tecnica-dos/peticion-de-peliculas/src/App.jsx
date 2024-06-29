import './App.css'
// import responseMovies from './movies/withresult.json'
// instalar una dependencias para debounce npm install just-debounce-it -E
import { Movie } from './components/Movies'
import { useMovies } from './hooks/movies'
import { useEffect, useState, useRef, useCallback} from 'react'
// import withoutResult from './movies/withoutResult.json'
import debounce from 'just-debounce-it'
/* IMPORTANTE: SI SE VA A USAR HOOK PARA SEPARAR LOGICA LO MEJOR ES CREAR UN CUSTOM HOOK SI NO SE PUEDE SEPARAR
EN UN MODULO
 */



/*
como mejorar esto??
<main>
        {
          moviesHas ? (
            <ul>
              {
                movies.map(movie => (
                  <li key={movie.imdbID}>
                    <h3>{movie.Title}</h3>
                    <p>{movie.Year}</p>
                    <img src={movie.Poster} alt={movie.Title} />
                  </li>
                ))
              }
            </ul>
          )
          :
          (
            <p>NO se encontro pelicula</p>
          )
        }
      </main>
*/
function useSearch () {
    const [search, updateSearch] = useState('')
    const [error, setError] = useState('')
    const isFirstInput = useRef(true)

    useEffect(() => {

        if (isFirstInput.current) {
            isFirstInput.current = search === ''
            return
        }

        if (search === '') {
            setError('No se puede buscar una pelicula vacia')
            return
        }

        if (search.match(/^\d+$/)) {
            setError('La busqueda debe tener al menos 3 caracteres')
            return
        }

        if (search.length < 3) {
            setError('La busqueda debe tener al menos 3 caracteres')
            return
        }

        setError(null)
        },[search])

    return { search, updateSearch, error}
}

function App() {
    const [ sort, setSort ] = useState(false)

    const { search, updateSearch, error } = useSearch()
    const { movies : sortMovies , getMovies, loading } = useMovies({search, sort})

    const debouncedGetMovies = useCallback(
     debounce(search => {
        getMovies({ search })
    }, 500)
    ,[getMovies]
    )
  
    const handleSubmit = (event) => {
        event.preventDefault()

        getMovies({ search })
    }

    const handleChange = (event) => {
        // asi tendra una busqueda automatica
        const newSearch = event.target.value 
        updateSearch(newSearch)
        debouncedGetMovies(newSearch)
        // sin debounce getMovies({ search: newSearch})
        // asi la busqueda sera normal
        /*updateSearch(event.target.value) */
    }
  
    const handlesort = () => {
        setSort(!sort)
    }

  return(
    <div className='page'>
      <header>
        <h1>Buscador de peliculas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input  onChange={handleChange} value={search} name='query' placeholder='Avengers, Star Wars, The matrix' />
         <input type='checkbox' onChange={handlesort} checked={sort}/>
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{ color: 'red'}}>{error}</p>}
      </header>
      <main>
        {
            loading ? <p>Cargando... </p> : < Movie movies={ sortMovies } />
        }
      </main>
  </div>
  )  
}

export default App

 // current es un metodo nativo de react para optener valores
    /*
    / Los useRef solo se renderizan una vez
     const handleSubmit = (event) => {
  
        event.preventDefault()
        const inputEl = inputRef.current
        const value = inputEl.value 
        console.log(value)
  }

    en este caso inputRef esta haciendo referencia al input del componente
    <input ref={inputRef} placeholder='Avengers, Star Wars, The matrix'/>
    y por medio del current se puede obter su valor, es parecido al querySelector del DOM

    esto tambien se puede hacer de la manera en que se usaria en vanilla
    const HandSubmit = (event) => {
      event.preventDefault()
      const fields = new window.FormData(event.target)
      const query = fields.get('query')

      <input name='query' placeholder='Avengers, Star Wars, The matrix'/>
      }
    NOTA: importante en vanill javascript y el DOM
    cuando se tiene un formulario con variaa entradas el target es muy util 
    se puede mostrar en este ejemplo
    
    const HandSubmit = (event) => {
      event.preventDefault()
      const fields = Object.formsEntries(new window.FormData(event.target))
      console.log(fields)  esto guardara en un objeto los valores de cada una de los inputs dentro de un formulario

      <input name='query' placeholder='Avengers, Star Wars, The matrix'/>
      }
    NOTA : esto tanto como el useRef() en react como el FormData en javascript vanilla se le llama obtener datos no controlados

    hacerlo de manera controlada con react y vanilla

  const [ query, setQuery ] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log({query})
    }

  const handleChange = (event) => {
    setQuery(event.target.value)
    }

    <input onChange={handleChange} value={query} name='query' placeholder='Avengers, Star Wars, The matrix'/>

    NOTA: la desventaja de usar esto es qu cada vez que actualizes el input asi no entre el submit
    se rendiriza el componente y esto hace que el sitio sea mas lento, pero la ventaja es que de esta manera 
    se puede validar el formulario de mejor manera que de manera no controlada.

    Una manera de estilar los errores si existe un error 
    <input style = {{ border: '1px solid transparent'}, borderColor: error ? 'red' : 'transparent'}/>

    */