import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ProvideAuth, useAuth } from "./auth";
// import firebase from "./firebase";
import Home from "./pages";
import Dashboard from "./components/Dashboard";
import SigninPage from "./pages/Signin";

function App() {
  return (
    <>
      <ProvideAuth>
        <Router>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/signin" component={SigninPage} exact />
            <Route path="/dashboard" component={Dashboard} exact />
          </Switch>
        </Router>
      </ProvideAuth>
    </>
  );
}

export default App;
