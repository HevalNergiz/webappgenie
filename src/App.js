import React from "react";
import Signup from "./pages/Signup";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import PrivateRoute from "./routes/PrivateRoute";
import ForgotPassword from "./pages/ForgotPassword";
import UpdateProfile from "./pages/UpdateProfile";
import NewProject from "./pages/NewProject";
import AddComponents from "./pages/AddComponents";
import Results from "./pages/Results";
import "./styles/global.css";

function App() {
  return (
    <Container className="d-flex align-items-start justify-content-center py-5 custom-container">
      <div className="w-100">
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <PrivateRoute path="/new-project/:projectId" component={NewProject} />
              <PrivateRoute
                path="/add-components/:projectId"
                component={AddComponents}
              />
              <PrivateRoute path="/results/:projectId" component={Results} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;
