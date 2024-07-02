/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';

function Results() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filterText, setFilterText] = useState('');
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);


  const filterResults = (results) => {
    return results.filter(
      (result) =>
        result.indexNumber.toLowerCase().includes(filterText.toLowerCase()) ||
        `${result.firstName} ${result.lastName}`.toLowerCase().includes(filterText.toLowerCase()) ||
        result.department.toLowerCase().includes(filterText.toLowerCase())
    );
  };
  
  const sortResults = (results) => {
    if (!sortColumn) return results;
  
    const sortedResults = [...results].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
  
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  
    return sortedResults;
  };
  
  const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentResults = sortResults(filterResults(results)).slice(indexOfFirstItem, indexOfLastItem);

const totalPages = Math.ceil(results.length / itemsPerPage);

const handleSort = (column, ...otherColumns) => {
  if (sortColumn === column) {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  } else {
    setSortColumn([column, ...otherColumns]);
    setSortDirection('asc');
  }
};


  useEffect(() => {
    const fetchResults = async () => {
      try {
        const resultsCollection = collection(db, 'results');
        const resultsSnapshot = await getDocs(resultsCollection);
        const resultsData = resultsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setResults(resultsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchResults();
  }, []);
  
  return (
    <div>
    <h1>Student Results</h1>
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />
    </div>
    {loading ? (
      <p>Loading...</p>
    ) : error ? (
      <p>Error: {error}</p>
    ) : (
      <>
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort('indexNumber')}>Index Number</th>
              <th onClick={() => handleSort('firstName', 'lastName')}>Name</th>
              <th onClick={() => handleSort('department')}>Department</th>
              <th onClick={() => handleSort('year')}>Year</th>
              <th onClick={() => handleSort('semester')}>Semester</th>
              <th onClick={() => handleSort('totalMarks')}>Total Marks</th>
              <th onClick={() => handleSort('percentage')}>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {currentResults.map((result) => (
              <tr key={result.id}>
                <td>{result.indexNumber}</td>
                <td>{`${result.firstName} ${result.lastName}`}</td>
                <td>{result.department}</td>
                <td>{result.year}</td>
                <td>{result.semester}</td>
                <td>{result.totalMarks}</td>
                <td>{result.percentage}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </>
    )}
  </div>
  )
}

export default Results