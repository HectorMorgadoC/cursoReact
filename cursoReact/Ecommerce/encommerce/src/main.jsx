import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { FiltersProvider } from './context/Filters.jsx'


// en vez de usar el React.StrictMode se usa el useContext creado en este caso FiltersContext.Provider 
ReactDOM.createRoot(document.getElementById('root')).render(
 < FiltersProvider>
   <App />
 </FiltersProvider> 
)
