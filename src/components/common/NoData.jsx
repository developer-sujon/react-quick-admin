//External Lib Import

import { useTranslation } from "react-i18next";

//Internal Lib Import

const NoData = () => {
  /**
   * react i18n internationalization
   */
  const { t } = useTranslation();

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "50vh",
      }}
    >
      <h2 className="text-center">{t("no data found!")}</h2>
    </div>
  );
};

export default NoData;
