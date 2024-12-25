import { useLocation , Link } from "react-router-dom";

function Footer() {

    const { pathname } = useLocation();
    
    return (
        <>
            <footer className={pathname === "/" ? "hidden" : "navigation_footer"}>
                    <Link to="/cgu">Mentions Légales</Link>
                <p className="copyright">@2025, CovIT</p>
            </footer>

        </>
    );
}

export default Footer;