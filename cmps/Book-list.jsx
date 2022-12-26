const { Link } = ReactRouterDOM

import { BookPreview } from "../cmps/book-preview.jsx";

export function BookList({ books, onRemoveBook, onSelectBook }) {

    // console.log('books', books);

    return <ul className="book-list">
        {
            books.map(book => <li key={book.id}>
                <BookPreview book={book} />
                <div>
                    <button onClick={() => onRemoveBook(book.id)}>Remove</button>
                    <Link to={`/book/${book.id}`}>Select</Link>
                </div>
            </li>)
        }
    </ul>
}