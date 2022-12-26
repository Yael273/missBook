const Router = ReactRouterDOM.HashRouter
const { Route, Routes } = ReactRouterDOM
const { useState } = React

import { Home } from './pages/home.jsx'
import { AboutUs } from './pages/about-us.jsx'
import { BookIndex } from './pages/book-index.jsx'
import { AppHeader } from './cmps/app-header.jsx'
import { AboutUsIndex } from './cmps/about-us-index.jsx'
import { BookDetails } from './cmps/book-details.jsx'
import { BookEdit } from './cmps/book-edit.jsx'
import { UserMsg } from './cmps/user-msg.jsx'

export function App() {

    return <Router>

        <section className="app">

            <AppHeader />

            <main>
                <Routes>
                    <Route element={<Home />} path="/" />
                    <Route element={<AboutUs />} path="/about">
                        <Route element={<AboutUsIndex />} path="/about" />
                    </Route>

                    <Route element={<BookIndex />} path="/book" />
                    <Route element={<BookDetails />} path="/book/:bookId" />
                    <Route element={<BookEdit />} path="/book/edit" />
                    <Route element={<BookEdit />} path="/book/edit/:bookId" />

                </Routes>
            </main>

            <footer>
                All rights reserved
            </footer>
            <UserMsg />
        </section>
    </Router>
}