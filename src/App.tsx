import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import "./index.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { FilePicker } from "./components/FilePicker";
import Home from "./pages/home";
import View from "./pages/view";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home></Home>
        </Route>
        <Route path="/view" exact>
          <View></View>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
