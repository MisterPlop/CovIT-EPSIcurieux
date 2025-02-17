import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPerson, faRankingStar, faHeadSideCough, faHandHoldingHeart, faSkull } from "@fortawesome/free-solid-svg-icons";
import Loader from "../../Loader";
import countries from "../../../Assets/Variables/countries"; // import the list of countries

// Get the hostname of the current window, to avoid using a hard-coded IP address
const host = window.location.hostname;

/**
 * Generate an array of dates from start to end
 * @param {string} start - Start date in the format "YYYY-MM-DD"
 * @param {string} end - End date in the format "YYYY-MM-DD"
 * @returns {Array} - Array of dates
 * 
 */
const generateMonthlyDates = (start, end) => {
  let dates = [];
  let currentDate = new Date(start);
  while (currentDate <= new Date(end)) {
    dates.push(new Date(currentDate));
    currentDate.setMonth(currentDate.getMonth() + 1);
  }
  return dates;
};

/**
 * @returns {Array} - Array of dates
 * For the current project it works we now that the start date is "2020-01-01" and the end date is "2022-05-01"
 * But in a real project we should pass the start and end date as parameters with an API call
 * Same for the COUNTRIES, COUNTRIES POPULATION list above and the METRICS list below
 */
const availableDates = generateMonthlyDates("2020-01-01", "2022-05-01");

export default function Stats() {
  const [selectedCountry, setSelectedCountry] = useState("France");
  const [countryPopulation, setCountryPopulation] = useState(0);
  const [selectedMetric, setSelectedMetric] = useState("Cases");
  const [selectedCard, setSelectedCard] = useState(1);
  const [top3PanelIdGrafana, setTop3PanelIdGrafana] = useState("");
  const [titleTrad, setTtitleTrad] = useState("");
  const [startDate, setStartDate] = useState(availableDates[0]);
  const [endDate, setEndDate] = useState(availableDates[availableDates.length - 1]);

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  const panelIds = {
    "Cases": 7,
    "Active": 6,
    "Recovered": 5,
    "Deaths": 8
  };
  const panelTitle = {
    "Cases": "Cas Totaux",
    "Active": "Cas Actifs",
    "Recovered": "Guérisons",
    "Deaths": "Morts"
  };
  
  useEffect(() => {
    const country = countries.find(c => c.name === selectedCountry);
    if (country) {
      setCountryPopulation(country.population);
    }
    setTop3PanelIdGrafana(panelIds[selectedMetric] || 7);
    setTtitleTrad(panelTitle[selectedMetric] || "Cas Totaux");
  }, [selectedCountry, selectedMetric, top3PanelIdGrafana]);

  const handleMetricChange = (metric, index) => {
    setSelectedMetric(metric);
    setSelectedCard(index);
  };

  const handleStartDateChange = (e) => {
    setStartDate(new Date(e.target.value));
  };

  const handleEndDateChange = (e) => {
    setEndDate(new Date(e.target.value));
  };

  const dateToTimestamp = (date) => Math.floor(new Date(date).getTime());

  const cards = [
    {
      icon: <FontAwesomeIcon icon={faPerson} />,
      title: "Population",
      metric: "Population",
      population: `${countryPopulation}`
    },
    {
      icon: <FontAwesomeIcon icon={faRankingStar} />,
      title: "Cas Totaux",
      metric: "Cases",
      urlGrafana: "7"
    },
    {
      icon: <FontAwesomeIcon icon={faHeadSideCough} />,
      title: "Cas Actifs",
      metric: "Active",
      urlGrafana: "6"
    },
    {
      icon: <FontAwesomeIcon icon={faHandHoldingHeart} />,
      title: "Guérisons",
      metric: "Recovered",
      urlGrafana: "5"
    },
    {
      icon: <FontAwesomeIcon icon={faSkull} />,
      title: "Morts",
      metric: "Deaths",
      panelIdGrafana: "8"
    },
  ];

  return (
    <>
      <section className="section-body">
        <h2>Statistiques du Covid</h2>

        <div className="stats-container">
          <div className="stats-part part1">
            {<div className="chart-select-div">
              <label htmlFor="country-select">Pays: </label>
              <select id="country-select" value={selectedCountry} onChange={handleCountryChange}>
                <option value="" disabled>Choisissez un pays</option>
                {countries.map((country, index) => (
                  <option key={index} value={country.name} >
                    {country.name}
                  </option>
                ))}
              </select>
            </div>}
            <div className="chart-btn-div">
              {cards.map((card, index) => (
                <button
                  disabled={index === 0} // Disable the population button
                  key={index}
                  className={`chart-btn ${selectedCard === index ? "selected-btn" : ""} ${index === 0 ? "population-btn" : ""}`}
                  onClick={() => handleMetricChange(card.metric, index)}
                >
                  <p>{card.icon} {card.population}</p><p className="metric-text">{card.title}</p>
                </button>
              ))}
            </div>
            <div className="chart-select-div">
              <label>Période :</label>
              <select value={startDate.toISOString().split("T")[0]} onChange={handleStartDateChange}>
                {availableDates.map((date, index) => (
                  <option key={index} value={date.toISOString().split("T")[0]}>
                    {date.toLocaleDateString()}
                  </option>
                ))}
              </select>
              <select value={endDate.toISOString().split("T")[0]} onChange={handleEndDateChange}>
                {availableDates.map((date, index) => (
                  <option key={index} value={date.toISOString().split("T")[0]}>
                    {date.toLocaleDateString()}
                  </option>
                ))}
              </select>
            </div>
            <div className="chart-container">
              {selectedCountry && selectedMetric !== "Population" ? (
                <iframe
                  src={`http://${host}:3001/d-solo/bea6dakrzrx8gd/covit?orgId=1&from=${dateToTimestamp(
                    startDate
                  )}&to=${dateToTimestamp(
                    endDate
                  )}&timezone=browser&var-country=${selectedCountry}&var-column=${selectedMetric}&theme=light&panelId=3&__feature.dashboardSceneSolo`} // ne pas oublier de maj l'ip
                  width="100%"
                  height="350"
                  frameborder="0"
                ></iframe>
              ) : (<Loader />)}
            </div>
          </div>
          <div className="stats-part part2">
            {/* TOP 3 Dynamic  URL grafana */}
            <h3>Top 3 des {titleTrad}</h3>
            <iframe src={`http://${host}:3001/d-solo/bea6dakrzrx8gd/covit?orgId=1&from=1577867308000&to=1651409420000&timezone=browser&var-country=$__all&var-column=cases&editIndex=0&theme=light&panelId=${top3PanelIdGrafana}&__feature.dashboardSceneSolo`}
              width="100%"
              height="350"
              frameborder="0"
            ></iframe>
          </div>
        </div>

      </section>
      <section className="section-end laptopAndDesktop-hidden"></section>
    </>
  );
}
