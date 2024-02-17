import React from "react";
import { Button, Modal } from "react-bootstrap";

function View({ message, modal, setModal }) {
  const initModal = () => {
    return setModal(!modal);
  };

  return (
    <>
      <Modal show={modal}>
        <Modal.Header closeButton onClick={initModal}>
          <Modal.Title>Name: {message?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message?.message}</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={initModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default View;
