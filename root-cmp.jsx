
const { useState } = React

import { Home } from './pages/home.jsx'
import { AboutUs } from './pages/about-us.jsx'
import { BookIndex } from './pages/book-index.jsx'

export function App() {
    const [page, setPage] = useState('book')


    return <section className="app">
        <header className="app-header">
            <h1>Miss Book</h1>
            <nav className="app-nav">
                <a href="#" onClick={() => setPage('home')}>Home</a>
                <a href="#" onClick={() => setPage('about')}>About</a>
                <a href="#" onClick={() => setPage('book')}>Books</a>
            </nav>
        </header>
        <main>
            {page === 'home' && <Home />}
            {page === 'about' && <AboutUs />}
            {page === 'book' && <BookIndex />}
        </main>
        <footer>
            All rights reserved
        </footer>
    </section>
}