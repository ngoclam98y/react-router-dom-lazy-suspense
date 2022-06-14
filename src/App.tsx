import "nprogress/nprogress.css";
import React from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { FabllbackProvider } from "./composables/FabllbackProvider";

type LazyLoadHOC = {
  component: React.LazyExoticComponent<any>;
  [x: string]: any;
};

export const LazyLoadComponent: React.FC<LazyLoadHOC> = ({
  component: Component,
  ...props
}) => {
  return (
    <FabllbackProvider>
      {/* <Page> */}
      <Component {...props} />
      {/* </Page> */}
    </FabllbackProvider>
  );
};

const Home = React.lazy(() => import("./pages/Home"));
const About = React.lazy(() => import("./pages/About"));
const Contact = React.lazy(() => import("./pages/Contact"));
const Layout = React.lazy(() => import("./pages/Layout"));

interface Props {
  roles: Array<string>;
}

const RoleRoute: React.FC<Props> = ({ roles }) => {
  const user = { role: "Admin" };

  const userHasRequiredRole = user && roles.includes(user.role) ? true : false;

  if (userHasRequiredRole) {
    return <Outlet />;
  }

  return <h1>Not Found</h1>;
};

function App() {
  return (
    <BrowserRouter>
      <FabllbackProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route element={<RoleRoute roles={["Admin", "User"]} />}>
              <Route
                path="/"
                element={<LazyLoadComponent component={Home} />}
              />
              <Route
                path="about"
                element={<LazyLoadComponent component={About} />}
              />
              <Route
                path="contact"
                element={<LazyLoadComponent component={Contact} />}
              />
            </Route>
          </Route>
          <Route path="*" element={<h1>What the hell</h1>} />
        </Routes>
      </FabllbackProvider>
    </BrowserRouter>
  );
}

export default App;
