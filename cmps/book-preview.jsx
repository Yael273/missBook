

export function BookPreview({ book }) {

    console.log('book preview', book);

    return <article className="book-preview">
        {/* <img src={`https://robohash.org/${book.id}?set=set5`} alt="" /> */}
        <img
            src={`${book.thumbnail}`}
            alt={book.title}
            onError={(e) => {
                e.target.onerror = null
                e.target.src = '/img/bookDefault.png'
            }}
        />
        <h3>{book.title}</h3>
        <p>{book.listPrice.amount} {book.listPrice.currencyCode}</p>

    </article>
}