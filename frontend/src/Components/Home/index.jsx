import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <main className="home_main">

          <figure className="home_figure">
            <Link to="/stats">
              <img src="LogoCovIT.png" alt="Logo CovIT" />
              <figcaption className="figcaption-c">C</figcaption>
              <figcaption className="figcaption-vit">VIT</figcaption>
            </Link>
          </figure>
          <Link to="/stats">
            <p>Accéder au site</p>
          </Link>

      </main>
    </>
  );
}

export default Home;