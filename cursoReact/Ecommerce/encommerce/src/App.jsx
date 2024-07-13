import { Products } from "./products.jsx"
import { Header } from "./componets/header.jsx"
import { products as initialProducts } from "./mocks/products.json"
import { useState } from "react"
function App() {
  const [products] = useState(initialProducts)
  const [filters,setFilters] = useState({
    category: 'all',
    minPrice: 0
  })
  const filterProducts = (products) => {
    return products.filter(product => {
      return (
        product.price >= filters.minPrice && (
          filters.category === 'all' ||
          filters.category === filters.category
        )
      )
    })
  }
  return(
    <>
    <Header changeFilters={setFilters}/>
    <Products products = { filterProducts(products) } />    
    </>
  )
}
export default App

// minuto : 32:54
