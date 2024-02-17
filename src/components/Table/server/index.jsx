/* eslint-disable react/display-name */
/* eslint-disable react/jsx-key */
//External Lib Import
import classNames from "classnames";
import { Fragment, forwardRef, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useExpanded, useRowSelect, useSortBy, useTable } from "react-table";

//Internal Lib Import
// components
import { useCallback } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import emptyImage from "../../../assets/images/logos/empty.png";
import NoData from "../../../components/common/NoData";
import defaultConfig from "../../../config/defaults/pagination";
import debounce from "../../../helpers/debounce";
import { handleSearchTerm } from "../../../redux/features/paginationReducer";
import AlertMessage from "../../../utils/toast/AleartMessage";
import ExportData from "../../common/ExportData";
import PdfToPrint from "../../common/PdfToPrint";
import CsvImportModal from "../../modals/CsvImportModal";
import Pagination from "./Pagination";

// Define a default UI for filtering
const GlobalFilter = ({ searchBoxClass }) => {
  /**
   * react i18n internationalization
   */
  const { t } = useTranslation();

  const [value, setValue] = useState("");

  /**
   * rtk query services & redux reducers
   */
  const dispatch = useDispatch();
  const { totalItems } = useSelector((state) => state.pagination);

  /**
   * custom handler
   */
  const delayedSearch = useCallback(
    debounce((searchValue) => {
      dispatch(handleSearchTerm(searchValue));
    }, defaultConfig.delay),
    []
  );
  const setSearchTerm = (e) => {
    setValue(e.target.value);
    delayedSearch(e.target.value);
  };

  return (
    <div className={classNames(searchBoxClass)}>
      <span className="d-flex align-items-center">
        {t("search")} :{" "}
        <input
          value={value || ""}
          onChange={setSearchTerm}
          placeholder={`${totalItems} ${t("records...")}`}
          className="form-control w-auto ms-1"
        />
      </span>
    </div>
  );
};

const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <>
      <div className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          ref={resolvedRef}
          {...rest}
        />
        <label htmlFor="form-check-input" className="form-check-label"></label>
      </div>
    </>
  );
});

