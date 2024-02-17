/* eslint-disable react/no-unknown-property */
//External Lib Import

//Internal Lib Import
import ErrorImg from "../../assets/images/common/error-data.svg";

const ErrorDataLoad = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "70vh",
      }}
    >
      <img top src={ErrorImg} alt="" style={{ width: "100px" }} />
    </div>
  );
};

export default ErrorDataLoad;
