import { useState, useEffect } from "react";
import DataTable from "./DatasTable";

import mergedData from "../../../../Assets/Variables/merged_data.csv";
import AddDatas from "./AddDatas";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleDown } from "@fortawesome/free-solid-svg-icons";

export default function ManageDatas() {
  const [addDatasOpen, setAddDatasOpen] = useState(false);
  const [allData, setAllData] = useState([]);

  const toggleAddDatas = () => {
    setAddDatasOpen((prevAddDatasOpen) => !prevAddDatasOpen);
  };

  useEffect(() => {
    fetch(mergedData)
      .then((response) => response.text())
      .then((text) => {
        const rows = text.split("\n").slice(1);
        const data = rows.map((row) => {
          const [Country, Date, Population, Cases, Active, Recovered, Deaths] = row.split(",");
          return { Country, Date, Population, Cases, Active, Recovered, Deaths };
        });
        setAllData(data);
      });
  }, []);

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
          <DataTable data={allData} />
        </article>
      </section>
      <section className="section-end laptopAndDesktop-hidden"></section>
    </>
  );
}
