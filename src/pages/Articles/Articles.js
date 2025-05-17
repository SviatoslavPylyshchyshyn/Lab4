import React, { useState, useEffect } from 'react';
import ArticleCard from '../../components/ArticleCard/ArticleCard';
import './Articles.css';

const Articles = () => {
  const initialArticles = [
    {
      id: 1,
      title: "Подорож до Карпат",
      image: process.env.PUBLIC_URL + "/images/Карпати.jpg",
      content: "Карпати - гірське серце України. Хочете дізнатися, куди їхати?",
      moreContent: "Ці гори захоплюють неймовірними краєвидами, багатою культурою та неймовірною природою. Якщо ви хочете відчути справжню гармонію з природою, вам неодмінно варто відвідати Карпати. Тут ви знайдете масу можливостей для активного відпочинку, а також для розслаблення в оточенні мальовничих пейзажів.",
      date: "2024-06-15"
    },
    {
      id: 2,
      title: "Мандрівка до Львова",
      image: process.env.PUBLIC_URL + "/images/Львів.jpg",
      content: "Львів - чудове місто. Дізнайтеся, які місця варто відвідати!",
      moreContent: "Львів - місто з багатою історією, яке має неповторний шарм завдяки своєму старовинному архітектурному стилю та різноманіттю культурних традицій. Тут варто відвідати не лише старовинну площу Ринок, а й інші культурні пам'ятки, як-от Оперний театр, Замок Лева та багато інших.",
      date: "2024-05-20"
    },
    {
      id: 3,
      title: "Поїздка в Чорногорію",
      image: process.env.PUBLIC_URL + "/images/Чорногорія.jpg",
      content: "Чорногорія - курортний рай на Буршливих Балканах. Тут ви знайдете найкрасивіші місця відпочинку.",
      moreContent: "Мальовничі пляжі Чорногорії, багаті на природну красу, чудово поєднуються з величними горами, що робить це місце ідеальним для туристів, які шукають як пляжний відпочинок, так і активні види спорту в горах. Чорногорія має безліч старовинних містечок та чудових курортів.",
      date: "2024-04-10"
    },
    {
      id: 4,
      title: "Відвідини Києва",
      image: process.env.PUBLIC_URL + "/images/Київ.jpg",
      content: "Київ - серце України. Вам варто переглянути це, аби взнати, куди краще вкласти час та гроші у цьому недешевому раю.",
      moreContent: "Київ - це місто, яке поєднує в собі давню історію та сучасний ритм життя. Ви зможете відвідати величезну кількість історичних пам'яток, насолодитися прогулянками по центральних вулицях та площах, а також помилуватися на місто з висоти Андріївського узвозу або Київського монументу.",
      date: "2024-03-05"
    }
  ];

  const [articles, setArticles] = useState(initialArticles);
  const [sortOrder, setSortOrder] = useState('newest'); // 'newest' або 'oldest'

  useEffect(() => {
    // Сортуємо статті при зміні sortOrder
    const sortedArticles = [...initialArticles].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === 'newest'
        ? dateB - dateA
        : dateA - dateB;
    });
    setArticles(sortedArticles);
  }, [sortOrder]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('uk-UA', options);
  };

  return (
    <div className="articles-page">
      <div className="articles-header">
        <h1>Статті про подорожі</h1>
        <div className="sort-controls">
          <label>Сортувати за датою:</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="sort-select"
          >
            <option value="newest">Спочатку нові</option>
            <option value="oldest">Спочатку старі</option>
          </select>
        </div>
      </div>
      <div className="articles-grid">
        {articles.map(article => (
          <ArticleCard
            key={article.id}
            article={{
              ...article,
              date: formatDate(article.date)
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Articles; 