import { t } from "i18next";
import { Button, Modal } from "react-bootstrap";

const CsvImportModal = ({
  showModal,
  setImportedFile,
  toggleImportModal,
  importCsv,
  tableName,
  columnOrder,
  demoFile,
}) => {
  return (
    <Modal
      className="custom-import-modal mt-3"
      show={showModal}
      onHide={toggleImportModal}
    >
      <Modal.Header className="justify-content-center" closeButton>
        <Modal.Title>{t(`import ${tableName}`)}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6 className="mb-3 mt-0">
          {t("labels marked with star are required")}
        </h6>
        <p className="mb-4 f">
          <strong>{t("correct column order is")}</strong>:{columnOrder}
        </p>
        <div className="d-flex justify-content-between">
          <input
            className="form-control d-inline-block w-75"
            type="file"
            accept=".csv"
            onChange={(e) => setImportedFile(e.target.files[0])}
          />
          <a
            href={demoFile}
            download={`demo-${tableName}`}
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="info" className="d-block">
              <i className="dripicons-download me-1" />
              {t("demo")}
            </Button>
          </a>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={importCsv}>
          {t("import")}
        </Button>
        <Button variant="danger" onClick={toggleImportModal}>
          {t("cancel")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CsvImportModal;
