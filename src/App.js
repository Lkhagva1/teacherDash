import Cookies from "js-cookie";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Auth from "./pages/Auth";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Main from "./pages/Main";

import ViewProfile from "./pages/profile/ViewProfile";
import Class2 from "./pages/Matten/Class2";
import Tatten from "./pages/tatten/Tatten";
import Notice from "./pages/notice/Notice";
import Complain from "./pages/complain/Complain";

function App() {
  // const token = useContext(AuthContext);
  const token = Cookies.get("jwt");
  const isLog = Cookies.get("isLoggedIn");
  return (
    <Router>
      {isLog && token ? (
        <Main>
          <Switch>
            <Route exact path="/dashboard">
              <Dashboard />
            </Route>
            <Route exact path="/profile">
              <ViewProfile />
            </Route>
            <Route exact path="/mark">
              <Class2 />
            </Route>
            <Route path="/mark/:id" component={Class2} exact />
            <Route exact path="/attendance">
              <Tatten />
            </Route>
            <Route path="/attendance/:id" component={Tatten} exact />
            <Route exact path="/notice">
              <Notice />
            </Route>
            <Route exact path="/complain">
              <Complain />
            </Route>
            <Redirect to="/dashboard" />
          </Switch>
        </Main>
      ) : (
        <Auth>
          <Switch>
            <Route exact path="/login">
              <Login />
            </Route>
            <Redirect to="/login" />
          </Switch>
        </Auth>
      )}
    </Router>
  );
}

export default App;
