import { useRef } from "react";

import classes from "./NewCommentForm.module.css";
import useHttp from "../../hooks/use-http";
import { addComment } from "../../lib/api";
import { useEffect } from "react";

const NewCommentForm = (props) => {
  const commentTextRef = useRef();
  const { sendRequest, status, error, data } = useHttp(addComment);
  const { onAddedComment } = props;

  useEffect(() => {
    if (status === "completed" && !error) {
      onAddedComment();
    }
  }, [status, error, onAddedComment]);

  const submitFormHandler = (event) => {
    event.preventDefault();
    const comment = commentTextRef.current.value;

    sendRequest({ commentData: { text: comment }, quoteId: props.quoteId });
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor="comment">Your Comment</label>
        <textarea id="comment" rows="5" ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className="btn" onClick={submitFormHandler}>Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
