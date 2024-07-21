import "./Footer.css"
// esto nos puede servir para crear un debbuger de estado y ver cuando se ejecutan y cuando no
// eslint-disable-next-line react/prop-types
export function Footer ({ filters }) {
    return (
        <footer className="footer">
            {
                JSON.stringify(filters,null,2)
            }
        </footer>
    )
}