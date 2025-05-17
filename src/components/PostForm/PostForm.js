import React, { useState } from 'react';
import './PostForm.css';

const PostForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
    image: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.image) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onSubmit({
          ...formData,
          imageData: e.target.result
        });
      };
      reader.readAsDataURL(formData.image);
    } else {
      onSubmit(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <h2>Створити нову публікацію</h2>
      
      <div className="form-group">
        <label htmlFor="title">Заголовок:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="content">Вміст:</label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="date">Дата:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="image">Зображення:</label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">Опублікувати</button>
    </form>
  );
};

export default PostForm; 