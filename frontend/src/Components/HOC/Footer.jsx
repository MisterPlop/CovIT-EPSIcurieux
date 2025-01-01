import { useLocation , Link } from "react-router-dom";

function Footer() {

    const { pathname } = useLocation();
    
    return (
        <>
            <footer className={pathname === "/" ? "hidden" : "navigation_footer"}>
                <Link to="/cgu">Mentions Légales</Link>
                <h1 className="copyright">@2025, CovIT</h1>
            </footer>

        </>
    );
}

export default Footer;