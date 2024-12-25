import { useLocation } from "react-router-dom";

import Header from './Header'
import Footer from './Footer'

function HOC({ child }) {

    const Child = child;

    const { pathname } = useLocation();

    return (
        <div id={pathname === "/" ? "home_body" : ""}>

            <Header />

            <main className="navigation_main">
                <Child />
            </main>

            <Footer />


        </div>
    );
}

export default HOC;