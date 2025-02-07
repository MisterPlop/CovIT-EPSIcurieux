import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import mergedData from "../../../Assets/Variables/merged_data.csv";
import Loader from "../../Loader";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRankingStar } from "@fortawesome/free-solid-svg-icons";

const TopCountriesByCases = () => {
  const [topCountries, setTopCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    Papa.parse(mergedData, {
      download: true,
      header: true,
      complete: (result) => {
        const data = result.data.map(row => ({
          ...row,
          Cases: Number(row.Cases),
        }));

        const groupedByDate = data.reduce((acc, row) => {
          if (!acc[row.Date]) {
            acc[row.Date] = [];
          }
          acc[row.Date].push(row);
          return acc;
        }, {});

        const topCountriesByDate = Object.keys(groupedByDate).map(date => {
          const sortedByCases = groupedByDate[date].sort((a, b) => b.Cases - a.Cases);
          return {
            date,
            topCountries: sortedByCases.slice(0, 3),
          };
        });

        setTopCountries(topCountriesByDate);
        setLoading(false);

        // Set the most recent date as the default selected date
        if (topCountriesByDate.length > 0) {
          const mostRecentDate = topCountriesByDate[topCountriesByDate.length - 1].date;
          setSelectedDate(mostRecentDate);
        }
      },
    });
  }, []);

  if (loading) {
    return <Loader />;
  }

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const filteredTopCountries = topCountries.find(({ date }) => date === selectedDate);

  return (
    <>
      <h3>Top 3 des pays par période</h3>
      <div className="chart-select-div">
        <label htmlFor="date-select">Choisissez une date : </label>
        <select id="date-select" value={selectedDate} onChange={handleDateChange}>
          <option value="" disabled>Choisissez une date</option>
          {topCountries.map(({ date }) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>
      </div>
      {filteredTopCountries && (
        <div className="countries_cards-container">
          {filteredTopCountries.topCountries.map((country, index) => (
            <div key={index} className="countries_card">
              <FontAwesomeIcon icon={faRankingStar} />
              <h4>{country.Country}</h4>
              <p>{country.Cases} cases</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default TopCountriesByCases;