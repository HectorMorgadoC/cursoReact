import { createContext } from "react";
import { useState } from "react";
// los useContext sirven para hacer estados globales

// este es el que debemos consumir
// 1. crear el contexto
export const FiltersContext = createContext()

// este es el que nos provee el acceso
// 2 crear el provider para proveer el contexto
// eslint-disable-next-line react/prop-types
export function FiltersProvider ({children}) {
    const [filters,setFilters] = useState({
    category: 'all',
    minPrice: 0
    })
    return (
        <FiltersContext.Provider value={{
            filters,
            setFilters
        }}
        >
            {children}
        </FiltersContext.Provider>
    )
}