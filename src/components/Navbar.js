function Navbar() {
    return (<div style={{"width": "100%", "left": 0, marginBottom: "10vh"}}>

        <nav className="navbar  navbar-expand-lg navbar-dark bg-primary">
            <a className="navbar-brand" href={"/list"}>Facial Recognition</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
                    aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href={"/recon"}>Register face</a>
                    </li>
                    <li className="nav-item active">
                        <a className="nav-link" href={"/recognize"}>Recognize</a>
                    </li>
                    <li className="nav-item active">
                        <a className="nav-link" href={"/logout"} onClick={() => {
                            fetch("/logout")
                        }}>logout</a>
                    </li>
                </ul>
                <span className="navbar-text">
<a href="https://github.com/israelpaez14/FacialKeyFrontend">
    https://github.com/israelpaez14/FacialKeyFrontend


</a>
    </span>
            </div>
        </nav>
    </div>)
}

export default Navbar;