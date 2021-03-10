import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Form from "./components/Form";
import Manage from "./components/Manage";
import Gallary from "./components/Gallary";
import Feedback from "./components/Feedback";
import Home from "./components/Home";
import Order from "./components/Order";

import { Main } from "./components/Main";
import Items from "./components/manage/Items";
const App = () => {
  return (
    <Main>
      <Router>
        <Nav />
        <Route path="/" exact component={Home} />
        <Route path="/order" component={Form} />
        <Route exact path="/manage" component={Manage} />
        <Route path="/gallary" component={Gallary} />
        <Route path="/feedback" component={Feedback} />
        <Route path="/orderfinal" component={Order} />
        <Route path="/manage/:name" component={Items} />
      </Router>
    </Main>
  );
};
export default App;
