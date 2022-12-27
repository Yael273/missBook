const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { BookAdd } from "../cmps/book-add.jsx"
import { BookFilter } from "../cmps/book-filter.jsx"
import { BookList } from "../cmps/Book-list.jsx"
import { Loader } from "../cmps/loader.jsx"

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


    function onAddGoogleBook(book) {
        console.log(book);
        const addBook = bookService.addGoogleBook(book)
        // if (bookToEdit.authors.length && bookToEdit.authors.includes(',')) bookToEdit.authors = bookToEdit.authors.split(',')
        // if (bookToEdit.categories.length && bookToEdit.categories.includes(',')) bookToEdit.categories = bookToEdit.categories.split(',')
        // if (!bookToEdit.thumbnail) bookToEdit.thumbnail = '../assets/img/default.jpg'
        console.log('book after', addBook);
        if(books.find(book => book.title === addBook.title)) return showErrorMsg('Book already in list')
        bookService.save(addBook).then((book) => {
            console.log('book saved', book);
            books.push(book)
            setBooks(books.slice())
            showSuccessMsg('Book saved!')
        }).catch((err) => {
            console.log('Had issues adding:', err)
            showErrorMsg('Could not add book, try again please!')
        })

    }



    if (!books) return <Loader />
    return <div className="book-index">

        <BookFilter onSetFilter={onSetFilter} />
        <Link to="/book/edit" className="add-book">Add Book</Link>
        <BookAdd onAddGoogleBook={onAddGoogleBook} />

        {!isLoading && <BookList books={books} onRemoveBook={onRemoveBook} />}
        {isLoading && <Loader />}
        {!books.length && <div>No items to show..</div>}



    </div>
}