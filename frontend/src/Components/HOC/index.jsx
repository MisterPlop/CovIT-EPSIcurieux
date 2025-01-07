import { useLocation } from "react-router-dom";

import Header from './Header'
import Footer from './Footer'
import Title from "../Title";

function HOC({ child, title }) {

    const Child = child;

    const { pathname } = useLocation();

    return (
        <div id={pathname === "/" ? "home_body" : ""}>

            <Header />

            <main className="navigation_main">
                <Title title={title} />
                <Child />
            </main>

            <Footer />


        </div>
    );
}

export default HOC;