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
          color: "rgb(250, 250, 250)",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "rgb(250, 250, 250)",
          display: false,
        },
      },
      y: {
        ticks: {
          color: "rgb(250, 250, 250)",
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
  const getDateRange = (dataset) => {
    const dates = dataset.map((data) => new Date(data.date));
    const minDate = new Date(Math.min(...dates));
    const maxDate = new Date(Math.max(...dates));
    return { minDate, maxDate };
  };

  const [selectedCard, setSelectedCard] = useState(0);
  const cards = [
    {
      title: "Hebdomadaire",
      label: "Nombre de nouveaux malades par semaines",
      dataset: fakeDatasDaily,
    },
    {
      title: "Total",
      label: "Nombre de malades total",
      dataset: fakeDatasCumulative,
    },
  ];
  return (
    <>
      <section className="section-body">
        <h2>Nombre de nouveaux malades</h2>
        <div className="chart-btn-div">
          {cards.map((card, index) => {
            const { minDate, maxDate } = getDateRange(card.dataset);
            return (
              <div
                key={index}
                className={`chart-btn ${
                  selectedCard === index ? "selected-btn" : ""
                }`}
                onClick={() => setSelectedCard(index)}
              >
                <p className="chart-btn-title">{card.title}</p>{" "}
                <p>du {minDate.toLocaleDateString()}</p>
                <p>au {maxDate.toLocaleDateString()}</p>
              </div>
            );
          })}
        </div>
        <div className="chart-container">
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
