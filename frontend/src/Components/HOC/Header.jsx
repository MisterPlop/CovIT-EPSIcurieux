import { Link, NavLink, useLocation } from "react-router-dom";

function Header() {


    const { pathname } = useLocation(); // sert à changer la classname du header en fonction de l'url (page d'accueil ou reste du site)

    return (
        <>
            <header className={pathname === "/" ? "hidden" : "navigation_header"}>

                <figure className="header_figure">
                    <Link to="/stats">
                        <img src="LogoCovIT.png" alt="Logo CovIT" />
                        <figcaption className="figcaption-c">C</figcaption>
                        <figcaption className="figcaption-vit">VIT</figcaption>
                    </Link>
                </figure>
                <nav>
                    <NavLink to="/stats">Stats</NavLink>
                    <NavLink to="/ajouter_des_donnees">Add data</NavLink>
                </nav>
            </header>
        </>
    );
}

export default Header;