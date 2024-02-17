//External Lib Import
import { lazy, Suspense } from "react";

//Internal Lib Import
import { RoleEnum } from "../common/enum/role.enum";
import LazyLoader from "../components/LazyLoader";
import Layout from "../layout/Layout";

const Home = lazy(() => import("../pages/private/Home"));
const Dashboard = lazy(() => import("../pages/private/Dashboard"));
const Contacts = lazy(() => import("../pages/private/contacts"));
const Moderators = lazy(() => import("../pages/private/Moderators"));

const LazyLoading = ({ children }) => {
  return <Suspense fallback={<LazyLoader />}>{children}</Suspense>;
};

const privateRoutes = [
  {
    path: "/",
    element: (
      <LazyLoading>
        <Home />
      </LazyLoading>
    ),
    roles: [RoleEnum.ALL],
    accessPermission: null,
  },
  {
    path: "/dashboard",
    element: (
      <LazyLoading>
        <Dashboard />
      </LazyLoading>
    ),
    roles: [RoleEnum.ALL],
    accessPermission: null,
  },
  {
    path: "/moderators",
    element: (
      <LazyLoading>
        <Layout>
          <Moderators />
        </Layout>
      </LazyLoading>
    ),
    roles: [RoleEnum.ALL],
    accessPermission: null,
  },
  {
    path: "/contacts",
    element: (
      <LazyLoading>
        <Layout>
          <Contacts />
        </Layout>
      </LazyLoading>
    ),
    roles: [RoleEnum.ALL],
    accessPermission: null,
  },
];

export default privateRoutes;
