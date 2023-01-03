import { Switch, Route, Redirect } from "react-router-dom";
import QuoteDetails from "./components/pages/QuoteDetails";
import AllQuotes from "./components/pages/AllQuotes";
import NewQuote from "./components/pages/NewQuotes";
import Layout from "./components/layout/Layout";
import MainNavigation from "./components/layout/MainNavigation";
import { Fragment } from "react";
import NotFound from "./components/pages/NotFound";

function App() {
  return (<Fragment>
<MainNavigation>
</MainNavigation>
  <Switch>
    <Route path="/" exact>
      <Redirect to="/quote">/</Redirect>
    </Route>
    <Route path="/quote" exact>
      <AllQuotes />
    </Route>
    <Route path="/new-quote">
      <NewQuote></NewQuote>
    </Route>
    <Route path="/quote/:quoteId">
      <QuoteDetails></QuoteDetails>
    </Route>
    <Route path="*">
      <NotFound/>
    </Route>
  </Switch>
  </Fragment>
    
  );
}

export default App;
