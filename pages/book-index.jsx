const { useState, useEffect } = React

import { BookDetails } from "../cmps/book-details.jsx"
import { BookFilter } from "../cmps/book-filter.jsx"
import { BookList } from "../cmps/Book-list.jsx"
import { bookService } from "../services/book-service.js"

export function BookIndex() {

    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    const [books, setBooks] = useState([])
    const [selectedBook, setSelectedBook] = useState(null)

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy).then(books => setBooks(books))
    }

    function onSetFilter(filterByFromFilter) {
        setFilterBy(filterByFromFilter)
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId).then(() => {
            const updatedBooks = books.filter(book => book.id !== bookId)
            setBooks(updatedBooks)
            // flashMsg('Book removed!')
        })
    }

    function onSelectBook(bookId){
        bookService.get(bookId).then((book) => {
            setSelectedBook(book)
        })
    }


    return <div className="book-index">
        {!selectedBook && <div>
            <h1>book index </h1>
            <BookFilter onSetFilter={onSetFilter} />
            <BookList books={books} onRemoveBook={onRemoveBook} onSelectBook={onSelectBook}/>
        </div>
        }
        {selectedBook && <BookDetails book={selectedBook}/>}
    </div>
}