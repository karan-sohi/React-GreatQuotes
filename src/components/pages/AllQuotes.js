import QuoteList from "../quotes/QuoteList";
import useHttp from "../../hooks/use-http";
import { getAllQuotes } from "../../lib/api";
import { useEffect } from "react";
import LoadingSpinner from "../UI/LoadingSpinner";
import NoQuotesFound from "../quotes/NoQuotesFound";

export const DUMMYDATA = [
  {
    id: "m1",
    author: "Karan",
    text: "Learning React is fun!",
  },
  {
    id: "m2",
    author: "Robert Peterson",
    text: "Work hard to succeed!",
  },
];

const AllQuotes = () => {
  const {
    sendRequest,
    status,
    data: loadedQuotes,
    error,
  } = useHttp(getAllQuotes, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

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

  if (status === "completed" && (!loadedQuotes || loadedQuotes.length === 0)) {
    return <NoQuotesFound></NoQuotesFound>;
  }

  return <QuoteList quotes={loadedQuotes}></QuoteList>;
};

export default AllQuotes;
