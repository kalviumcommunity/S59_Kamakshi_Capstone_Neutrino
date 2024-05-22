import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const NewsPage = () => {
  const { category } = useParams();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${apiKey}&language=en&pageSize=100`,
          { method: 'GET' }
        );
        const data = await response.json();

        //console.log(data);

        if (data.articles && Array.isArray(data.articles)) {
          setNews(data.articles);
        } else {
          setNews([]);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        setError('Failed to fetch news');
        setLoading(false);
      }
    };

    fetchNews();
  }, [category, apiKey]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="dark:bg-gray-900 dark:text-white min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">{category.toUpperCase()} NEWS</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {news.map((article, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded shadow">
            <h2 className="font-bold">{article.title}</h2>
            <p>{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-orange-500">
              Read more
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsPage;

