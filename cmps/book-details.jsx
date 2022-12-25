

export function BookDetails({ book }) {

    console.log('book from details', book);
    return <section className="book-details">
        <h1>{book.title}</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque autem corporis esse fuga, distinctio illum eum optio recusandae saepe nisi accusamus? Soluta ducimus repudiandae maiores sint voluptate nemo id recusandae!</p>
    </section>
}