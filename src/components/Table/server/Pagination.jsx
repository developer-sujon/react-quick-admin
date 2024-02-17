import classNames from "classnames";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import defaultConfig from "../../../config/defaults/pagination";
import debounce from "../../../helpers/debounce";
import {
  handleChangePage,
  handlePageSize,
} from "../../../redux/features/paginationReducer";

const Pagination = ({ sizePerPageList }) => {
  /**
   * react i18n internationalization
   */
  const { t } = useTranslation();

  /**
   * rtk query services & redux reducers
   */
  const dispatch = useDispatch();
  const {
    totalPage,
    page: pageCount,
    limit: limitCount,
  } = useSelector((state) => state.pagination);

  /**
   * react local state
   */

  // const [totalPage, setTotalPage] = useState(totalPageCount);
  const [page, setPage] = useState(pageCount);
  const [limit, setLimit] = useState(limitCount);

  /**
   * custom handler
   */

  /**
   * get filter pages
   */
  const filterPages = useCallback(
    (visiblePages) => {
      return visiblePages.filter((page) => page <= totalPage);
    },
    [totalPage]
  );

  /**
   * handle visible pages
   */
  const getVisiblePages = useCallback(
    (page, total) => {
      if (total < 7) {
        return filterPages([1, 2, 3, 4, 5, 6], total);
      } else {
        if (page % 5 >= 0 && page > 4 && page + 2 < total) {
          return [1, page - 1, page, page + 1, total];
        } else if (page % 5 >= 0 && page > 4 && page + 2 >= total) {
          return [1, total - 3, total - 2, total - 1, total];
        } else {
          return [1, 2, 3, 4, 5, total];
        }
      }
    },
    [filterPages]
  );

  /**
   * custom delay
   */
  const delayedPageSize = useCallback(
    debounce((pageSize) => {
      dispatch(handlePageSize(Number(pageSize)));
    }, defaultConfig.delay),
    []
  );

  const delayedPageChange = useCallback(
    debounce((page) => {
      dispatch(handleChangePage(Number(page)));
    }, defaultConfig.delay),
    []
  );

  /**
   * handle page change
   * @param curPage - current page
   * @returns
   */
  const changePage = (curPage) => {
    if (curPage > totalPage) {
      return;
    }

    const visiblePages = getVisiblePages(curPage, totalPage);
    setVisiblePages(filterPages(visiblePages, totalPage));

    setPage(curPage);
    delayedPageChange(curPage);
  };

  useEffect(() => {
    const visiblePages = getVisiblePages(0, totalPage);
    setVisiblePages(visiblePages);
  }, [totalPage, getVisiblePages]);

  const [visiblePages, setVisiblePages] = useState(
    getVisiblePages(0, totalPage)
  );
  const activePage = page;

  return (
    <div className="d-lg-flex align-items-center text-center pb-1">
      {sizePerPageList.length > 0 && (
        <div className="d-inline-block me-3">
          <label className="me-1">{t("display")} :</label>
          <select
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              delayedPageSize(Number(e.target.value));
              changePage(1);
            }}
            className="form-select d-inline-block w-auto"
          >
            {(sizePerPageList || []).map((pageSize, index) => {
              return (
                <option key={index} value={pageSize.value}>
                  {pageSize.text}
                </option>
              );
            })}
          </select>
        </div>
      )}

      <span className="me-3">
        {t("page")}{" "}
        <strong>
          {page} of {totalPage}
        </strong>{" "}
      </span>

      <span className="d-inline-block align-items-center text-sm-start text-center my-sm-0 my-2">
        <label>{t("go to page")} : </label>
        <input
          type="number"
          value={page}
          min="1"
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) : 1;
            changePage(page);
          }}
          className="form-control w-25 ms-1 d-inline-block"
        />
      </span>

      <ul className="pagination pagination-rounded d-inline-flex ms-auto align-item-center mb-0">
        <li
          key="prevpage"
          className={classNames("page-item", "paginate_button", "previous", {
            disabled: activePage === 1,
          })}
          onClick={() => {
            if (activePage === 1) return;
            changePage(activePage - 1);
          }}
        >
          <a to="#" className="page-link" role="button">
            <i className="mdi mdi-chevron-left"></i>
          </a>
        </li>
        {(visiblePages || []).map((page, index, array) => {
          return array[index - 1] + 1 < page ? (
            <React.Fragment key={page}>
              <li className="page-item disabled d-none d-xl-inline-block">
                <a to="#" className="page-link" role="button">
                  ...
                </a>
              </li>
              <li
                className={classNames(
                  "page-item",
                  "d-none",
                  "d-xl-inline-block",
                  {
                    active: activePage === page,
                  }
                )}
                onClick={() => changePage(page)}
              >
                <a to="#" className="page-link" role="button">
                  {page}
                </a>
              </li>
            </React.Fragment>
          ) : (
            <li
              key={page}
              className={classNames(
                "page-item",
                "d-none",
                "d-xl-inline-block",
                {
                  active: activePage === page,
                }
              )}
              onClick={() => changePage(page)}
            >
              <a to="#" className="page-link" role="button">
                {page}
              </a>
            </li>
          );
        })}
        <li
          key="nextpage"
          className={classNames("page-item", "paginate_button", "next", {
            disabled: activePage === totalPage,
          })}
          onClick={() => {
            if (activePage === totalPage) return;
            changePage(activePage + 1);
          }}
        >
          <a to="#" className="page-link" role="button">
            <i className="mdi mdi-chevron-right"></i>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
