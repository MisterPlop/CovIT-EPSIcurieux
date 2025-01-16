import { useState } from "react";

import AddDatas from "./AddDatas";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleDown } from "@fortawesome/free-solid-svg-icons";

export default function ManageDatas() {
  const [addDatasOpen, setAddDatasOpen] = useState(false);

  const toggleAddDatas = () => {
    setAddDatasOpen((prevAddDatasOpen) => !prevAddDatasOpen);
  };

  return (
    <>
      <section className="section-body">
        <button
          type="button"
          className="addDatasOpen-btn"
          onClick={toggleAddDatas}
        >
          <FontAwesomeIcon icon={faChevronCircleDown} size="xl" />
          <p>Ajouter un cas</p>
        </button>
        <article className="add-datas-article">
          {addDatasOpen && <AddDatas />}
        </article>

        <article>
          <h3>Tableau de données à venir</h3>
        </article>
      </section>
    </>
  );
}
