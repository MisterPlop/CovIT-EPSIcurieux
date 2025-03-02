import React, { useState } from "react";

import Loader from "../../../Loader";

import { getItemWithExpiration } from "../../../../Assets/Variables/functions";
import { API_BASE_URL } from "../../../../Assets/Variables/const";

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

  const [msg, setMsg] = useState("");
  const [msg2, setMsg2] = useState("");

  const TOKEN = getItemWithExpiration("auth");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (country === "" || date === "" || population === "" || cases === "" || active === "" || recovered === "" || deaths === "") {
      setMsg2("Veuillez remplir tous les champs");
      setTimeout(() => {
        setMsg2("");
      }, 3000);
      return;
    }
    setLoading(true);
    try {
      const covidData = {
        covid19: [
          {
            country,
            date,
            population: Number(population),
            cases: Number(cases),
            active: Number(active),
            recovered: Number(recovered),
            deaths: Number(deaths),
          }
        ]
      };
      const res = await fetch(API_BASE_URL + "covid19/addCovidData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${TOKEN}`
        },
        body: JSON.stringify(covidData),
      });
      const json = await res.json();
      if (res.status === 201) {
        setMsg(json.message);
        setTimeout(() => {
          setMsg("");
        }, 3000);
      } else {
        setMsg2(json.message);
        setTimeout(() => {
          setMsg2("");
        }, 3000);
      }
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
      <form onSubmit={handleSubmit} className="add-datas-form position-relative">
        {msg && <p className="msg green">{msg}</p>}
        {msg2 && <p className="msg red">{msg2}</p>}
        <div className="form-group">
          <label htmlFor="country">Pays</label>
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
            placeholder="Date AAAA-MM-JJ"
            type="text"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value.replace(/[^0-9-]/g, "").replace(/^(\d{4})(\d)/, "$1-$2").replace(/^(\d{4}-\d{2})(\d)/, "$1-$2").slice(0, 10))}
          />
        </div>
        <div className="form-group">
          <label htmlFor="population">Population</label>
          <input
            placeholder="Population"
            type="text"
            name="population"
            value={population}
            onChange={(e) => setPopulation(e.target.value.replace(/[^0-9]/g, ""))}
          />
        </div>
        <div className="form-group">
          <label htmlFor="cases">Cas</label>
          <input
            placeholder="Cas"
            type="text"
            name="cases"
            value={cases}
            onChange={(e) => setCases(e.target.value.replace(/[^0-9]/g, ""))}
          />
        </div>
        <div className="form-group">
          <label htmlFor="active">Active</label>
          <input
            placeholder="Acitve"
            type="text"
            name="active"
            value={active}
            onChange={(e) => setActive(e.target.value.replace(/[^0-9]/g, ""))}
          />
        </div>
        <div className="form-group">
          <label htmlFor="recovered">Guéris</label>
          <input
            placeholder="Recovered"
            type="text"
            name="recovered"
            value={recovered}
            onChange={(e) => setRecovered(e.target.value.replace(/[^0-9]/g, ""))}
          />
        </div>
        <div className="form-group">
          <label htmlFor="deaths">Morts</label>
          <input
            placeholder="Deaths"
            type="text"
            name="deaths"
            value={deaths}
            onChange={(e) => setDeaths(e.target.value.replace(/[^0-9]/g, ""))}
          />
        </div>
        {loading ? <Loader /> : <button type="submit"><FontAwesomeIcon icon={faCirclePlus} size="xl" /><p>Ajouter</p></button>}
      </form>
    </>
  );
}
import React, { useState } from "react";

import Loader from "../../../Loader";

import { getItemWithExpiration } from "../../../../Assets/Variables/functions";
import { API_BASE_URL } from "../../../../Assets/Variables/const";

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

  const [msg, setMsg] = useState("");
  const [msg2, setMsg2] = useState("");

  const TOKEN = getItemWithExpiration("auth");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (country === "" || date === "" || population === "" || cases === "" || active === "" || recovered === "" || deaths === "") {
      setMsg2("Veuillez remplir tous les champs");
      setTimeout(() => {
        setMsg2("");
      }, 3000);
      return;
    }
    setLoading(true);
    try {
      const covidData = {
        covid19: [
          {
            country,
            date,
            population: Number(population),
            cases: Number(cases),
            active: Number(active),
            recovered: Number(recovered),
            deaths: Number(deaths),
          }
        ]
      };
      const res = await fetch(API_BASE_URL + "covid19/addCovidData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${TOKEN}`
        },
        body: JSON.stringify(covidData),
      });
      const json = await res.json();
      if (res.status === 201) {
        setMsg(json.message);
        setTimeout(() => {
          setMsg("");
        }, 3000);
      } else {
        setMsg2(json.message);
        setTimeout(() => {
          setMsg2("");
        }, 3000);
      }
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
      <form onSubmit={handleSubmit} className="add-datas-form position-relative">
        {msg && <p className="msg green">{msg}</p>}
        {msg2 && <p className="msg red">{msg2}</p>}
        <div className="form-group">
          <label htmlFor="country">Pays</label>
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
            placeholder="Date AAAA-MM-JJ"
            type="text"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value.replace(/[^0-9-]/g, "").replace(/^(\d{4})(\d)/, "$1-$2").replace(/^(\d{4}-\d{2})(\d)/, "$1-$2").slice(0, 10))}
          />
        </div>
        <div className="form-group">
          <label htmlFor="population">Population</label>
          <input
            placeholder="Population"
            type="text"
            name="population"
            value={population}
            onChange={(e) => setPopulation(e.target.value.replace(/[^0-9]/g, ""))}
          />
        </div>
        <div className="form-group">
          <label htmlFor="cases">Cas</label>
          <input
            placeholder="Cas"
            type="text"
            name="cases"
            value={cases}
            onChange={(e) => setCases(e.target.value.replace(/[^0-9]/g, ""))}
          />
        </div>
        <div className="form-group">
          <label htmlFor="active">Active</label>
          <input
            placeholder="Acitve"
            type="text"
            name="active"
            value={active}
            onChange={(e) => setActive(e.target.value.replace(/[^0-9]/g, ""))}
          />
        </div>
        <div className="form-group">
          <label htmlFor="recovered">Guéris</label>
          <input
            placeholder="Recovered"
            type="text"
            name="recovered"
            value={recovered}
            onChange={(e) => setRecovered(e.target.value.replace(/[^0-9]/g, ""))}
          />
        </div>
        <div className="form-group">
          <label htmlFor="deaths">Morts</label>
          <input
            placeholder="Deaths"
            type="text"
            name="deaths"
            value={deaths}
            onChange={(e) => setDeaths(e.target.value.replace(/[^0-9]/g, ""))}
          />
        </div>
        {loading ? <Loader /> : <button type="submit"><FontAwesomeIcon icon={faCirclePlus} size="xl" /><p>Ajouter</p></button>}
      </form>
    </>
  );
}
