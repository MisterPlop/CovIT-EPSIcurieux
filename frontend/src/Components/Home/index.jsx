import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <main className="home_main">

          <figure className="home_figure">
            <Link to="/stats">
              <img src="LogoCovIT.png" alt="Logo CovIT" />
              <figcaption>Accéder au site</figcaption>
            </Link>
          </figure>

      </main>
    </>
  );
}

export default Home;