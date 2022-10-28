import React, { useEffect, useState } from "react";
import getReviews from "../services/getReviews";
import Comment from "./Comment";

const Comments = ({ id }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await getReviews(id).then((data) => setComments(data.results));
    }
    fetchData();
  }, []); //eslint-disable-line

  //   console.log(comments)
  return (
    <>
      <h1 className="commments-title">Comments Section</h1>
      <ul className="comment-ul">
        {comments.length > 0 ? (
          comments
            .filter((e) => e.content.length < 1000)
            .map((e) => (
              <Comment
                name={e.author_details.name}
                username={e.author}
                avatar={e.author_details.avatar_path}
                date={e.created_at}
                content={e.content}
                rating={e.author_details.rating}
              />
            ))
        ) : (
          <p className="nocom">No comments</p>
        )}
      </ul>
    </>
  );
};

export default Comments;
