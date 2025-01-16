import { Link } from "react-router-dom";

import CovITLogo from "../../../Assets/Images/CovITLogo.png";

function Home() {
  return (
    <>
      <main className="home_main">
          <figure className="home_figure">
            <Link to="/statistiques">
              <img src={CovITLogo} alt="Logo CovIT" />
              <figcaption>Accéder au site</figcaption>
            </Link>
          </figure>
      </main>
    </>
  );
}

export default Home;