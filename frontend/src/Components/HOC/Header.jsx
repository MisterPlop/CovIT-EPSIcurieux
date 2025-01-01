import { NavLink, useLocation } from "react-router-dom";

function Header() {


    const { pathname } = useLocation(); // sert à changer la classname du header en fonction de l'url (page d'accueil ou reste du site)

    return (
        <>
            <header className={pathname === "/" ? "hidden" : "navigation_header"}>
                <NavLink to="/"><img src="CovITlogo.png" alt="Logo CovIT" /></NavLink>
                <nav>
                    <NavLink to="/stats">Stats</NavLink>
                    <NavLink to="/ajouter_des_donnees">Add data</NavLink>
                </nav>
            </header>
        </>
    );
}

export default Header;