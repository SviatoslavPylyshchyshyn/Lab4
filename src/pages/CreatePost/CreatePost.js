import React from 'react';
import { useNavigate } from 'react-router-dom';
import PostForm from '../../components/PostForm/PostForm';
import './CreatePost.css';

const CreatePost = () => {
  const navigate = useNavigate();

  const handleSubmit = (postData) => {
    // Зберігаємо публікацію в localStorage
    const posts = JSON.parse(localStorage.getItem('posts') || '[]');
    posts.push({
      ...postData,
      id: Date.now(),
      date: new Date(postData.date).toISOString()
    });
    localStorage.setItem('posts', JSON.stringify(posts));
    
    // Перенаправляємо на сторінку з публікаціями
    navigate('/my-posts');
  };

  return (
    <div className="create-post-page">
      <h1>Створити нову публікацію</h1>
      <PostForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreatePost; 