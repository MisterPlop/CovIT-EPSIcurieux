import React, { useState } from "react";

import Loader from "../../../Loader";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

export default function AddDatas() {
  const [country, setCountry] = useState("");
  const [date, setDate] = useState("");
  const [population, setPopulation] = useState("");
  const [cases, setCases] = useState("");
  const [active, setActive] = useState("");
  const [recovered, setRecovered] = useState("");
  const [deaths, setDeaths] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log("Soumission des données :");
      console.log(country);
      console.log(date);
      console.log(population);
      console.log(cases);
      console.log(active);
      console.log(recovered);
      console.log(deaths);
    } catch (error) {
      console.error(
        "Une erreur s'est produite pendant la soumission des données : ",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-datas-form">
      <div className="form-group">
        <label htmlFor="country">Villes</label>
        <input
          placeholder="Pays"
          type="text"
          name="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input
          placeholder="Date"
          type="text"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="population">Population</label>
        <input
          placeholder="Population"
          type="text"
          name="population"
          value={population}
          onChange={(e) => setPopulation(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="cases">Cas</label>
        <input
          placeholder="Cas"
          type="text"
          name="cases"
          value={cases}
          onChange={(e) => setCases(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="active">Active</label>
        <input
          placeholder="Acitve"
          type="text"
          name="active"
          value={active}
          onChange={(e) => setActive(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="recovered">Guéris</label>
        <input
          placeholder="Recovered"
          type="text"
          name="recovered"
          value={recovered}
          onChange={(e) => setRecovered(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="deaths">Morts</label>
        <input
          placeholder="Deaths"
          type="text"
          name="deaths"
          value={deaths}
          onChange={(e) => setDeaths(e.target.value)}
        />
      </div>
      <button type="submit">
                <FontAwesomeIcon icon={faCirclePlus} size="xl" /><p>Ajouter</p></button>
      {loading && <Loader />}
    </form>
  );
}
