const { useEffect, useState } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

import { bookService } from "../services/book-service.js";
import { AddReview } from "./add-review.jsx";
import { Loader } from "./loader.jsx";
import { LongTxt } from "./long-txt.jsx";
import { utilService } from "../services/util.service.js"


export function BookDetails() {

    const [book, setBook] = useState(null)
    const params = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        loadBook()
    }, [])

    function loadBook() {
        bookService.get(params.bookId)
            .then((book) => setBook(book))
            .catch((err) => {
                console.log('Had issues in book details', err)
                navigate('/book')
            })
    }

    function onGoBack() {
        navigate('/book')
    }


    function pageCount() {
        return <div>
            <h5>{book.pageCount > 500 && 'Serious Reading'}</h5>
            <h5>{book.pageCount > 200 && !book.pageCount && 'Descent Reading'}</h5>
            <h5>{book.pageCount < 100 && 'Light Reading'}</h5>
        </div>
    }


    if (!book) return <Loader />
    return <section className="book-details">
        <img
            src={`${book.thumbnail}`}
            alt={book.title}
            onError={(e) => {
                e.target.onerror = null
                e.target.src = '/img/bookDefault.png'
            }}
        />
        <h1>{book.title}</h1>
        {pageCount()}
        <p>{book.publishedDate < 2012 && 'Vintage'} {book.publishedDate > 2012 && 'New'}</p>
        <LongTxt txt={book.description} length={100} />
        <h5 className={book.listPrice.amount > 150 ? 'red' : '' || book.listPrice.amount < 20 ? 'green' : ''}>{utilService.getAmount(book.listPrice.amount, book.listPrice.currencyCode)}</h5>
        <h4>{book.listPrice.isOnSale ? 'ON SALE!' : ''}</h4>
        <Link to={`/book/edit/${book.id}`}>Edit</Link>
        <button className="return" onClick={onGoBack}>return</button>
        <div>
            <AddReview book={book} />
        </div>
    </section>
}