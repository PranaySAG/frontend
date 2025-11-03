import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import delImg from '../../assets/delete.png';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();
  const [warning, setWarning] = useState(true);

  const handleSubmit = () => {
    navigate('/create');
  }
  const fetchTodos = async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}todos`);
      setTodos(response.data.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

    const deleteTodo = async (id) => {
    const response = await axios.delete(`${import.meta.env.VITE_API_URL}todos/${id}`);
    if (response) {
      alert(response.data.message);
      fetchTodos();
    }
    };

  return (
  <div className='main-container'>
      {warning && (
        <div className="warning">
          <p>Hosted on Render (free tier). May take a few seconds to wake up.</p>
          <span className="close" onClick={() => setWarning(false)}>❌</span>
        </div>
      )}
  
    <div className='container'>
      <h1 className='title'>Todo List</h1>
        {todos.map((todo) => {
          const { id, title, completed, priority } = todo;
          return (
            <div key={id} className='todo-item'>
              <div className={`todo-title ${completed ? 'todo-done' : ''}`}>
                <h2>{todo.emoji} {title}</h2>
              </div>
               
              <div className='take-action'>
                <div>
                  <p className='priority'>Priority: {priority}</p>
                  <p className='created-at'>Created At: {new Date().toLocaleString()}</p>
              </div>
              <div>
                <button className='del-btn' onClick={() => deleteTodo(id)}> <img src={delImg} alt="Delete"/></button> 
              </div>
              </div>

            </div>
          );
        })}
        <div className="add-todo-button">
          <button onClick={handleSubmit} className="btn">Add Todo</button>
        </div>
    </div>
  </div>
  );
};

export default Home;
