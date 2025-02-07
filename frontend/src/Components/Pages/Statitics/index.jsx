import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Papa from "papaparse"; // CSV parser
import mergedData from "../../../Assets/Variables/merged_data.csv";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPerson, faRankingStar, faHeadSideCough, faHandHoldingHeart, faSkull } from "@fortawesome/free-solid-svg-icons";
import Loader from "../../Loader";
import TopCountriesByCases from "./TopCountriesByCases";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

function Chart({ label, dataset }) {

  const chart = {
    labels: dataset.map((item) => item.Date),
    datasets: [
      {
        label: label,
        data: dataset.map((item) => item.value),
        fill: false,
        borderColor: "rgb(245, 205, 115)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top",
        labels: {
          color: "#0f172a",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#0f172a",
          display: false,
        },
      },
      y: {
        ticks: {
          color: "#0f172a",
        },
      },
    },
  };

  return (
    <>
      <div className="chart-card">
        <Line data={chart} options={options} />
      </div>
    </>
  );
}

export default function Stats() {
  const [allData, setAllData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("France");
  const [selectedMetric, setSelectedMetric] = useState("Cases");
  const [selectedCard, setSelectedCard] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Papa.parse(mergedData, { // A modifier par un appel API
      download: true,
      header: true,
      complete: (result) => {
        // Convert numeric values from strings to numbers
        const parsedData = result.data.map(row => ({
          ...row,
          Population: Number(row.Population),
          Cases: Number(row.Cases),
          Active: Number(row.Active),
          Recovered: Number(row.Recovered),
          Deaths: Number(row.Deaths),
        }));
        console.log(parsedData);
        setAllData(parsedData);
        setLoading(false);
      },
    });
  }, []);

  if (loading) {
    return <Loader />;
  }

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  const handleMetricChange = (metric, index) => {
    setSelectedMetric(metric);
    setSelectedCard(index);
  };

  const filteredData = allData.filter((row) => row.Country === selectedCountry);

  const dataset = filteredData.map((row) => ({
    Date: row.Date,
    value: row[selectedMetric],
  }));

  const getDateRange = (data) => {
    const dates = data.map((item) => new Date(item.Date));
    const minDate = new Date(Math.min(...dates));
    const maxDate = new Date(Math.max(...dates));
    return { minDate, maxDate };
  };

  const { minDate, maxDate } = getDateRange(filteredData);

  const countries = [...new Set(allData.map((row) => row.Country))];

  const population = filteredData.length > 0 ? filteredData[0].Population : 0;

  const cards = [
    {
      icon: <FontAwesomeIcon icon={faPerson} />,
      title: "Population",
      metric: "Population",
      population: `${population}`
    },
    {
      icon: <FontAwesomeIcon icon={faRankingStar} />,
      title: "Cases",
      metric: "Cases",
    },
    {
      icon: <FontAwesomeIcon icon={faHeadSideCough} />,
      title: "Active",
      metric: "Active",
    },
    {
      icon: <FontAwesomeIcon icon={faHandHoldingHeart} />,
      title: "Recovered",
      metric: "Recovered",
    },
    {
      icon: <FontAwesomeIcon icon={faSkull} />,
      title: "Deaths",
      metric: "Deaths",
    },
  ];

  return (
    <>
      <section className="section-body">
        <h2>Statistiques du Covid</h2>

        <div className="stats-container">
          <div className="stats-part part1">
            <div className="chart-select-div">
              <label htmlFor="country-select">Select Country: </label>
              <select id="country-select" value={selectedCountry} onChange={handleCountryChange}>
                <option value="" disabled>Choisissez un pays</option>
                {countries.map((country, index) => (
                  <option key={index} value={country} >
                    {country}
                  </option>
                ))}
              </select>
            </div>
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
            <div className="chart-container">
              <div className="chart-dates">
                <p className="date">du {minDate.toLocaleDateString()} au {maxDate.toLocaleDateString()}</p>
              </div>
              {selectedCountry && selectedMetric !== "Population" && (
                <Chart
                  title={selectedCountry}
                  label={selectedMetric}
                  dataset={dataset}
                />
              )}
            </div>
          </div>
          <div className="stats-part part2">
            <TopCountriesByCases />
          </div>
        </div>

      </section>
      <section className="section-end laptopAndDesktop-hidden"></section>
    </>
  );
}
