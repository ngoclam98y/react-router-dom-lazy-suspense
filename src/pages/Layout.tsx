import { Outlet } from "react-router-dom";
import Page from "../composables/Page";

const Layout = () => {
  return (
    <Page>
      <div>
        <header>this is header</header>
        <aside>
          <Outlet />
        </aside>
        <footer>this is footer</footer>
      </div>
    </Page>
  );
};

export default Layout;
