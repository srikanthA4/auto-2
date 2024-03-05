

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './PostsComments.css'

const PostsComments = () => {
  const { postId } = useParams();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
      .then(response => response.json())
      .then(data => {
        setTodos(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [postId]);

  return (
    <div>
      <h2>post {postId}'s  comments</h2>
      <ul>
        {todos.map(todo => (<div className='post-comments-container'>
         <li  className="name-of-comment" key={todo.id}>name :  {todo.name}</li>
          <li className='email-comment' key={todo.id}>email : {todo.email}</li>
          <li className='body-comment' key={todo.id}>body: {todo.body}</li>
          </div>
        ))}
        
      </ul>
    </div>
  );
};

export default PostsComments;
