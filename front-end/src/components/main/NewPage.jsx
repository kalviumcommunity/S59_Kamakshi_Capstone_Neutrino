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

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6 text-center uppercase">{category} News</h1>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold mb-4">Top Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {news.slice(0, 5).map((article, index) => (
                <div key={index} className="border-b border-gray-700 pb-4 mb-4">
                  {article.urlToImage && (
                    <img
                      src={article.urlToImage}
                      alt={article.title}
                      className="w-full h-48 object-cover mb-2 rounded"
                    />
                  )}
                  <h3 className="text-lg font-semibold mb-1">{article.title}</h3>
                  <p className="text-gray-400 mb-1">{new Date(article.publishedAt).toLocaleDateString()}</p>
                  <p className="mb-2">{article.description}</p>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    Read more
                  </a>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4">Latest News</h2>
            <ul className="space-y-4">
              {news.slice(5, 20).map((article, index) => (
                <li key={index} className="border-b border-gray-700 pb-4">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 text-lg font-semibold hover:underline"
                  >
                    {article.title}
                  </a>
                  <p className="text-gray-400 text-sm">{new Date(article.publishedAt).toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">More News</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {news.slice(20).map((article, index) => (
              <div key={index} className="border-b border-gray-700 pb-4 mb-4">
                {article.urlToImage && (
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="w-full h-32 object-cover mb-2 rounded"
                  />
                )}
                <h3 className="text-lg font-semibold mb-1">{article.title}</h3>
                <p className="text-gray-400 mb-1 text-sm">{new Date(article.publishedAt).toLocaleDateString()}</p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  Read more
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
