const { useState, useEffect } = React
const { useNavigate, useParams, Link } = ReactRouterDOM

import { bookService } from "../services/book-service.js"

export function BookEdit() {

    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    const navigate = useNavigate()
    const { bookId } = useParams()


    useEffect(() => {
        if (!bookId) return
        loadBook()
    }, [])

    function loadBook() {
        bookService.get(bookId)
            .then((book) => setBookToEdit(book))
            .catch((err) => {
                console.log('Had issues in book details', err)
                navigate('/book')
            })
    }

    function handleChange({ target }) {
        let { value, type, name: field } = target
        // value = type === 'number' ? +value : value
        if (type === 'number')  value = {...bookToEdit.listPrice, amount: +value}
        setBookToEdit((prevBook) => ({ ...prevBook, [field]: value }))
    }

    function onSaveBook(ev) {
        ev.preventDefault()
        bookService.save(bookToEdit).then((book) => {
            // console.log('book saved', book);
            // showSuccessMsg('book saved!')
            navigate('/book')
        })
    }




    return <section className="book-edit">

        <h2>{bookToEdit.id ? 'Edit this Book' : 'Add a new Book'}</h2>
      

        <form onSubmit={onSaveBook}>
            <label htmlFor="title">Title: </label>
            <input type="text"
                name="title"
                id="title"
                placeholder="Enter book title..."
                value={bookToEdit.title}
                onChange={handleChange}
                required
            />
            <label htmlFor="Price">Price : </label>
            <input type="number"
                name="listPrice"
                id="Price"
                placeholder="Enter Price..."
                value={bookToEdit.listPrice.amount}
                onChange={handleChange}
                required
            />

            <div>
                <button>{bookToEdit.id ? 'Save' : 'Add'}</button>
                <Link to="/book">Cancel</Link>
            </div>
        </form>
    </section>
}