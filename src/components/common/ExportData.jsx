//External Lib Import
import { t } from "i18next";
import { Button, OverlayTrigger } from "react-bootstrap";
import { AiOutlineFileExcel, AiOutlineFilePdf } from "react-icons/ai";
import { BsFiletypeCsv } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";

//Internal Lib Import
import exportFromJson from "../../utils/exportFromJson";
import RenderTooltip from "../../utils/RanderTooltip";

const ExportData = ({
  multiImport,
  fileName,
  data,
  setShowToggle,
  showToggle,
  toggleImportModal,
  handlePrint,
}) => {
  const modifiedData = data.map((item) => {
    let modifiedItem = {};
    for (const key in item) {
      if (typeof item[key] === "object") {
        for (const nestedKey in item[key]) {
          modifiedItem = {
            ...modifiedItem,
            [`${key}/${nestedKey}`]: item[key][nestedKey],
          };
        }
      } else {
        modifiedItem = {
          ...modifiedItem,
          [key]: item[key],
        };
      }
    }
    return modifiedItem;
  });
  return (
    <div className="text-sm-end mt-2 mb-3">
      <OverlayTrigger
        placement="top"
        overlay={RenderTooltip({ name: t("visibility column") })}
      >
        <Button
          disabled={data?.length === 0}
          variant="primary"
          className="mb-2 me-1"
          onClick={() => setShowToggle(!showToggle)}
        >
          <CiSettings />
        </Button>
      </OverlayTrigger>

      <OverlayTrigger
        placement="top"
        overlay={RenderTooltip({ name: t("download pdf") })}
      >
        <Button
          disabled={data?.length === 0}
          variant="danger"
          className="mb-2 me-1"
          onClick={handlePrint}
        >
          <AiOutlineFilePdf />
        </Button>
      </OverlayTrigger>

      <OverlayTrigger
        placement="top"
        overlay={RenderTooltip({ name: t("download excel") })}
      >
        <Button
          disabled={modifiedData?.length === 0}
          variant="primary"
          className="mb-2 me-1"
          onClick={() => exportFromJson(modifiedData, fileName, "xls")}
        >
          <AiOutlineFileExcel />
        </Button>
      </OverlayTrigger>
      <OverlayTrigger
        placement="top"
        overlay={RenderTooltip({ name: t("download csv") })}
      >
        <Button
          disabled={modifiedData?.length === 0}
          variant="warning"
          className="mb-2 me-1"
          onClick={() => exportFromJson(modifiedData, fileName, "csv")}
        >
          <BsFiletypeCsv />
        </Button>
      </OverlayTrigger>
    </div>
  );
};

export default ExportData;
