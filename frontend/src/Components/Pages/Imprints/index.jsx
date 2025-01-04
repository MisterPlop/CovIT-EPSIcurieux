import { Link } from "react-router-dom";

export default function Imprints() {
  return (
    <>
      <section className="section-imprints">
        <h2>Mentions Légales</h2>

        <article>
          <h3>Nom du Projet :</h3>
          <p>Détection et Prévention des Pandémies - Plateforme d'Analyse</p>
        </article>
        <article>
          <h3>Équipe de Développement :</h3>
          <p>
            Ce projet a été réalisé par une équipe de quatre développeurs dans
            le cadre d'un Module de Synthèse Professionnelle et Réflexive (MSPR)
            à l'EPSI de Lyon.
          </p>
          <ul>
            <li>Sylvain ZOOGONES</li>
            <li>Alan KONAK</li>
            <li>Mohamad DAWOOD</li>
            <li>Dylan Vivant</li>
          </ul>
        </article>
        <article>
          <h3>Établissement :</h3>
          <p>EPSI Lyon</p>
        </article>
        <article>
          <h3>Objet du Projet :</h3>
          <p>
            Ce projet a pour objectif de développer une plateforme permettant de
            collecter, nettoyer, analyser et visualiser des données historiques
            sur les pandémies, conformément au cahier des charges défini.
          </p>
        </article>
        <article>
          <h3>Nature du Projet :</h3>
          <p>
            Ce projet est un exercice réalisé dans un cadre pédagogique. Les
            données, outils et solutions développés dans le cadre de ce projet
            ne doivent pas être utilisés dans un contexte professionnel ou à des
            fins commerciales sans autorisation.
          </p>
        </article>
        <article>
          <h3>Sources de Données :</h3>
          <p>
            Les données utilisées dans ce projet sont issues de sources
            publiques disponibles sur Kaggle :
          </p>
          <ul>
            <li>
              <Link
                to="https://www.kaggle.com/datasets/imdevskp/corona-virus-report?resource=download"
                target="_blank"
              >
                Corona Virus Report
              </Link>
            </li>
            <li>
              <Link
                to="https://www.kaggle.com/datasets/josephassaker/covid19-global-dataset"
                target="_blank"
              >
                COVID-19 Global Dataset
              </Link>
            </li>
            <li>
              <Link
                to="https://www.kaggle.com/datasets/utkarshx27/mpox-monkeypox-data"
                target="_blank"
              >
                MPOX (Monkeypox) Data
              </Link>
            </li>
          </ul>
        </article>
        <article>
          <h3>Responsabilité :</h3>
          <p>
            Les développeurs ne peuvent être tenus responsables des erreurs ou
            omissions potentielles dans les données ou des interprétations
            faites à partir des visualisations et analyses produites par cette
            plateforme.
          </p>
        </article>
        <article>
          <h3>Propriété Intellectuelle :</h3>
          <p>
            Le contenu et les outils développés dans le cadre de ce projet sont
            la propriété intellectuelle exclusive de l'équipe de développement.
            Toute reproduction ou utilisation non autorisée est interdite.
          </p>
        </article>
        <article>
          <h3>Contact :</h3>
          <p>
            Pour toute question relative à ce projet, veuillez contacter
            l'équipe pédagogique de l'EPSI Lyon.
          </p>
        </article>
      </section>
    </>
  );
}
