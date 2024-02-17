//External lib imports
import React, { useState } from 'react';
import { Row, Col, Container, Button, Card, ListGroup, Badge, OverlayTrigger, Tooltip, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { AiOutlineArrowRight, AiOutlineEdit } from 'react-icons/ai';

//Internal lib imports
import Layout from '../../../layout/Layout';
import { useRoleDeleteMutation, useRoleListQuery } from '../../../redux/services/roleService';
import Table from '../../../components/Table/Table';
import { BsTrash } from 'react-icons/bs';
import AleartMessage from '../../../helpers/AleartMessage';
import { Link } from 'react-router-dom';
import DateFormatter from '../../../utils/DateFormatter';

const Role = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useRoleListQuery();

  const [roleDelete] = useRoleDeleteMutation();

  const deleteItem = (id) => {
    AleartMessage.Delete(id, roleDelete);
  };

  const columns = [
    {
      Header: '#',
      accessor: (_, index) => index + 1,
      sort: true,
    },
    {
      Header: t('name'),
      accessor: (d) => (
        <div className="bodySmall">
          <Badge bg="" style={{ backgroundColor: d?.color }} pill>
            {' '}
          </Badge>

          <Badge bg="info" pill>
            <span className="ms-1">{d?.name}</span>
          </Badge>
        </div>
      ),
      sort: true,
    },

    {
      Header: t('create date'),
      accessor: (d) => DateFormatter(d?.createdAt),
      sort: true,
    },
    {
      Header: t('visibility'),
      accessor: (d) => (
        <div className="bodySmall">
          {d?.visibility ? (
            <Badge bg="primary" pill>
              <span className="ms-1">{t('public')}</span>
            </Badge>
          ) : (
            <Badge bg="danger" pill>
              <span className="ms-1"> {t('private')}</span>
            </Badge>
          )}
        </div>
      ),
      sort: true,
    },
    {
      Header: t('action'),
      accessor: (d) => (
        <div className="bodySmall">
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={<Tooltip id="button-tooltip">Edit</Tooltip>}
          >
            <Link to={`/role-create-update?id=${d?.id}`}>
              <Button variant="primary" style={{ padding: '5px 10px' }} className="me-1">
                <AiOutlineEdit />
              </Button>
            </Link>
          </OverlayTrigger>
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={<Tooltip id="button-tooltip">Delete</Tooltip>}
          >
            <Button variant="danger" style={{ padding: '5px 10px' }} onClick={() => deleteItem(d.id)}>
              <BsTrash />
            </Button>
          </OverlayTrigger>
        </div>
      ),
    },
  ];

  const sizePerPageList = [
    {
      text: '5',
      value: 5,
    },
    {
      text: '10',
      value: 10,
    },
    {
      text: '25',
      value: 25,
    },
    {
      text: 'All',
      value: data?.length,
    },
  ];

  return (
    <Layout>
      <Container>
        <Card>
          <Card.Body>
            <Row>
              <Col className="d-flex justify-content-between p-2" sm={12}>
                <h5>{t('role')}</h5>
                <Link to={'/role-create-update'}>
                  <Button size="sm" variant="primary">
                    {t('create role')}
                  </Button>
                </Link>
              </Col>
              <Col sm={12}>
                {isLoading ? (
                  <Spinner size="lg" variant="primary" />
                ) : data?.length ? (
                  <Table
                    columns={columns}
                    data={data}
                    pageSize={5}
                    sizePerPageList={sizePerPageList}
                    isSortable={true}
                    pagination={true}
                  />
                ) : (
                  t('no data found')
                )}
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </Layout>
  );
};

export default Role;
