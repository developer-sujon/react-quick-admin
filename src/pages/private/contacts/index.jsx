//@ external
import { useEffect, useMemo, useState } from "react";
import { Badge, Card, Col, OverlayTrigger, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

//@ components
import PageTitle from "../../../components/PageTitle";
import Table from "../../../components/Table/server";
import ErrorDataLoad from "../../../components/common/ErrorDataLoad";
import LoadingData from "../../../components/common/LoadingData";

//@ api services
import { CiEdit } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getURL } from "../../../helpers/filter/qs";
import { handlePagination } from "../../../redux/features/paginationReducer";
import {
  useContactDeleteMutation,
  useContactListQuery,
  useContactUpdateMutation,
} from "../../../redux/services/contacts/contact.services";
import RenderTooltip from "../../../utils/RanderTooltip";
import AlertMessage from "../../../utils/toast/AleartMessage";
import View from "./View";

// main component
const Contacts = () => {
  const { t } = useTranslation();
  const [modal, setModal] = useState(false);
  const [messageDetails, setMessageDetails] = useState(null);
  const [contactDelete] = useContactDeleteMutation();
  const [contactUpdate] = useContactUpdateMutation();
  const dispatch = useDispatch();

  let statePagination = useSelector((state) => state.pagination);

  const { data, pagination, isLoading, isError } = useContactListQuery(
    getURL(""),
    {
      selectFromResult: ({ data, isLoading, isError }) => {
        return {
          data: data?.data,
          pagination: data?.pagination,
          links: data?.links,
          isLoading,
          isError,
        };
      },
    }
  );

  useEffect(() => {
    if (pagination && Object.keys(pagination).length > 0) {
      dispatch(handlePagination(pagination));
    }
  }, [pagination]);

  /* action column render */
  const ActionColumn = ({ row }) => {
    const view = () => {
      setMessageDetails(row?.original);
      setModal(true);
    };
    return (
      <>
        <OverlayTrigger
          placement="top"
          overlay={RenderTooltip({ name: t("view contact") })}
        >
          <span
            role="button"
            className="action-icon text-success text-lg me-2"
            onClick={view}
            data-toggle="tooltip"
            data-placement="top"
            title={t("view contact")}
          >
            <FaRegEye />
          </span>
        </OverlayTrigger>
        <OverlayTrigger
          placement="top"
          overlay={RenderTooltip({ name: t("update contact") })}
        >
          <span
            role="button"
            className="action-icon text-warning text-lg me-2"
            onClick={() =>
              AlertMessage.StatusUpdate(
                row?.original?._id,
                { PENDING: "PENDING", REPLY: "REPLY" },
                { status: row?.original?.status },
                contactUpdate
              )
            }
          >
            <CiEdit />
          </span>
        </OverlayTrigger>

        <OverlayTrigger
          placement="top"
          overlay={RenderTooltip({ name: t("delete contact") })}
        >
          <span
            role="button"
            className="action-icon text-danger text-lg me-2"
            onClick={() =>
              AlertMessage.Delete(row?.original._id, contactDelete)
            }
            data-toggle="tooltip"
            data-placement="top"
            title={t("delete contact")}
          >
            <MdDeleteOutline />
          </span>
        </OverlayTrigger>
      </>
    );
  };

  // get all columns
  const columns = useMemo(() => [
    {
      Header: "#",
      accessor: "sl",
      sort: true,
      Cell: ({ row }) => row.index + 1,
      classes: "table-user",
    },
    {
      Header: t("name"),
      accessor: "name",
      sort: true,
      Cell: ({ value }) => value,
      classes: "table-user",
    },
    {
      Header: t("mobile"),
      accessor: "mobile",
      sort: true,
      Cell: ({ value }) => value,
      classes: "table-user",
    },
    {
      Header: t("email"),
      accessor: "email",
      sort: true,
      Cell: ({ value }) => value,
      classes: "table-user",
    },
    {
      Header: t("subject"),
      accessor: "subject",
      sort: true,
      Cell: ({ value }) => value,
      classes: "table-user",
    },
    {
      Header: t("status"),
      accessor: "status",
      sort: true,
      Cell: ({ value }) =>
        value === "PENDING" ? (
          <Badge bg="warning">{value}</Badge>
        ) : (
          <Badge bg="danger">{value}</Badge>
        ),
      classes: "table-user",
    },
    {
      Header: t("action"),
      accessor: "action",
      sort: false,
      classes: "table-action",
      Cell: ActionColumn,
    },
  ]);

  // get pagelist to display
  const sizePerPageList = [
    {
      text: t("5"),
      value: 5,
    },
    {
      text: t("10"),
      value: 10,
    },
    {
      text: t("50"),
      value: 50,
    },
  ];

  //Table Data
  const renderTableData = useMemo(() => data || [], [data]);

  if (isLoading) {
    return (
      <Row className="align-items-center justify-content-center ">
        <Col xs={11}>
          <Card>
            <Card.Body>
              <PageTitle
                breadCrumbItems={[
                  { label: t("contact"), path: "/contact", active: true },
                ]}
                title={t("contact")}
              />
              <LoadingData />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  } else if (isError) {
    return (
      <Row className="align-items-center justify-content-center ">
        <Col xs={11}>
          <Card>
            <Card.Body>
              <PageTitle
                breadCrumbItems={[
                  { label: t("contact"), path: "/contact", active: true },
                ]}
                title={t("contact")}
              />
              <ErrorDataLoad />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  } else {
    return (
      <>
        <Row className="align-items-center justify-content-center ">
          <Col xs={11}>
            <Card>
              <Card.Body>
                <PageTitle
                  breadCrumbItems={[
                    {
                      label: t("contact"),
                      path: "/contact",
                      active: true,
                    },
                  ]}
                  title={t("contact")}
                />
                <Table
                  columns={columns}
                  hideBtn={true}
                  data={renderTableData}
                  pageSize={10}
                  sizePerPageList={sizePerPageList}
                  isSortable={true}
                  pagination={pagination}
                  isSelectable={false}
                  isSearchable={true}
                  tableClass="table-striped"
                  theadClass="table-light"
                  searchBoxClass="mt-2 mb-3"
                  tableInfo={{
                    tableName: "contact",
                    addTitle: "contact",
                  }}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {modal && (
          <View message={messageDetails} modal={modal} setModal={setModal} />
        )}
      </>
    );
  }
};

export default Contacts;
