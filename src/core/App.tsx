import React, { FC } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { BREAKPOINTS } from "@mollycule/lattice";

import Home from "@scenes/Home";

const App: FC = () => (
  <ThemeProvider
    theme={{
      breakpoints: BREAKPOINTS,
      colors: {
        subText: "#a9a9a9",
        borderColor: "#e1e1e1",
      },
      shadows: {
        card: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
      },
    }}
  >
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </Router>
  </ThemeProvider>
);

export default App;
