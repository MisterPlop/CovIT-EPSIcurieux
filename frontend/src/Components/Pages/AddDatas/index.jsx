import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

import Loader from "../../Loader";

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
    <>
      <section className="section-body">
        <h3>Formulaire d'ajout de données</h3>

        <form onSubmit={handleSubmit} className="add-datas-form">
          <label htmlFor="input1">Donnée1</label>
          <input
            type="text"
            name="input1"
            value={input1}
            onChange={(e) => setInput1(e.target.value)}
          />
          <label htmlFor="input2">Donnée2</label>
          <input
            type="text"
            name="input2"
            value={input2}
            onChange={(e) => setInput2(e.target.value)}
          />
          <label htmlFor="input3">Donnée3</label>
          <input
            type="text"
            name="input3"
            value={input3}
            onChange={(e) => setInput3(e.target.value)}
          />
          <button type="submit"><FontAwesomeIcon icon={faCirclePlus} /></button>
          {loading && <Loader />}
        </form>
      </section>
    </>
  );
}
