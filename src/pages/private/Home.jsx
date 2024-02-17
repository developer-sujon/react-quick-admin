//External lib imports
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Home = () => {
  const { accessToken } = useSelector((state) => state.auth);

  if (accessToken) {
    return <Navigate to="/dashboard" />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default Home;
