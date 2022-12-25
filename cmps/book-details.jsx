import { LongTxt } from "./long-txt.jsx";


export function BookDetails({ book, onGoBack }) {


    function pageCount() {
        return <div>
            <h5>{book.pageCount > 500 && 'Serious Reading'}</h5>
            <h5>{book.pageCount > 200 && !book.pageCount && 'Descent Reading'}</h5>
            <h5>{book.pageCount < 100 && 'Light Reading'}</h5>
        </div>
    }

    console.log('book from details', book);

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
        <LongTxt txt={book.description} length={book.description.length} />
        <h5 className={book.listPrice.amount > 150 ? 'red' : '' || book.listPrice.amount < 20 ? 'green' : ''}>{book.listPrice.amount} {book.listPrice.currencyCode}</h5>
        <h4>{book.listPrice.isOnSale ? 'On Sale' : ''}</h4>
        <button className="return" onClick={onGoBack}>return</button>
    </section>
}