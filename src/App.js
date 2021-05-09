import "./App.css";
import Navbar from "./components/navbar";
import Home from "./components/home";
import Find from "./components/find";
import Guidelines from "./components/guidelines";
import Certificate from "./components/certificate";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar></Navbar>
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/find" exact component={Find}></Route>
          <Route path="/certificate" component={Certificate}></Route>
          <Route path="/guidelines" exact component={Guidelines}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
