import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faSortUp, faSortDown, faUserTie, faTimes, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

import { getItemWithExpiration } from "../../../../../Assets/Variables/functions";
import { API_BASE_URL } from "../../../../../Assets/Variables/const";

const UsersTable = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filterUsername, setFilterUsername] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });
    const rowsPerPage = 10;
    const tableRef = useRef(null);

    const TOKEN = getItemWithExpiration("auth");

    /**
     * Fetch all users from the database
     * @returns {Promise<void>}
     * @param {array} users
     * 
     */
    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch(API_BASE_URL + "users/getAllUsers",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${TOKEN}`
                        }
                    }
                );
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error(
                    "Erreur lors de la récupération des utilisateurs:",
                    error
                );
            }
        }
        fetchUsers();
    }, [users, TOKEN]);

    /**
     * Filter and sort users
     * @returns {Promise<void>}
     * @param {array} filteredData
     * @param {function} handleClearFilter
     */
    const filteredData = users.filter(user =>
        user.username.toLowerCase().includes(filterUsername.toLowerCase())
    );
    const handleClearFilter = () => {
        filterUsername("");
    };


    /**
     * Sort table by key
     * @returns {Promise<void>}
     * @param {number} key
     * @param {string} direction
     * @param {array} sortedData
     * @param {function} handleSort
     * @param {function} getSortIcon
     */
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

    /**
     * Pagination
     * @returns {Promise<void>}
     * 
     * @param {number} indexOfLastRow
     * @param {number} indexOfFirstRow
     * @param {array} currentRows
     * @param {number} totalPages
     */
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

    /**
     * Handle scroll event
     * @returns {Promise<void>}
     */
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

    /**
     * Delete user
     * @returns {Promise<void>}
     * @param {event} e
     * @param {number} userId
     * @param {string} username
     * 
     */
    const handleDelete = async (e, userId, username) => {
        e.preventDefault();
        const confirmed = window.confirm(
            `Êtes-vous sûr de vouloir supprimer le profil de ${username} ?`
        );
        if (confirmed) {
            const res = await fetch(`${API_BASE_URL}users/deleteUser?id=${encodeURIComponent(userId)}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${TOKEN}`,
                },
            });
            await res.json();
        }
    };

    /**
     * Add event listener to table
     * @returns {Promise<void>}
     */
    useEffect(() => {
        const table = tableRef.current;
        if (table) {
            table.addEventListener("scroll", handleScroll);
            return () => {
                table.removeEventListener("scroll", handleScroll);
            };
        }
    }, []);

    return (
        <>
            <article className="allUsers-article">
                <h3>Liste des utilisateurs</h3>
                <div className="filter-container">
                    <input
                        type="text"
                        placeholder="Filtrer par nom d'utilisateur"
                        value={filterUsername}
                        onChange={(e) => setFilterUsername(e.target.value)}
                    />
                    <button onClick={handleClearFilter} className={filterUsername ? "clear-filter-btn" : "hidden"} >
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>
                <Link to="/equipe/creer-un-compte" className="create-account-link"><FontAwesomeIcon icon={faPlus} style={{ marginRight: '10px' }} />Ajouter un utilisateur</Link>
                <table ref={tableRef}>
                    <thead>
                        <tr>
                            <th onClick={() => handleSort("username")}>
                                <p>Nom d'utilisateur <FontAwesomeIcon icon={getSortIcon("username")} className="table-icon" /></p>
                            </th>
                            <th onClick={() => handleSort("profil")}>
                                <p>Type de profil <FontAwesomeIcon icon={getSortIcon("profil")} className="table-icon" /></p>
                            </th>
                            <th>
                                <p>Supprimer</p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRows.map((user, index) => (
                            <tr key={index} className={user.profil === 'admin' ? 'admin-row' : ''}>
                                <td>{user.profil === 'admin' ? <FontAwesomeIcon icon={faUserTie} size="2xs" /> : ''} {user.username}</td>
                                <td>{user.profil}</td>
                                <td>
                                    <FontAwesomeIcon icon={faTrash}
                                        onClick={(e) => handleDelete(e, user.id, user.username)}
                                        className="delete-btn" />
                                </td>
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