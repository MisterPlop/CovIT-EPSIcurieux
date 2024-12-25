import { Link, NavLink, useLocation } from "react-router-dom";

function Header() {


    const { pathname } = useLocation(); // sert à changer la classname du header en fonction de l'url (page d'accueil ou reste du site)

    return (
        <>
            <header className={pathname === "/" ? "hidden" : "navigation_header"}>

                <div className="header_width">
                    <Link to="/">
                        <div className="divlogo">
                            <img src="LogoCovIT.png" alt="Logo CovIT" />
                            <h1>CovIT</h1>
                        </div>
                    </Link>
                </div>
                <nav>s
                    <NavLink to="/stats">Stats</NavLink>
                    <NavLink to="/ajouter_des_donnees">Add data</NavLink>
                </nav>
            </header>
        </>
    );
}

export default Header;