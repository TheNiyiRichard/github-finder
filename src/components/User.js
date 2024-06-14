import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import '../css/index.css';

const User = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = process.env.REACT_APP_GITHUB_TOKEN;
      const options = {
        headers: { Authorization: `Bearer ${token}` },
      };

      try {
        const userRes = await axios.get(`https://api.github.com/users/${username}`, options);
        setUserData(userRes.data);
        
        const reposRes = await axios.get(`https://api.github.com/users/${username}/repos`, options);
        setRepos(reposRes.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [username]);

  if (!userData) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <motion.div className="user-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="user-profile">
        <img src={userData.avatar_url} alt={userData.login} className="user-avatar" />
        <h1 className="user-login">{userData.login}</h1>
        <p className="user-bio">{userData.bio}</p>
        <div className="user-stats">
          <p><strong>Repositories:</strong> {userData.public_repos}</p>
          <p><strong>Followers:</strong> {userData.followers}</p>
          <p><strong>Following:</strong> {userData.following}</p>
        </div>
        <a href={userData.html_url} target="_blank" rel="noopener noreferrer" className="profile-button">
          View Profile on GitHub
        </a>
      </div>

      <h2 className="repos-title">Repositories</h2>
      <ul className="repos-list">
        {repos.map((repo) => (
          <li key={repo.id} className="repo-item">
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default User;
