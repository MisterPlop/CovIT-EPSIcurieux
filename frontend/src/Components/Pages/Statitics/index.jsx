import React /*, { useEffect,  useState } */ from "react";
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

export default function Stats() {
  // const [datas, setDatas] = useState([]);

  const chartDataDaily = {
    labels: fakeDatasDaily.map((item) => item.date),
    datasets: [
      {
        label: "Nombre de nouveaux malades  semaines",
        data: fakeDatasDaily.map((item) => item.value),
        fill: false,
        borderColor: "rgb(245, 205, 115)",
        tension: 0.1,
      },
    ],
  };
  const chartDataCumulative = {
    labels: fakeDatasCumulative.map((item) => item.date),
    datasets: [
      {
        label: "Nombre de malades total",
        data: fakeDatasCumulative.map((item) => item.value),
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
  const optionsDaily = {
    ...options,
    plugins: {
      ...options.plugins,
      title: {
        display: true,
        text: 'Hebdomadaire', // Titre spécifique pour le graphique hebdomadaire
        color: 'rgb(250, 250, 250)',
        font: {
          size: 20,
          weight: 'bold',
        },
      },
    },
  };
  const optionsCumulative = {
    ...options,
    plugins: {
      ...options.plugins,
      title: {
        display: true,
        text: 'Total', // Titre spécifique pour le graphique cumulatif
        color: 'rgb(250, 250, 250)',
        font: {
          size: 20,
          weight: 'bold',
        },
      },
    },
  };

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

  return (
    <>
      <section className="section-body">
        <h2>Nombre de nouveaux malades</h2>
        <div className="chart-container">
            <div className="chart-card">
              {!chartDataDaily ? (
                <Loader />
              ) : (
                <>
                  <Line data={chartDataDaily} options={optionsDaily} />
                </>
              )}
            </div>
            <div className="chart-card">
              {!chartDataCumulative ? (
                <Loader />
              ) : (
                <>
                  <Line data={chartDataCumulative} options={optionsCumulative} />
                </>
              )}
            </div>
        </div>
      </section>
      <section className="section-end laptopAndDesktop-hidden"></section>
    </>
  );
}
