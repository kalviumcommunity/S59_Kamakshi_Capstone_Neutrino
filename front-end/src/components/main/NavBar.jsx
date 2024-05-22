import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState('');
  const [location, setLocation] = useState({ country: 'Loading...' });

  useEffect(() => {
    const now = new Date();
    const formattedDate = new Intl.DateTimeFormat('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(now);
    setDate(formattedDate);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetch(`https://geocode.xyz/${position.coords.latitude},${position.coords.longitude}?json=1`)
            .then((response) => response.json())
            .then((data) => {
              setLocation({
                country: data.country || 'Unknown',
              });
            })
            .catch(() => {
              setLocation({ country: 'Unknown' });
            });
        },
        () => {
          setLocation({ country: 'Unknown' });
        }
      );
    } else {
      setLocation({ country: 'Geolocation not supported' });
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-gray-900 text-white">
      <div className="flex justify-between items-center py-2 px-4 border-b border-gray-700 text-sm">
        <div>
          <span>{location.country}</span> | <span>Eng</span> | <span>{date}</span>
        </div>
        <div className="flex items-center space-x-3">
          <span>Search</span>
          <span className="fab fa-facebook-f"></span>
          <span className="fab fa-twitter"></span>
          <span className="fab fa-instagram"></span>
          <span className="fas fa-user"></span>
          <span>Sign In</span>
        </div>
      </div>
      <nav className="flex justify-between items-center py-4 px-4">
        <div className="text-4xl font-bold text-orange-500">Neu<span className="text-white">Trino</span></div>
        <div className="hidden md:flex space-x-4 font-bold">
          <Link to="/news/politics" className="hover:text-orange-500">POLITICS</Link>
          <Link to="/news/business" className="text-orange-500">BUSINESS</Link>
          <Link to="/news/science" className="hover:text-orange-500">SCIENCE & TECHNOLOGY</Link>
          <Link to="/news/health" className="hover:text-orange-500">HEALTH</Link>
          <Link to="/news/sports" className="hover:text-orange-500">SPORTS</Link>
          <Link to="/news/auto" className="hover:text-orange-500">AUTO</Link>
          <Link to="/news/education" className="hover:text-orange-500">EDUCATION</Link>
          <Link to="/news/lifestyle" className="hover:text-orange-500">LIFESTYLE</Link>
          <Link to="/news/more" className="hover:text-orange-500">MORE</Link>
        </div>
        <div className="hidden md:flex space-x-4">
          <Link to="/registration" className="border border-orange-500 text-orange-500 py-1 px-3">LOGIN</Link>
          <button className="bg-orange-500 py-1 px-3 rounded text-white hover:bg-orange-600">SEARCH</button>
        </div>
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="outline-none">
            <i className="fas fa-bars text-2xl text-orange-500"></i>
          </button>
        </div>
      </nav>
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <ul className="space-y-2 font-bold px-4 pb-4">
          <li><Link to="/news/politics" className="block hover:text-orange-500">POLITICS</Link></li>
          <li><Link to="/news/business" className="block text-orange-500">BUSINESS</Link></li>
          <li><Link to="/news/science" className="block hover:text-orange-500">SCIENCE & TECHNOLOGY</Link></li>
          <li><Link to="/news/health" className="block hover:text-orange-500">HEALTH</Link></li>
          <li><Link to="/news/sports" className="block hover:text-orange-500">SPORTS</Link></li>
          <li><Link to="/news/auto" className="block hover:text-orange-500">AUTO</Link></li>
          <li><Link to="/news/education" className="block hover:text-orange-500">EDUCATION</Link></li>
          <li><Link to="/news/lifestyle" className="block hover:text-orange-500">LIFESTYLE</Link></li>
          <li><Link to="/news/more" className="block hover:text-orange-500">MORE</Link></li>
        </ul>
        <div className="flex flex-col space-y-2 px-4 pb-4">
          <button className="border border-orange-500 text-orange-500 py-1 px-3">E-Paper</button>
          <button className="bg-orange-500 py-1 px-3 rounded text-white hover:bg-orange-600">SUBSCRIBE</button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
