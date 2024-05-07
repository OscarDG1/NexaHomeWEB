import React from 'react';
import NavigationBar from './NavigationBar';
import instagramIcon from '../assets/instagram.png';
import tiktokIcon from '../assets/tiktok.png';
import twitterIcon from '../assets/twitter.png';
import '../styles/socialMedia.css';

const SocialMediaPage = () => {
  return (
    <div>
      <NavigationBar />
      <div className="social-media-icons">
        <div className="social-media-icon">
          <a href="https://www.instagram.com/nexa.home_/" target="_blank" rel="noopener noreferrer">
            <img src={instagramIcon} alt="Instagram" />
          </a>
          <p className="social-media-label">Instagram</p>
        </div>
        <div className="social-media-icon">
          <a href="https://www.tiktok.com/@nexa.home_" target="_blank" rel="noopener noreferrer">
            <img src={tiktokIcon} alt="TikTok" />
          </a>
          <p className="social-media-label">TikTok</p>
        </div>
        <div className="social-media-icon">
          <a href="https://twitter.com/NexaHome_" target="_blank" rel="noopener noreferrer">
            <img src={twitterIcon} alt="Twitter" />
          </a>
          <p className="social-media-label">Twitter</p>
        </div>
      </div>
    </div>
  );
}

export default SocialMediaPage;
