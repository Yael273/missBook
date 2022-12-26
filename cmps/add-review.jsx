const { useState, useEffect } = React
const { useNavigate, useParams, Link } = ReactRouterDOM


import { bookService } from "../services/book-service.js"
import { eventBusService, showSuccessMsg } from "../services/event-bus.service.js"


export function AddReview({ book }) {

    // console.log('book from addreview:', book);

    const [bookToReview, setBookToReview] = useState(bookService.getEmptyBook())
    const navigate = useNavigate()
    const { bookId } = useParams()

    console.log('bookToReview', bookToReview.fullName);
    console.log('bookToReview', bookToReview.rate);
    console.log('bookToReview', bookToReview.readAt);

    useEffect(() => {
        if (!bookId) return
        loadBook()
    }, [])

    function loadBook() {
        bookService.get(bookId)
            .then((book) => setBookToReview(book))
            .catch((err) => {
                console.log('Had issues in book details', err)
                navigate('/book')
            })
    }

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setBookToReview((prevReview) => ({ ...prevReview, [field]: value }))
    }

    function onSaveBookReview(ev) {
        ev.preventDefault()
        bookService.addReview(book.id, bookToReview).then((review) => {
            console.log('review saved', review);
            // showSuccessMsg('review saved!')
            // navigate('/book')
        })
    }


    return <section className="add-review">

        <h2>{'leave a review'}</h2>

        <form onSubmit={onSaveBookReview}>
            <label htmlFor="fullName">Full Name: </label>
            <input type="text"
                name="fullName"
                id="fullName"
                placeholder="Enter full name..."
                value={bookToReview.fullName}
                onChange={handleChange}
                required
            />
            <label htmlFor="rate">rate: </label>
            <input type="number"
                name="rate"
                id="rate"
                min='0'
                max='5'
                placeholder="Enter rating..."
                value={bookToReview.rate}
                onChange={handleChange}
                required
            />
            <label htmlFor="readAt">Visited at: </label>
            <input type="date"
                name="readAt"
                id="readAt"
                placeholder="Visited at..."
                value={bookToReview.readAt}
                onChange={handleChange}

            />

            <div>
                <button>{'Add'}</button>
            </div>
        </form>
    </section>
}