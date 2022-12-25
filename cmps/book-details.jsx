

export function BookDetails({ book, onGoBack }) {

    console.log('book from details', book);
    return <section className="book-details">
        <h1>{book.title}</h1>
        <p>{book.description}</p>
        <button onClick={onGoBack}>return</button>
    </section>
}