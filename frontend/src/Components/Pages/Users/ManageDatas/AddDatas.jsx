import React, { useState } from "react";

import Loader from "../../../Loader";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

export default function AddDatas() {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log("Soumission des données :");
      console.log(input1);
      console.log(input2);
      console.log(input3);
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
        <label htmlFor="input1">Donnée1</label>
        <input
          placeholder="Entrez une donnée"
          type="text"
          name="input1"
          value={input1}
          onChange={(e) => setInput1(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="input2">Donnée2</label>
        <input
          placeholder="Entrez une donnée"
          type="text"
          name="input2"
          value={input2}
          onChange={(e) => setInput2(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="input3">Donnée3</label>
        <input
          placeholder="Entrez une donnée"
          type="text"
          name="input3"
          value={input3}
          onChange={(e) => setInput3(e.target.value)}
        />
      </div>
      <button type="submit">
                <FontAwesomeIcon icon={faCirclePlus} size="xl" /><p>Ajouter</p></button>
      {loading && <Loader />}
    </form>
  );
}
