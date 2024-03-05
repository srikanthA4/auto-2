

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './AlbumsPhotos.css'

const AlbumsPhotos = () => {
  const { albumId } = useParams();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
      .then(response => response.json())
      .then(data => {
        setTodos(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [albumId]);

  return (
    <div>
      <h1> Album {albumId}'s Photos</h1>
      
      <ul>
        {todos.map(todo => (
          <div className='photo-container'>
          <li className='photo-title' key={todo.id}>{todo.title}</li>
          <li><img className="image" src={todo.url} alt='image'/></li>
          <li><img className="thumbnail" src={todo.thumbnailUrl} alt='image'/></li>
          </div>
        ))}
        
      </ul>
    </div>
  );
};

export default AlbumsPhotos;