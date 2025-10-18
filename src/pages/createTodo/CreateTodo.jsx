import React, { useState } from 'react';
import './CreateTodo.css';
import EmojiPicker from 'emoji-picker-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateTodo.css'
const CreateTodo = () => {
  const [todoData, setTodoData] = useState({
    title: '',
    priority: 'low',
    emoji: '😁',
  });

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const navigate = useNavigate();
    const addTodo = async (e) => {
    e.preventDefault();
    const response = await axios.post('http://localhost:3000/todos', todoData);

      if (response) {
        alert(response.data.message);

        setTimeout(() => {
            navigate('/');
        }, 2000);
      }
  };


  return (
    <div className="container">
      <h2>Create Todo</h2>
      
      <form>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={todoData.title}
            onChange={(e) => setTodoData({ ...todoData, title: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Priority:</label>
          <select
            value={todoData.priority}
            onChange={(e) => setTodoData({ ...todoData, priority: e.target.value })}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="form-group">
            <label>Emoji:</label>
            <span className="emoji-preview">{todoData.emoji}</span>
          <button
            className="emoji-button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            type="button">
            Select Emoji
          </button>

         
            <EmojiPicker
              onEmojiClick={(emojiObject) => {
                setTodoData({ ...todoData, emoji: emojiObject.emoji });
                setShowEmojiPicker(false); 
                
              }}
              open={showEmojiPicker}
            />
        </div>

        <button className='add-todo-button' onClick={addTodo}>Create Todo</button>
      </form>
    </div>
  );
};

export default CreateTodo;
