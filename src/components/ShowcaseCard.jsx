import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import './ShowcaseCard.css';
import { useSelector } from 'react-redux';

function ShowcaseCard() {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(true);
  const theme = useSelector((state) => state.theme.theme);

  console.log(theme)

  useEffect(() => {
    // Auto-redirect after confetti animation
    const confettiDuration = 5000; // Assuming confetti runs for 5 seconds
    const redirectDelay = 3000; // 3-second delay after confetti

    const totalDelay = confettiDuration + redirectDelay;

    const timeoutId = setTimeout(() => {
      navigate('/new-module-page');
    }, totalDelay);

    return () => clearTimeout(timeoutId);
  }, [navigate]);

  useEffect(() => {
    // Redirect immediately if page is refreshed
    window.addEventListener('beforeunload', () => {
      navigate('/new-module-page');
    });

    return () => {
      window.removeEventListener('beforeunload', () => {
        navigate('/new-module-page');
      });
    };
  }, [navigate]);

  const handleCTAClick = () => {
    navigate('/new-module-page');
  };

  return (
    <div className={theme === 'dark' ? 'dark' : 'light'}>
    <div className="showcase-card-container">
      {showConfetti && <Confetti recycle={false} run={true} numberOfPieces={200} />}
      <div className="showcase-card">
        <h1 className="showcase-title">We're Live Now!</h1>
        <p className="showcase-description">
        Our new feature is now  <span>Live and ready</span> for you <br /> to explore. Go ahead and give it a try
        </p>
        <button className="cta-button" onClick={handleCTAClick}>
          Explore Now
        </button>
      </div>
    </div>
    </div>
  );
}

export default ShowcaseCard;
