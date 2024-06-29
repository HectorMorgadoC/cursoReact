import { useState, useRef, useMemo, useCallback } from "react";
import { searchMovies } from "../services/movies";

export function useMovies ({ search, sort }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const previusSearch = useRef(search)

  const getMovies = useCallback(async ({ search }) => {
    if (search === previusSearch.current) return 

    try {
      setLoading(true)
      setError(null)
      previusSearch.current = search
      const newMovies = await searchMovies({ search })
      setMovies(newMovies)
    } catch(e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }
  ,[])

  const sortMovies = useMemo(() => {
    return  sort 
    ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
    : movies

  }, [sort, movies]) 
 
  return { movies: sortMovies, getMovies, loading, error} // este es el contrato del custom hook
}
/*
useMemo(calback,[dependencias])
sirve para memorizar un arreglo, un calculo computacional, y que solo cambiara
cuando alguna dependencias se positiva

useCallback es un useMemo solo que no usa el callback y su prioridad son las funciones
useCallback(funtion,[dependencias])

*/


/*
con useMemo
export function useMovies ({ search, sort }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const previusSearch = useRef(search)

  const getMovies = useMemo( () => {
    return async ({ search }) => {
    if (search === previusSearch.current) return 

    try {
      setLoading(true)
      setError(null)
      previusSearch.current = search
      const newMovies = await searchMovies({ search })
      setMovies(newMovies)
    } catch(e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }
}, [])

  const sortMovies = useMemo(() => {
    return  sort 
    ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
    : movies

  }, [sort, movies]) 
 
  return { movies: sortMovies, getMovies, loading, error} // este es el contrato del custom hook
}
*/


/*
coidgo antes de manejar la peticion desde directorio llamado 
services y un archivo movies.js


import { useState } from 'react'
// import withresult  from '../movies/withresult.json' 
import withoutResult from '../movies/withoutResult.json'

export function useMovies ({search}) {
  const [responseMovies, setResponseMovies] = useState([])
    const movies = responseMovies.Search
  
    const mappedMovies = movies?.map(movie => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster
    }))
  
    const getMovies = () => {
      if (search) {
        //setResponseMovies(withresult)
        fetch(`https://www.omdbapi.com/?apikey=8786c66b&s=${search}`)
          .then(response => response.json())
          .then(data => setResponseMovies(data))
      } else {
        setResponseMovies(withoutResult)
      }
    }

    return{ movies: mappedMovies, getMovies }
  }
  
*/

