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
          `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${apiKey}&language=en&pageSize=80`,
          { method: 'GET' }
        );
        const data = await response.json();

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

  const topStories = news.slice(0, 5);
  const newVideos = news.slice(5, 10);
  const latestNews = news.slice(10, 15);

  return (
    <div className="dark:bg-gray-900 dark:text-white min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">{category.toUpperCase()} NEWS</h1>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Top Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {topStories.map((article, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded shadow">
                  {article.urlToImage && (
                    <img
                      src={article.urlToImage}
                      alt={article.title}
                      className="w-full h-48 object-cover mb-4 rounded"
                    />
                  )}
                  <h2 className="font-bold mb-2">{article.title}</h2>
                  <p className="text-gray-400 mb-2">{new Date(article.publishedAt).toLocaleDateString()}</p>
                  <p className="mb-4">{article.description}</p>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                  >
                    Read more
                  </a>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Latest News</h2>
            <ul className="space-y-4">
              {latestNews.map((article, index) => (
                <li key={index} className="bg-gray-800 p-4 rounded shadow">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 font-semibold hover:text-blue-400"
                  >
                    {article.title}
                  </a>
                  <p className="text-gray-400">{new Date(article.publishedAt).toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">New Videos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {newVideos.map((article, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded shadow">
                {article.urlToImage && (
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="w-full h-32 object-cover mb-4 rounded"
                  />
                )}
                <h2 className="font-bold mb-2">{article.title}</h2>
                <p className="text-gray-400 mb-2">{new Date(article.publishedAt).toLocaleDateString()}</p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  Watch now
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
