import { Fragment } from "react";
import {
  SortDownIcon,
  SortIcon,
  SortUpIcon,
} from "@/assets/svgs/sorting-icons/sortingIcons";
import {
  useExpanded,
  useFilters,
  useGlobalFilter,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import GlobalFilter from "@/components/ui-html-components/table/GlobalFilter";

const Table = ({ columns, data, showFilters, tableHeight }) => {
  /**
   * Component States
   */

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    visibleColumns,
    state: { globalFilter },
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      autoResetSortBy: false,
      autoResetPage: false,
      autoResetExpanded: false,
      pagination: false,
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    useRowSelect
  );

  return (
    <section>
      {showFilters && (
        <section className={`flex gap-3 flex-col justify-start  px-2`}>
          {/* the global search section */}
          <GlobalFilter
            pre_global_filtered_rows={preGlobalFilteredRows}
            global_filter={globalFilter}
            setGlobalFilter={setGlobalFilter}
          />

          {/* the filter by role section */}
          <div
            className={`flex flex-col  gap-1 w-fit items-center duration-300 lg:flex-row`}
          >
            {headerGroups.map((headerGroup) =>
              headerGroup.headers.map((column) =>
                column.Filter ? (
                  <div key={column.id}>{column.render("Filter")}</div>
                ) : null
              )
            )}
          </div>
        </section>
      )}

      {/* tabel */}
      <section
        className={`mt-4 flex w-auto flex-col overflow-y-hidden scrollbar-hide  ${
          showFilters ? tableHeight : "h-fit"
        }`}
      >
        <div className="overflow-auto w-full scrollbar-hide border rounded-lg">
          <table
            {...getTableProps()}
            className="min-w-full divide-y divide-gray-200  mx-auto max-w-4xl w-full whitespace-nowrap rounded-lg  bg-white overflow-hidden"
          >
            {/* the table head */}
            <thead className="bg-gray-50">
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      scope="col"
                      className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      <div className="flex items-center justify-between">
                        {column.render("Header")}
                        {/* Add a sort direction indicator */}
                        <span>
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <SortDownIcon className="w-5 h-5 text-c_gray" />
                            ) : (
                              <SortUpIcon className="w-5 h-5 text-c_gray" />
                            )
                          ) : (
                            <SortIcon className="w-5 h-5  text-c_gray opacity-0 group-hover:opacity-100" />
                          )}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            {/* the table body */}
            <tbody {...getTableBodyProps()} className="bg-white duration-300">
              {rows.map((row, i) => {
                // new
                prepareRow(row);
                return (
                  <Fragment key={i}>
                    <tr
                      {...row.getRowProps()}
                      className={`odd:bg-green-200/50`}
                    >
                      {row.cells.map((cell) => {
                        return (
                          <td
                            {...cell.getCellProps()}
                            className="px-6 py-2 whitespace-nowrap max-w-[325px] w-[325px] first-letter:capitalize hover:break-words truncate text-sm"
                            role="cell"
                          >
                            {cell.column.Cell.name === "defaultRenderer" ? (
                              <p className="text-sm text-gray-500 ">
                                {cell.render("Cell")}
                              </p>
                            ) : (
                              cell.render("Cell")
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
};

export default Table;
