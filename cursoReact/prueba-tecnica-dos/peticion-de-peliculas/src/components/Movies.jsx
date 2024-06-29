/* eslint-disable react/prop-types */


export function ListOfMOvies ({ movies }){
    // este componente esta dependiendo del contrato de la API
    return(
        <ul className="movies">
          {
            movies.map(movie => (
              <li className="movie" key={movie.id}>
                <h3>{movie.title}</h3>
                <p>{movie.year}</p>
                <img src={movie.poster} alt={movie.Title} />
              </li>
            ))
          }
        </ul>
      )
}

export function NoResutlMovies () {
    return(
        <p>NO se encontro pelicula</p>
      )
}

export function Movie ({ movies }) {
    const moviesHas = movies?.length > 0
    return(
        moviesHas
        ? <ListOfMOvies movies={movies} />
        : <NoResutlMovies />
    )
}