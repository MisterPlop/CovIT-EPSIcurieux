import { useState, useEffect } from "react";
import DataTable from "./DatasTable";

import { API_BASE_URL } from "../../../../Assets/Variables/const";
import { getItemWithExpiration } from "../../../../Assets/Variables/functions";

import AddDatas from "./AddDatas";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleDown } from "@fortawesome/free-solid-svg-icons";

export default function ManageDatas() {
  const [addDatasOpen, setAddDatasOpen] = useState(true);
  const [allDatas, setAllDatas] = useState([]);

  const toggleAddDatas = () => {
    setAddDatasOpen((prevAddDatasOpen) => !prevAddDatasOpen);
  };

  const TOKEN = getItemWithExpiration("auth");

  useEffect(() => {
    async function fetchDatas() {
        try {
            const response = await fetch(API_BASE_URL + "covid19/allDatas",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${TOKEN}`
                    }
                }
            );
            const data = await response.json();
            setAllDatas(data);
        } catch (error) {
            console.error(
                "Erreur lors de la récupération des données:",
                error
            );
        }
    }
    fetchDatas();
}, [allDatas]);

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

        <article className="allDatas-article">
          <h3>Toutes les donnés</h3>
          <DataTable datas={allDatas} />
        </article>
      </section>
      <section className="section-end laptopAndDesktop-hidden"></section>
    </>
  );
}
