import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MdOutlineComment } from "react-icons/md";
import './Posts.css';
import { Link } from "react-router-dom";


const Conetent = () => {  //define functional comment named conentent 
  const [posts, setPosts] = useState([]);
  
  const { id } = useParams();

  useEffect(() => {
    // Fetch posts and set the state when the component mounts.
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        //filtering  posts   based on user id and update  with equal post 
        const newMatchedPosts = data.filter((post) => post.userId === +id);

        setPosts(newMatchedPosts);
      
      });
    

  }, []);
  
  //rendring commenents 
  return (
    <div>
       <h1>User Posts</h1>
      {posts.length ? (
        posts.map((post) => (
          <div className="post-container" key={post.id}>
            <h2 className="title">{post.title}</h2>
            <p className="body">{post.body}</p>
           
           

          <Link to={`/coments/${post.id}`}> <MdOutlineComment className="icon"/> </Link>
         
          </div>
        ))
      ) : (
        <p>No posts are availabe for this user.</p>
      )}
    </div>
  );
};

export default Conetent;
