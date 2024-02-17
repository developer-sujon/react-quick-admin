//External Lib Import
import { useSelector } from "react-redux";

const ApiLoad = () => {
  const { isLoading } = useSelector((state) => state.setting);

  return (
    <div className={isLoading ? "LoadingOverlay" : "d-none"}>
      <div className="loading__overlay">
        <div className="indeterminate"></div>
      </div>
    </div>
  );
};

export default ApiLoad;
