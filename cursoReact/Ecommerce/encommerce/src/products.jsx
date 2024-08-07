/* eslint-disable react/prop-types */
import './Products.css'
import { AddToCartIcon } from './componets/Icons.jsx'

// eslint-disable-next-line react/prop-types
export function Products ({ products }) {
    if (!Array.isArray(products)) {
        return <p>No existen los datos.</p>
    }
    return (
        <main className='products'>
            <ul>
                { products.map((product) => (
                    <li key={ product.id }>
                        <img src={ product.thumbnail } alt={product.title} />
                        <div>
                            <strong>{product.title}</strong> - ${product.price}
                        </div>
                        <div>
                            <button>
                                <AddToCartIcon />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </main>
    )
}