import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import githubLogo from '../assets/img/github-mark-white.png'; 
import '../css/index.css';

const Search = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = process.env.REACT_APP_GITHUB_TOKEN;
    if (!token) {
      setError('GitHub token is missing. Please check your environment setup.');
      return;
    }

    const options = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      const res = await axios.get(`https://api.github.com/users/${username}`, options);
      if (res.data) {
        setError(null);
        navigate(`/user/${username}`);
      }
    } catch (error) {
      setError('User not found or there was an issue with the request.');
      console.error('Error fetching user data:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <motion.div className="search-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <img src={githubLogo} alt="GitHub Logo" className="search-logo" />
      <form className="search-form" onSubmit={handleSubmit}>
        <input 
          type="text" 
          className="search-input" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          placeholder="Enter GitHub username"
        />
        <button type="submit" className="search-button">Search</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </motion.div>
  );
};

export default Search;