const Table = (props) => {
  /**
   * react i18n internationalization
   */
  const { t } = useTranslation();

  /**
   * React Local State
   */
  const [importedFile, setImportedFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [exportData, setExportData] = useState({});
  const [showToggle, setShowToggle] = useState(false);
  const isSearchable = props["isSearchable"] || false;
  const isSortable = props["isSortable"] || false;
  const pagination = props["pagination"] || false;
  const isSelectable = props["isSelectable"] || false;
  const isExpandable = props["isExpandable"] || false;
  const addShowModal = props["addShowModal"];
  const importFunc = props["importFunc"];
  const tableInfo = props["tableInfo"] || {};
  const data = props["data"] || [];
  const columns = props["columns"];
  const renderRowSubComponent = props["renderRowSubComponent"];
  const {
    tableName,
    addTitle,
    columnOrder,
    demoFile,
    visibility,

    multiImport,
  } = tableInfo || "";
  const deleteMulti = props["deleteMulti"];
  const addWithoutModal = props["addWithoutModal"];
  const extraComponent = props["extraComponent"];
  const hideBtn = props["hideBtn"];
  const addRoute = props["addRoute"];

  /**
   * Rtk mutation & Query
   */
  const store = useSelector((state) => state?.setting?.activeStore?._id);
  const storeName =
    useSelector((state) => state?.setting?.activeStore?.storeName) || "";

  const activeStore = useSelector((state) => state?.setting?.activeStore) || "";

  /**
   * Table Pdf Print
   */
  const printRef = useRef();
  let hiddenColumns = [];

  /**
   * Table UI Setting
   */
  for (const key in visibility) {
    if (visibility[key] === false) {
      hiddenColumns.push(key);
    }
  }

  const dataTable = useTable(
    {
      columns: columns,
      data: data,
      initialState: {
        pageSize: props["pageSize"] || 10,
        hiddenColumns,
      },
      manualPagination: true,
      useRowSelect,
    },
    //isSearchable && useGlobalFilter,
    isSortable && useSortBy,
    isExpandable && useExpanded,
    isSelectable && useRowSelect,
    (hooks) => {
      isSelectable &&
        hooks?.visibleColumns?.push((columns) => [
          // Let's make a column for selection
          {
            id: "selection",
            // The header can use the table's getToggleAllRowsSelectedProps method
            // to render a checkbox
            Header: ({ getToggleAllPageRowsSelectedProps }) => (
              <div>
                <IndeterminateCheckbox
                  {...getToggleAllPageRowsSelectedProps()}
                />
              </div>
            ),
            // The cell can use the individual row's getToggleRowSelectedProps method
            // to the render a checkbox
            Cell: ({ row }) => (
              <div>
                <IndeterminateCheckbox {...row?.getToggleRowSelectedProps()} />
              </div>
            ),
          },
          ...columns,
        ]);
    }
  );

  const multiSelectIds = dataTable?.selectedFlatRows?.map(
    (item) => item.original._id
  );

  const { allColumns, visibleColumns } = dataTable;
  let rows = dataTable?.rows;

  // for import excel modal
  const toggleImportModal = () => {
    setShowModal(!showModal);
  };

  const importCsv = () => {
    const file = importedFile;
    const formData = new FormData();
    formData.append("file", file);
    importFunc({ store: store, postBody: formData });
    toggleImportModal();
  };

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: tableName,
  });

  useEffect(() => {
    if (rows) {
      const transformData = rows?.reduce(
        (acc, current) => {
          let { ...others } = current.original;
          let { ...valueOthers } = current.values;
          acc.original.push(others);
          acc.values.push({
            ...valueOthers,
            reference: others?.reference,
          });
          return acc;
        },
        { original: [], values: [] }
      );

      setExportData(transformData);
    }
  }, [rows]);

  return (
    <>
      <Row>
        <Col sm={5}>
          {!addWithoutModal && !hideBtn && (
            <Button variant="primary" className="me-2" onClick={addShowModal}>
              <i className="mdi mdi-plus-circle me-2"></i>{" "}
              {t(`add ${addTitle}`)}
            </Button>
          )}

          {addWithoutModal && !hideBtn && (
            <Link to={addRoute}>
              <Button variant="primary" className="me-2">
                <i className="mdi mdi-plus-circle me-2"></i>
                {t(`add ${addTitle}`)}
              </Button>
            </Link>
          )}

          {extraComponent && <Row>{extraComponent}</Row>}

          {dataTable?.selectedFlatRows?.length > 0 && (
            <Button
              variant="danger"
              onClick={() =>
                AlertMessage.DeleteMultiple(
                  { ids: multiSelectIds, store },
                  deleteMulti
                )
              }
            >
              <i className="mdi mdi-delete"></i>
            </Button>
          )}
        </Col>
      </Row>

      {showToggle && (
        <div className="d-flex align-content-start flex-wrap  bg-dragula p-2">
          {allColumns?.map((col, i) => {
            return (
              <div key={i} className="me-2">
                <label style={{ cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    {...col.getToggleHiddenProps()}
                    className="me-1"
                  />
                  {col.Header}
                </label>
              </div>
            );
          })}
        </div>
      )}

      <Row>
        <Col sm={6}>
          {isSearchable && (
            <GlobalFilter searchBoxClass={props["searchBoxClass"]} />
          )}
        </Col>

        <Col sm={6} className="px-0">
          {exportData.values && (
            <ExportData
              multiImport={multiImport}
              fileName={tableName}
              data={exportData.values.map((item) => {
                Object.keys(item).forEach(
                  (v) => item[v] == null && delete item[v]
                );
                delete item.sl;
                delete item.action;

                return item;
              })}
              showToggle={showToggle}
              setShowToggle={setShowToggle}
              toggleImportModal={toggleImportModal}
              handlePrint={handlePrint}
            />
          )}
        </Col>
      </Row>

      {/* pdf print */}
      <div style={{ display: "none" }}>
        <PdfToPrint ref={printRef}>
          <div style={{ minHeight: 842 }} className="bg-white">
            {/* store header style */}
            <div className="text-black ">
              <h6 className="text-center">{activeStore?.prayerTitle}</h6>
              <div className="d-flex mt-3 justify-content-center">
                <div className="d-flex">
                  <img
                    src={emptyImage}
                    alt="Logo"
                    style={{
                      width: "70px",
                      height: "70px",
                      borderRadius: "100%",
                    }}
                    className="mx-3 mt-1"
                  />
                  <div>
                    <p className="fs-2 mb-0"> {activeStore?.storeName}</p>
                    <p>{activeStore?.storeSlogan}</p>
                  </div>
                </div>

                <div className=" d-flex mt-1">
                  <div
                    className="vr"
                    style={{
                      color: "black",
                      width: "2px",
                    }}
                  ></div>
                  <div className=" ms-2 ">
                    <p className="mb-0">
                      <span className="fw-bold  ">{t("proprietor")} </span> :
                      {activeStore?.merchant?.name || t("n/a")}
                    </p>
                    <p className="mb-0">
                      <span className="fw-bold  "> {t("location")} </span>:{" "}
                      {activeStore?.upazila + ", " + activeStore?.district ||
                        t("n/a")}
                      ,
                    </p>
                    <p className="mb-0">
                      <span className="fw-bold  "> {t("phone")} </span>:{" "}
                      {activeStore?.mobile || t("n/a")}.
                    </p>
                    <p className="mb-0">
                      <span className="fw-bold  "> {t("email")} </span>:{" "}
                      {activeStore?.email || t("n/a")}
                    </p>
                  </div>
                </div>
              </div>

              <hr
                className="text-info w-75 mx-auto"
                style={{ height: "3px" }}
              />

              <h3 className="text-center mt-3">{t(tableName)}</h3>
              <p className="text-center my-1">
                {new Date().toDateString()} {new Date().toLocaleTimeString()}
              </p>
            </div>

            <table
              {...dataTable.getTableProps()}
              className={classNames(
                "table table-centered table-bordered react-table",
                props["tableClass"]
              )}
            >
              <thead className={props["theadClass"]}>
                {dataTable.headerGroups.map((headerGroup, i) => (
                  <tr key={i} {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column, index) => {
                      if (column.id !== "selection" && column.id !== "action") {
                        return <th key={index}>{column.render("Header")}</th>;
                      }
                    })}
                  </tr>
                ))}
              </thead>

              <tbody {...dataTable.getTableBodyProps()} className="text-black">
                {rows.map((row) => {
                  dataTable.prepareRow(row);
                  return (
                    <Fragment key={row.getRowProps().key}>
                      <tr>
                        {row.cells.map((cell) => {
                          return (
                            <td {...cell.getCellProps()}>
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                      {row.isExpanded && (
                        <tr>
                          <td colSpan={visibleColumns.length}>
                            {renderRowSubComponent({ row })}{" "}
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </PdfToPrint>
      </div>

      {exportData?.values?.length > 0 && (
        <div
          style={{ overflowX: "auto" }}
          className="table-responsive  table-container"
        >
          <table
            {...dataTable.getTableProps()}
            className={classNames(
              "table table-centered react-table",
              props["tableClass"]
            )}
          >
            <thead className={props["theadClass"]}>
              {dataTable.headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => {
                    return (
                      <th
                        {...column.getHeaderProps(
                          column.sort && column.getSortByToggleProps()
                        )}
                        className={classNames({
                          sorting_desc: column.isSortedDesc === true,
                          sorting_asc: column.isSortedDesc === false,
                          sortable: column.sort === true,
                        })}
                      >
                        {column.render("Header")}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>

            <tbody {...dataTable.getTableBodyProps()}>
              {rows.map((row) => {
                dataTable.prepareRow(row);
                return (
                  <Fragment key={row.getRowProps().key}>
                    <tr>
                      {row.cells.map((cell) => {
                        return (
                          <td {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                    {row.isExpanded && (
                      <tr>
                        <td colSpan={visibleColumns.length}>
                          {renderRowSubComponent({ row })}{" "}
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {exportData?.values?.length === 0 && <NoData />}

      {/* {console.log({ bpagination: pagination })} */}

      {pagination && (
        <Pagination
          sizePerPageList={props["sizePerPageList"]}
          paginationInfo={pagination}
        />
      )}

      {/* import file */}
      {tableInfo.multiImport && (
        <CsvImportModal
          {...{
            showModal,
            setImportedFile,
            toggleImportModal,
            importCsv,
            tableName,
            columnOrder,
            demoFile,
          }}
        />
      )}
    </>
  );
};

export default Table;
