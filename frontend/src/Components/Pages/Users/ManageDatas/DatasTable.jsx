import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faSortUp, faSortDown, faTimes, faTrash, faEdit, faSave, faXmark } from "@fortawesome/free-solid-svg-icons";

import { getItemWithExpiration } from "../../../../Assets/Variables/functions";
import { API_BASE_URL } from "../../../../Assets/Variables/const";
import Loader from "../../../Loader";

const DatasTable = ({ datas }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterCountry, setFilterCountry] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });
  const [editRowId, setEditRowId] = useState("");
  const [loading, setLoading] = useState(false);
  const rowsPerPage = 10;
  const tableRef = useRef(null);
  const [msg, setMsg] = useState("");
  const [msg2, setMsg2] = useState("");

  const TOKEN = getItemWithExpiration("auth");

  const [editCountry, setEditCountry] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editPopulation, setEditPopulation] = useState("");
  const [editCases, setEditCases] = useState("");
  const [editActive, setEditActive] = useState("");
  const [editRecovered, setEditRecovered] = useState("");
  const [editDeaths, setEditDeaths] = useState("");

  const filteredDatas = datas.filter(data => data.country.toLowerCase().includes(filterCountry.toLowerCase()));

  const sorteddatas = [...filteredDatas].sort((a, b) => {
    if (sortConfig.key) {
      if (sortConfig.key === "date") {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        if (dateA < dateB) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (dateA > dateB) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      } else {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      }
    }
    return 0;
  });

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentDatas = sorteddatas.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(sorteddatas.length / rowsPerPage);

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

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
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

  const handleEdit = (data) => {
    setEditRowId(data.id);
    setEditCountry(data.country);
    setEditDate(new Date(data.date).toISOString().split('T')[0]);
    setEditPopulation(data.population);
    setEditCases(data.cases);
    setEditActive(data.active);
    setEditRecovered(data.recovered);
    setEditDeaths(data.deaths);
  };

  const handleCancel = () => {
    setEditRowId("");
  };

  const handleSubmitEdit = async (e, id) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(API_BASE_URL + "covid19/editCovidData", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${TOKEN}`
        },
        body: JSON.stringify({
          covid19: {
            country: editCountry,
            date: editDate,
            population: Number(editPopulation),
            cases: Number(editCases),
            active: Number(editActive),
            recovered: Number(editRecovered),
            deaths: Number(editDeaths),
            id: id
          }
        }),
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
      setEditRowId("")
    }
  };

  const handleDelete = async (e, dataId) => {
    e.preventDefault();
    const confirmed = window.confirm(
      `Êtes-vous sûr de vouloir supprimer cette ligne ?`
    );
    if (confirmed) {
      const res = await fetch(`${API_BASE_URL}covid19/deleteCovidData?id=${encodeURIComponent(dataId)}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${TOKEN}`,
        },
      });
      if (res.status === 201) {
        setEditRowId("")
      }
    } else {
      setEditRowId("")
    }
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
      <table ref={tableRef} >
        <thead>
          <tr>
            <th onClick={() => handleSort("country")} >
              <p>Country <FontAwesomeIcon icon={getSortIcon("country")} className="table-icon" /></p>
            </th>
            <th onClick={() => handleSort("Date")} >
              <p>Date <FontAwesomeIcon icon={getSortIcon("date")} className="table-icon" /></p>
            </th>
            <th onClick={() => handleSort("population")} >
              <p>Population <FontAwesomeIcon icon={getSortIcon("population")} className="table-icon" /></p>
            </th>
            <th onClick={() => handleSort("cases")} >
              <p>Cases <FontAwesomeIcon icon={getSortIcon("cases")} className="table-icon" /></p>
            </th>
            <th onClick={() => handleSort("active")} >
              <p>Active <FontAwesomeIcon icon={getSortIcon("active")} className="table-icon" /></p>
            </th>
            <th onClick={() => handleSort("recovered")} >
              <p>Recovered <FontAwesomeIcon icon={getSortIcon("recovered")} className="table-icon" /></p>
            </th>
            <th onClick={() => handleSort("deaths")} >
              <p>Deaths <FontAwesomeIcon icon={getSortIcon("deaths")} className="table-icon" /></p>
            </th>
            <th>-</th>
          </tr>
        </thead>
        <tbody>
          {currentDatas && currentDatas.map((data) => (
            <tr key={data.id}>
              {editRowId === data.id ? (
                <>
                  <td className='edit-input'><input type="text" value={editCountry} placeholder="Viile" onChange={(e) => setEditCountry(e.target.value)} /></td>
                  <td className='edit-input'><input type="text" value={editDate} placeholder="Date AAAA-MM-JJ" onChange={(e) => setEditDate(e.target.value.replace(/[^0-9-]/g, "").replace(/^(\d{4})(\d)/, "$1-$2").replace(/^(\d{4}-\d{2})(\d)/, "$1-$2").slice(0, 10))} /></td>
                  <td className='edit-input'><input type="text" value={editPopulation} placeholder="Population" onChange={(e) => setEditPopulation(e.target.value)} /></td>
                  <td className='edit-input'><input type="text" value={editCases} placeholder="Cas" onChange={(e) => setEditCases(e.target.value)} /></td>
                  <td className='edit-input'><input type="text" value={editActive} placeholder="Actifs" onChange={(e) => setEditActive(e.target.value)} /></td>
                  <td className='edit-input'><input type="text" value={editRecovered} placeholder="Guéris" onChange={(e) => setEditRecovered(e.target.value)} /></td>
                  <td className='edit-input'><input type="text" value={editDeaths} placeholder="Morts" onChange={(e) => setEditDeaths(e.target.value)} /></td>
                  <td>
                    {loading ? (<><Loader /></>) : (<><FontAwesomeIcon icon={faSave} className="table-icon" onClick={(e) => handleSubmitEdit(e, data.id)} /></>)}
                    <FontAwesomeIcon icon={faXmark} className="table-icon" onClick={() => handleCancel()} />
                  </td>
                </>
              ) : (
                <>
                  <td>{data.country}</td>
                  <td>{new Date(data.date).toLocaleDateString()}</td>
                  <td>{data.population}</td>
                  <td>{data.cases}</td>
                  <td>{data.active}</td>
                  <td>{data.recovered}</td>
                  <td>{data.deaths}</td>
                  <td>
                    <FontAwesomeIcon icon={faEdit} className="table-icon" onClick={() => handleEdit(data)} />
                    <FontAwesomeIcon icon={faTrash} className="table-icon" onClick={(e) => handleDelete(e, data.id)} />
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {msg && <p className="msg green">{msg}</p>}
      {msg2 && <p className="msg red">{msg2}</p>}
      <div className="pagination">
        <button onClick={handleFirstPage} disabled={currentPage === 1}>
          First
        </button>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
        <button onClick={handleLastPage} disabled={currentPage === totalPages}>
          Last
        </button>
      </div>
    </>
  );
};

export default DatasTable;