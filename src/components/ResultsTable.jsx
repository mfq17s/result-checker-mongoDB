/* eslint-disable no-unused-vars */
import React from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import PropTypes from "prop-types";

const ResultsTable = ({ columns, data, searchQuery }) => {

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    gotoPage,
    pageCount,
    pageOptions,
    state, // Access state here
    setGlobalFilter,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 5 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  
  const { pageIndex } = state; // Destructure pageIndex from state here
  

  React.useEffect(() => {
    setGlobalFilter(searchQuery);
  }, [searchQuery]);

  return (
    <>
      <table {...getTableProps()} className="w-full">
        <thead>
          {headerGroups.map((headerGroup, headerGroupIndex) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              key={`header-group-${headerGroupIndex}`}
            >
              {headerGroup.headers.map((column, columnIndex) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="px-4 py-2 bg-gray-200 text-gray-800 font-bold text-left"
                  key={`header-column-${columnIndex}`}
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, rowIndex) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={`table-row-${rowIndex}`}>
               {row.cells.map((cell, cellIndex) => (
  <td {...cell.getCellProps()} className="px-4 py-2 border" key={`table-cell-${cellIndex}`}>
    {cell.render('Cell', { value: cell.value })}
  </td>
))}

              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="mt-4">
        <button
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
          className="mr-2 "
        >
          {"<<"}
        </button>
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className="mr-2 "
        >
          {"<"}
        </button>
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className="mr-2"
        >
          {">"}
        </button>
        <button
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
          className=""
        >
          {">>"}
        </button>
        <span className="ml-4">
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
      </div>
    </>
  );
};

ResultsTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      Header: PropTypes.string.isRequired,
      accessor: PropTypes.string.isRequired,
      Cell: PropTypes.func,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  searchQuery: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired, 
};

export default ResultsTable;
