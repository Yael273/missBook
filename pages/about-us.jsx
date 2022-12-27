const { Outlet, Link } = ReactRouterDOM

export function AboutUs() {

    return <div className="about-us">
        <h1>
            about us
        </h1>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil corporis minima, blanditiis voluptate animi cum, quis in, iste consequatur corrupti aspernatur sapiente ducimus? Molestias libero officia vitae magnam veniam illo.</p>
        <nav>
            <Link to="/about">Index</Link> |
            <Link to="/about/team">Team</Link>
        </nav>
        <div className="nested-route">
            <Outlet />
        </div>
    </div>
}