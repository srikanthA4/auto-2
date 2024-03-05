import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    // here fetching comments data
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((response) => response.json())
      .then((cms) => {
        //here fetching posts data
        fetch("https://jsonplaceholder.typicode.com/posts")
          .then((response) => response.json())
          .then((posts) => {
            //using filtering method to filter post based on user id
            const filteredPosts = posts.filter((post) => post.userId === +id);
            let filteredComments = [];
            // filtering comments based on fileter post
            cms.map((comm) => {
              filteredPosts.map((po) => {
                po.id === comm.postId && filteredComments.push(comm);
              });
            });
            setComments(filteredComments);// updatings with filter comments 
          });
      });
  }, []);
// rendring commenents 
  return (
    <div>
     {comments.length ? (
        comments.map((todo) => (
          <div>
    
          
          <div className='post-comments-container'>
         <li  className="name-of-comment" key={todo.id}>name :  {todo.name}</li>
          <li className='email-comment' key={todo.id}>email : {todo.email}</li>
          <li className='body-comment' key={todo.id}>body: {todo.body}</li>
          </div>
          </div>
        ))
      ) : (
        <p>No comments are found</p>
      )}
    </div>
  );
};

export default Comments;
