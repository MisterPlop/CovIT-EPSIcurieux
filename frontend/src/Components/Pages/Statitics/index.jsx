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
        label: "Nombre de malades par semaine",
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
          color: "rgb(250, 250, 250)", // Color for the legend text
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "rgb(250, 250, 250)", // Color for the x-axis text
        },
      },
      y: {
        ticks: {
          color: "rgb(250, 250, 250)", // Color for the y-axis text
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
        <h2>Nombre de malades</h2>
        <article  className="chart-article">
          <h3>Chaque jour</h3>
          <div className="chart-card">
            {!chartDataDaily ? (
              <Loader />
            ) : (
              <>
                <Line data={chartDataDaily} options={options} />
              </>
            )}
          </div>
        </article>
        
        <article  className="chart-article">
          <h3>Total</h3>
          <div className="chart-card">
            {!chartDataCumulative ? (
              <Loader />
            ) : (
              <>
                <Line data={chartDataCumulative} options={options} />
              </>
            )}
          </div>
        </article>
      </section>
      <section className="section-end"></section>
    </>
  );
}
