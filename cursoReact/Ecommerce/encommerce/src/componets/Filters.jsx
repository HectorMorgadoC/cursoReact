import { useState } from 'react'
import './Filters.css'

// eslint-disable-next-line react/prop-types
export function Filters ( { onFilters } ) {
    const [minPrice,setMinPrice] = useState(0)

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
                <label htmlFor="price">Price</label>
                <input 
                type="range"
                id="price"
                min="0"
                max="1000"
                onChange={handleChangeMinPrice}
                />
                <span>${minPrice}</span>
            </div>
        <div>
            <label htmlFor="category">Categoria</label>
            <select id="category">
                <option value="all">todas</option>
                <option value="laptops">Computadadoras</option>
                <option value="smarphones">Mobiles</option>
            </select>
        </div>
        </section>
    )
}