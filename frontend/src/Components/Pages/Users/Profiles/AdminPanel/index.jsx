import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faSortUp, faSortDown, faUserTie, faTimes } from "@fortawesome/free-solid-svg-icons";
import { users } from "../../../../../Assets/Variables/users";

const UsersTable = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [filterName, setFilterName] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });
    const rowsPerPage = 10;
    const tableRef = useRef(null);

    const filteredData = users.filter(user =>
        user.firstname.toLowerCase().includes(filterName.toLowerCase()) ||
        user.lastname.toLowerCase().includes(filterName.toLowerCase())
    );

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
        setFilterName("");
    };

    return (
        <>
            <article className="allUsers-article">
                <h3>Liste des Utilisateurs</h3>
                <div className="filter-container">
                    <input
                        type="text"
                        placeholder="Filtrer par nom"
                        value={filterName}
                        onChange={(e) => setFilterName(e.target.value)}
                    />
                    <button onClick={handleClearFilter} className={filterName ? "clear-filter-btn" : "hidden"} >
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>
                <table ref={tableRef}>
                    <thead>
                        <tr>
                            <th onClick={() => handleSort("firstname")}>
                                <p>First Name <FontAwesomeIcon icon={getSortIcon("firstname")} className="table-icon" /></p>
                            </th>
                            <th onClick={() => handleSort("lastname")}>
                                <p>Last Name <FontAwesomeIcon icon={getSortIcon("lastname")} className="table-icon" /></p>
                            </th>
                            <th onClick={() => handleSort("position")}>
                                <p>Position <FontAwesomeIcon icon={getSortIcon("position")} className="table-icon" /></p>
                            </th>
                            <th onClick={() => handleSort("email")}>
                                <p>Email <FontAwesomeIcon icon={getSortIcon("email")} className="table-icon" /></p>
                            </th>
                            <th onClick={() => handleSort("registration_date")}>
                                <p>Registration Date <FontAwesomeIcon icon={getSortIcon("registration_date")} className="table-icon" /></p>
                            </th>
                            <th onClick={() => handleSort("role")}>
                                <p>Role <FontAwesomeIcon icon={getSortIcon("role")} className="table-icon" /></p>
                            </th>
                            <th onClick={() => handleSort("address")}>
                                <p>Address <FontAwesomeIcon icon={getSortIcon("address")} className="table-icon" /></p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRows.map((user, index) => (
                            <tr key={index} className={user.role === 'admin' ? 'admin-row' : ''}>
                                <td>{user.role === 'admin' ? <FontAwesomeIcon icon={faUserTie} size="2xs" /> : ''} {user.firstname}</td>
                                <td>{user.lastname}</td>
                                <td>{user.position}</td>
                                <td>{user.email}</td>
                                <td>{user.registration_date}</td>
                                <td>{user.role}</td>
                                <td>{user.address}</td>
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
            </article>
        </>
    );
};

export default UsersTable;