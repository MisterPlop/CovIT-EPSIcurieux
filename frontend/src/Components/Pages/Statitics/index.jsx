import React, { /* useEffect, */ useState } from "react";
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
import { fakeDatasDaily, fakeDatasCumulative } from "./fakeDatas.js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarWeek, faGlobe } from "@fortawesome/free-solid-svg-icons";
import Loader from "../../Loader";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

function Chart({ title, label, dataset }) {
  // const [datas, setDatas] = useState([]);

  /*   useEffect(() => {
    async function getStats() {
      try {
        const response = await fetch("URL_DE_L_API_GRAFANA", {
          method: "GET",
          headers: {
            Authorization: "Bearer VOTRE_CLE_API",
          },
        });
        const result = await response.json();
        setDatas(result);
      } catch (error) {
        console.error("getStats Error:", error);
      }
    }
    getStats();
  }, []); */

  const chart = {
    labels: dataset.map((item) => item.date),
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
        {!chart ? (
          <Loader />
        ) : (
          <>
            <Line data={chart} options={options} />
          </>
        )}
      </div>
    </>
  );
}

export default function Stats() {
  const cards = [
    {
      icon: <FontAwesomeIcon icon={faCalendarWeek} />,
      title: "Hebdomadaire",
      label: "Nombre de nouveaux malades par semaines",
      dataset: fakeDatasDaily,
    },
    {
      icon: <FontAwesomeIcon icon={faGlobe} />,
      title: "Total",
      label: "Nombre de malades total",
      dataset: fakeDatasCumulative,
    },
  ];
  const getDateRange = (dataset) => {
    const dates = dataset.map((data) => new Date(data.date));
    const minDate = new Date(Math.min(...dates));
    const maxDate = new Date(Math.max(...dates));
    return { minDate, maxDate };
  };
  const [selectedCard, setSelectedCard] = useState(0);
  const { minDate, maxDate } = getDateRange(cards[selectedCard].dataset);

  return (
    <>
      <section className="section-body">
        <h2>Nombre de nouveaux malades</h2>
        <div className="chart-btn-div">
          {cards.map((card, index) => (
            <button
              key={index}
              className={`chart-btn ${
                selectedCard === index ? "selected-btn" : ""
              }`}
              onClick={() => setSelectedCard(index)}
            >
              <p>{card.icon}</p><p>{card.title}</p>
            </button>
          ))}
        </div>
        <div className="chart-container">
          <div className="chart-dates">
            <p className="date">du {minDate.toLocaleDateString()} au {maxDate.toLocaleDateString()}</p>
          </div>
          <Chart
            title={cards[selectedCard].title}
            label={cards[selectedCard].label}
            dataset={cards[selectedCard].dataset}
          />
        </div>
      </section>
      <section className="section-end laptopAndDesktop-hidden"></section>
    </>
  );
}
