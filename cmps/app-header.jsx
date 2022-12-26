const { Link, NavLink } = ReactRouterDOM

export function AppHeader({ setPage }) {

    return <header className="app-header">
    <h1>Miss Book</h1>
    <nav className="app-nav">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/book">Book</NavLink>
        <NavLink to="/about">About</NavLink>
    </nav>
</header>
}

