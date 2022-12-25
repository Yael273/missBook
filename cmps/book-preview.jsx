import { BookDetails } from "./book-details.jsx"

export function BookPreview({ book }) {

    return <article className="book-preview">
        {/* <img src={`https://robohash.org/${book.id}?set=set5`} alt="" /> */}
        <img
            src={`img/${book.title}.jpg`}
            alt={book.title}
            onError={(e) => {
                e.target.onerror = null
                e.target.src = '/img/bookDefault.png'
            }}
        />
        <h2>{book.title}</h2>
        <h3>{book.listPrice}</h3>

    </article>
}