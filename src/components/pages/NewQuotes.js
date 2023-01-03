import QuoteForm from "../quotes/QuoteForm";
import { useHistory } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { addQuote } from "../../lib/api";
import { useEffect } from "react";

const NewQuote = (props) => {
  const { sendRequest, status } = useHttp(addQuote);
  const history = useHistory();

  useEffect(() => {
    if (status === 'completed') {
        history.push('/quotes');
    }
  }, [status, history])

  const submithandler = (quoteData) => {

    sendRequest(quoteData)
    history.push("/quote");
  };
  return <QuoteForm isLoading= {status === 'pending'} onAddQuote={submithandler}></QuoteForm>;
};

export default NewQuote;
