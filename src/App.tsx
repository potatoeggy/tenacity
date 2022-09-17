import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import "./index.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { FilePicker } from "./components/FilePicker";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          
        </Route>
        <Route path="/view"></Route>
      </Switch>
    </Router>
  );
}

export default App;
