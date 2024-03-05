


import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./todo.css"

const Todos = () => {
  const { userId } = useParams();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`)
      .then(response => response.json())
      .then(data => {
        setTodos(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [userId]);

  return (
    <div>
      <h2>User {userId}'s Todos</h2>
      <ul>
        {todos.map(todo => (
          <li className='todos' key={todo.id}>{todo.title}</li>
        ))}
      
      </ul>
    </div>
  );
};

export default Todos;