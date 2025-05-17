import React, { useState } from 'react';
import './PostForm.css';

const PostForm = ({ onSubmit, disabled }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
    imageData: null
  });
  const [imagePreview, setImagePreview] = useState(null);

  // Функція для стиснення зображення
  const compressImage = (imageData, maxWidth = 800) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = imageData;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Зменшуємо розміри, зберігаючи пропорції
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Конвертуємо в JPEG з якістю 0.7 (70%)
        resolve(canvas.toDataURL('image/jpeg', 0.7));
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    
    if (name === 'image' && files && files[0]) {
      const file = files[0];
      
      // Перевірка розміру файлу (максимум 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Розмір зображення не може перевищувати 5MB');
        e.target.value = '';
        return;
      }

      const reader = new FileReader();
      reader.onload = async (e) => {
        const originalImageData = e.target.result;
        
        try {
          // Стискаємо зображення
          const compressedImageData = await compressImage(originalImageData);
          
          setFormData(prev => ({
            ...prev,
            imageData: compressedImageData
          }));
          setImagePreview(compressedImageData);
        } catch (error) {
          console.error('Помилка при стисненні зображення:', error);
          alert('Помилка при обробці зображення. Спробуйте інше зображення.');
          e.target.value = '';
        }
      };
      reader.readAsDataURL(file);
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
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
        <label htmlFor="content">Текст:</label>
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
        {imagePreview && (
          <div className="image-preview">
            <img src={imagePreview} alt="Попередній перегляд" />
          </div>
        )}
      </div>

      <button type="submit" disabled={disabled}>
        {disabled ? 'Створення...' : 'Опублікувати'}
      </button>
    </form>
  );
};

export default PostForm;