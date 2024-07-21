import { useState, useId } from 'react'
import './Filters.css'

// eslint-disable-next-line react/prop-types
export function Filters ( { onFilters } ) {

    /* 
    el useId es un identificador unico que no cambiara en todo el programa 
    */
    const [minPrice,setMinPrice] = useState(0)
    const minPriceFilterId = useId()
    const categoryFilterId = useId()

    const handleChangeMinPrice = (event) => {
        setMinPrice(event.target.value)
        
        onFilters(prevState => ({
            ...prevState,
            minPrice: event.target.value
        }))
            
    }

    
    return (
        <section className="filters">
            <div>
                <label htmlFor={minPriceFilterId}>Price</label>
                <input 
                type="range"
                id={minPriceFilterId}
                min="0"
                max="1000"
                onChange={handleChangeMinPrice}
                />
                <span>${minPrice}</span>
            </div>
        <div>
            <label htmlFor={categoryFilterId}>Categoria</label>
            <select id={categoryFilterId}>
                <option value="all">todas</option>
                <option value="laptops">Computadadoras</option>
                <option value="smarphones">Mobiles</option>
            </select>
        </div>
        </section>
    )
}