//@ external
import { useMemo, useState } from "react";
import { Badge, Card, Col, OverlayTrigger, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

//@ components
import PageTitle from "../../../components/PageTitle";
import ErrorDataLoad from "../../../components/common/ErrorDataLoad";
import LoadingData from "../../../components/common/LoadingData";
import Table from "../../../components/table/client";

//@ api services
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import {
  useModeratorDeleteMutation,
  useModeratorListQuery,
} from "../../../redux/services/Moderators/moderator.services";
import { formatDate } from "../../../utils/DateFormatter";
import RenderTooltip from "../../../utils/RanderTooltip";
import AlertMessage from "../../../utils/toast/AleartMessage";
import ModeratorCreateUpdate from "./ModeratorCreateUpdate";

const MODERATOR_DEFAULT_VALUE = {
  name: "sujon",
  mobile: "01772703036",
  email: "muhammad7047@gmail.com",
  status: "APPROVED",
};

// main component
const Moderators = () => {
  const { t } = useTranslation();
  const [defaultValues, setDefaultValues] = useState(MODERATOR_DEFAULT_VALUE);
  const [modal, setModal] = useState(false);
  const [editData, setEditData] = useState(false);
  const [moderatorsDelete] = useModeratorDeleteMutation();
  const { data, isLoading, isError } = useModeratorListQuery();

  /**
   * Show/hide the modal
   */
  const addShowModal = () => {
    setEditData(false);
    setDefaultValues(MODERATOR_DEFAULT_VALUE);
    setModal(!modal);
  };

  const toggle = (e) => {
    setModal(!modal);
  };

  /* action column render */
  const ActionColumn = ({ row }) => {
    const edit = () => {
      setEditData(row?.original);
      setDefaultValues(row?.original);
      toggle();
    };
    return (
      <>
        <OverlayTrigger
          placement="top"
          overlay={RenderTooltip({ name: t("update moderators") })}
        >
          <span
            role="button"
            className="action-icon text-warning text-lg me-2"
            onClick={edit}
          >
            <CiEdit />
          </span>
        </OverlayTrigger>

        <OverlayTrigger
          placement="top"
          overlay={RenderTooltip({ name: t("delete moderators") })}
        >
          <span
            role="button"
            className="action-icon text-danger text-lg me-2"
            onClick={() =>
              AlertMessage.Delete(row?.original._id, moderatorsDelete)
            }
            data-toggle="tooltip"
            data-placement="top"
            title={t("delete moderators")}
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
      Header: t("id"),
      accessor: "ndID",
      sort: true,
      Cell: ({ value }) => value,
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
      Header: t("status"),
      accessor: "status",
      sort: true,
      Cell: ({ value }) =>
        value === "APPROVED" ? (
          <Badge bg="success">{value}</Badge>
        ) : (
          <Badge bg="danger">{value}</Badge>
        ),
      classes: "table-user",
    },
    {
      Header: t("createdAt"),
      accessor: "createdAt",
      sort: true,
      Cell: ({ value }) => formatDate(value),
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

  if (isLoading) {
    return (
      <Row className="align-items-center justify-content-center ">
        <Col xs={11}>
          <Card>
            <Card.Body>
              <PageTitle
                breadCrumbItems={[
                  { label: t("moderators"), path: "/moderators", active: true },
                ]}
                title={t("moderators")}
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
                  { label: t("moderators"), path: "/moderators", active: true },
                ]}
                title={t("moderators")}
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
                      label: t("moderators"),
                      path: "/moderators",
                      active: true,
                    },
                  ]}
                  title={t("moderators")}
                />
                <Table
                  columns={columns}
                  data={data}
                  pageSize={10}
                  sizePerPageList={sizePerPageList}
                  isSortable={true}
                  pagination={true}
                  isSelectable={false}
                  isSearchable={true}
                  tableClass="table-striped"
                  theadClass="table-light"
                  searchBoxClass="mt-2 mb-3"
                  addShowModal={addShowModal}
                  tableInfo={{
                    tableName: "moderators",
                    addTitle: "moderators",
                  }}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <ModeratorCreateUpdate
          {...{
            modal,
            setModal,
            toggle,
            editData,
            defaultValues,
          }}
        />
      </>
    );
  }
};

export default Moderators;
