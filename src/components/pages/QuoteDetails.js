import { Link, useParams, useRouteMatch } from "react-router-dom";
import { Fragment, useEffect } from "react";
import { Route } from "react-router-dom";
import Comments from "../comments/Comments";
import HighlightedQuote from "../quotes/HighlightedQuote";
import NoQuotesFound from "../quotes/NoQuotesFound";
import useHttp from "../../hooks/use-http";
import { getSingleQuote } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";

const QuoteDetails = () => {
  const params = useParams();
  const {quoteId} = params
  const match = useRouteMatch();
  const {sendRequest, status, error, data: loadedQuote} = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner></LoadingSpinner>
      </div>
    );
  }

  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  if (!loadedQuote.text) {
    return <NoQuotesFound></NoQuotesFound>;
  }

  if (status === "completed" && (!loadedQuote || loadedQuote === null)) {
    return <NoQuotesFound></NoQuotesFound>;
  }

  return (
    <Fragment>
      <HighlightedQuote
        text={loadedQuote.text}
        author={loadedQuote.author}
      ></HighlightedQuote>
      <Route path={`${match.path}`} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments></Comments>
      </Route>
    </Fragment>
  );
};

export default QuoteDetails;
