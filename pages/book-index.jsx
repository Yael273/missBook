const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { BookFilter } from "../cmps/book-filter.jsx"
import { BookList } from "../cmps/Book-list.jsx"

import { bookService } from "../services/book-service.js"
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js';

export function BookIndex() {

    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    const [books, setBooks] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy).then(books => {
            setBooks(books)
            setIsLoading(false)
        })
        
    }

    function onSetFilter(filterByFromFilter) {
        setFilterBy(filterByFromFilter)
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId).then(() => {
            const updatedBooks = books.filter(book => book.id !== bookId)
            setBooks(updatedBooks)
            showSuccessMsg('Book removed')
        })
        .catch((err) => {
            console.log('Had issues removing', err)
            showErrorMsg('Could not remove car, try again please!')
        })
    }


    if (!books) return <h1>loading...</h1>
    return <div className="book-index">

            <BookFilter onSetFilter={onSetFilter} />
            <Link to="/book/edit">Add Book</Link>

            {!isLoading &&  <BookList books={books} onRemoveBook={onRemoveBook}/>}
            {isLoading && <div>Loading..</div>}
            {!books.length && <div>No items to show..</div>}
       
       
    </div>
}