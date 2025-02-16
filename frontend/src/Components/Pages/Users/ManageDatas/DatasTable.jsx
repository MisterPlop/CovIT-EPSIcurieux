import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faSortUp, faSortDown, faTimes } from "@fortawesome/free-solid-svg-icons";

const DataTable = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterCountry, setFilterCountry] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });
  const rowsPerPage = 10;
  const tableRef = useRef(null);

  const filteredData = data.filter(row => row.Country.toLowerCase().includes(filterCountry.toLowerCase()));

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortConfig.key) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    }
    return 0;
  });

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = sortedData.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending" ? faSortUp : faSortDown;
    }
    return faSort;
  };

  const handleScroll = () => {
    const table = tableRef.current;
    if (table) {
      const { scrollLeft, scrollWidth, clientWidth } = table;

      if (scrollLeft === 0) {
        table.classList.add("scroll-left");
        table.classList.remove("scroll-right");
      } else if (scrollLeft + clientWidth >= scrollWidth) {
        table.classList.add("scroll-right");
        table.classList.remove("scroll-left");
      } else {
        table.classList.remove("scroll-left", "scroll-right");
      }
    }
  };

  useEffect(() => {
    const table = tableRef.current;
    if (table) {
      table.addEventListener("scroll", handleScroll);
      return () => {
        table.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  const handleClearFilter = () => {
    setFilterCountry("");
  };

  return (
    <>
      <div className="filter-container">
        <input
          type="text"
          placeholder="Filtrer par pays"
          value={filterCountry}
          onChange={(e) => setFilterCountry(e.target.value)}
        />
        <button onClick={handleClearFilter} className={filterCountry ? "clear-filter-btn" : "hidden"} >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <table ref={tableRef}>
        <thead>
          <tr>
            <th onClick={() => handleSort("Country")}>
              <p>Country <FontAwesomeIcon icon={getSortIcon("Country")} className="table-icon" /></p>
            </th>
            <th onClick={() => handleSort("Date")}>
              <p>Date <FontAwesomeIcon icon={getSortIcon("Date")} className="table-icon" /></p>
            </th>
            <th onClick={() => handleSort("Population")}>
              <p>Population <FontAwesomeIcon icon={getSortIcon("Population")} className="table-icon" /></p>
            </th>
            <th onClick={() => handleSort("Cases")}>
              <p>Cases <FontAwesomeIcon icon={getSortIcon("Cases")} className="table-icon" /></p>
            </th>
            <th onClick={() => handleSort("Active")}>
              <p>Active <FontAwesomeIcon icon={getSortIcon("Active")} className="table-icon" /></p>
            </th>
            <th onClick={() => handleSort("Recovered")}>
              <p>Recovered <FontAwesomeIcon icon={getSortIcon("Recovered")} className="table-icon" /></p>
            </th>
            <th onClick={() => handleSort("Deaths")}>
              <p>Deaths <FontAwesomeIcon icon={getSortIcon("Deaths")} className="table-icon" /></p>
            </th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row, index) => (
            <tr key={index}>
              <td>{row.Country}</td>
              <td>{row.Date}</td>
              <td>{row.Population}</td>
              <td>{row.Cases}</td>
              <td>{row.Active}</td>
              <td>{row.Recovered}</td>
              <td>{row.Deaths}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </>
  );
};

export default DataTable;