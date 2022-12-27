import { bookService } from "../services/book-service.js"

const { useState, useEffect } = React

export function BookAdd() {

    const API_KEY = 'AIzaSyAPZ0iGnif_nDL5PmQ2gyH4JUsUui78X0M'

    const [googkeBookToEdit, setgoogleBookToEdit] = useState(bookService.getEmptyBook())


    function handleChange(ev) {
        ev.preventDefault()

    }

    function onAddgoogleBook(bookId) {
        console.log(bookId);
        // if (bookToEdit.authors.length && bookToEdit.authors.includes(',')) bookToEdit.authors = bookToEdit.authors.split(',')
        // if (bookToEdit.categories.length && bookToEdit.categories.includes(',')) bookToEdit.categories = bookToEdit.categories.split(',')
        // if (!bookToEdit.thumbnail) bookToEdit.thumbnail = '../assets/img/default.jpg'
        bookService.save(googkeBookToEdit).then((book) => {
            console.log('book saved', book);
            // googkeBookToEdit.id ? showSuccessMsg('Book saved!') : showSuccessMsg('Book added!')
            // navigate('/book')
        }).catch((err) => {
            console.log('Had issues adding:', err)
            // showErrorMsg('Could not add book, try again please!')
        })

    }


    return <section className="book-add">
        <h1>hello</h1>
        <label onChange={handleChange}>
            <input type="search"
                placeholder="Search book to add" />
        </label>

        <ul className="google-books">
            {
                bookService.getGoogleBooks()[0].items.map(book => <li key={book.id}>
                    {book.volumeInfo.title}
                    <div>
                        <button onClick={() => onAddgoogleBook(book.id)}>+</button>
                    </div>
                </li>)
            }
        </ul>

    </section>
}
