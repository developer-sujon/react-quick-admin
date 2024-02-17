// @external
import { Breadcrumb, Button, Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

/**
 * PageTitle
 */
const PageTitle = (props) => {
  const { t } = useTranslation();
  return (
    <Row>
      <Col>
        <div className="page-title-box">
          <div className="page-title-right">
            <Breadcrumb listProps={{ className: "mb-3 pb-0" }}>
              <Breadcrumb.Item href="/dashboard">
                <span style={{ color: "gray" }}>{t("test")}</span>
              </Breadcrumb.Item>

              {props.breadCrumbItems.map((item, index) => {
                return item.active ? (
                  <Breadcrumb.Item className="fw-bold" key={index}>
                    {item.label}
                  </Breadcrumb.Item>
                ) : (
                  <Breadcrumb.Item
                    // className="fw-bold"
                    key={index}
                    href={item.path}
                  >
                    {item.label}
                  </Breadcrumb.Item>
                );
              })}
            </Breadcrumb>
          </div>
          {props.parentLink && (
            <Button as={Link} to={props.parentLink}>
              <i className="dripicons-arrow-thin-left"></i>
            </Button>
          )}
          {/* <h4 className="page-title">{props.title}</h4> */}
        </div>
      </Col>
    </Row>
  );
};

export default PageTitle;
