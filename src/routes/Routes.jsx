//External Lib Import
import { useEffect, useState } from 'react';
import { useRoutes } from 'react-router-dom';

//Internal Lib Import
import getProtectRoute from './middleware/ProtectRoute';
import publicRoutes from './publicRoutes ';

const Routes = () => {
  const [allRoute, setAllRoute] = useState(publicRoutes);

  useEffect(() => {
    setAllRoute([...getProtectRoute(), ...allRoute]);
  }, []);

  return useRoutes(allRoute);
};

export default Routes;
