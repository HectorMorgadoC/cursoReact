import './App.css'
// import responseMovies from './movies/withresult.json'
import { Movie } from './components/Movies'
import { useMovies } from './hooks/movies'
// import withoutResult from './movies/withoutResult.json'

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


function App() {
  const { movies: mappedMovies } = useMovies()
  
  return(
    <div className='page'>
      <header>
        <h1>Buscador de peliculas</h1>
        <form className='form'>
          <input placeholder='Avengers, Star Wars, The matrix'/>
          <button type='submit'>Buscar</button>
        </form>
      </header>
      <main>
        < Movie movies={ mappedMovies } />
      </main>
  </div>
  )  
}

export default App
