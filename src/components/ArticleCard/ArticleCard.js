import React, { useState } from 'react';
import CommentForm from '../CommentForm/CommentForm';
import CommentList from '../CommentList/CommentList';
import './ArticleCard.css';

const ArticleCard = ({ article }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [comments, setComments] = useState([]);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleReadMore = () => {
    setShowMore(!showMore);
  };

  const handleAddComment = (newComment) => {
    setComments([...comments, newComment]);
  };

  // Формуємо текст для відображення: або базовий контент, або контент + додатковий
  const displayContent = showMore 
    ? article.content + ' ' + article.moreContent 
    : article.content;

  return (
    <div className={`article-card ${isLiked ? 'liked' : ''}`}>
      <h3>{article.title}</h3>
      {article.image && (
        <img src={article.image} alt={article.title} />
      )}
      <div className="date">
        <span>Опубліковано: {article.date}</span>
      </div>
      <div className="content">
        <p>{displayContent}</p>
        {article.moreContent && (
          <button className="read-more" onClick={handleReadMore}>
            {showMore ? 'Згорнути' : 'Читати далі'}
          </button>
        )}
      </div>
      <div className="interactions">
        <button 
          className={`like-button ${isLiked ? 'active' : ''}`}
          onClick={handleLike}
        >
          {isLiked ? '❤️' : '🤍'} {isLiked ? 'Вподобано' : 'Вподобати'}
        </button>
      </div>
      <div className="comments-section">
        <h4>Коментарі</h4>
        <CommentForm onAddComment={handleAddComment} />
        <CommentList comments={comments} />
      </div>
    </div>
  );
};

export default ArticleCard; 