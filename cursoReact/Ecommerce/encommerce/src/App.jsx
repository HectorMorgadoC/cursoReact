import { Products } from "./products.jsx"
import { Header } from "./componets/header.jsx"
import { products as initialProducts } from "./mocks/products.json"
import { useContext, useState } from "react"
import { Footer } from "./componets/Footer.jsx"
import { IS_DEVELOPMENT } from "./config.js"
import { FiltersContext } from "./context/Filters.jsx"

function useFilters () {
  const { filters, setFilters } = useContext(FiltersContext)

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
return { filters,filterProducts,setFilters }
}

function App() {
  const [products] = useState(initialProducts)
  const { filters ,filterProducts,setFilters } = useFilters()
  const filteredProducts = filterProducts(products)

  return(
    <>
    <Header changeFilters={setFilters}/>
    <Products products = { filteredProducts } />  
    {IS_DEVELOPMENT && < Footer filters={filters}/>}  
    </>
  )
}
export default App

// minuto : 32:54
