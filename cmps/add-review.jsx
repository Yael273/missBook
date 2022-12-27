const { useState } = React

import { bookService } from "../services/book-service.js"


export function AddReview({ onSaveReview }) {

    const [review, setReview] = useState(bookService.getDefaultReview())
    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = type === "range" ? +value : value
        setReview((prevReview => {
            return { ...prevReview, [field]: value }
        }))
    }

    function onSubmitReview(ev) {
        ev.preventDefault()
        onSaveReview(review)
    }

    return <article className="add-review">
    <h2>Rate this book</h2>
    <form onSubmit={onSubmitReview}>
        <label htmlFor="full-name">Full name:</label>
        <input type="text"
            id="full-name"
            name="fullName"
            placeholder="Enter full name..."
            value={review.fullName}
            onChange={handleChange} />

        <label htmlFor="rating">Rate this book:</label>
        <input type="number"
            id="rating"
            max="5"
            min="0"
            name="rating"
            value={review.rating}
            title={review.rating}
            onChange={handleChange}
        />

        <label htmlFor="readAt">Read at:</label>
        <input type="date"
            id="readAt"
            name="readAt"
            value={review.readAt}
            onChange={handleChange} />

        <button>Submit</button>
    </form>
</article>
}