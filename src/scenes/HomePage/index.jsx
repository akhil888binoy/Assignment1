import React, { useEffect, useState } from 'react';
import Blob from '../../components/Blob';
import './index.css';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import darkRocket from '../../assets/imagedark.png';
import lightRocket from '../../assets/imagelight.png';

function HomePage() {
  const [isAnimationSupported, setIsAnimationSupported] = useState(true);
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 10}); // Set initial time
  const [timerOn, setTimerOn] = useState('off');
  const [navigate, setNavigate] = useState(false);
  const [email, setEmail] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [emailValid, setEmailValid] = useState(null);
  const [emailMessage, setEmailMessage] = useState('');
  const [registeredEmails, setRegisteredEmails] = useState([]);
  const theme = useSelector((state) => state.theme.theme);
  const [isAnimationWorking, setIsAnimationWorking] = useState(true);


  const handleInputChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(value)) {
      setIsButtonDisabled(false);
      setEmailValid(true);
      setEmailMessage('');
    } else {
      setIsButtonDisabled(true);
      setEmailValid(false);
      setEmailMessage('Invalid email');
    }

    // Revert back to Notify Me button if user starts typing
    if (emailValid === 'confirmed') {
      setEmailValid(null);
    }
  };

  const handleNotifyClick = () => {
    setIsLoading(true);
    setIsButtonDisabled(true);

    setTimeout(() => {
      if (registeredEmails.includes(email)) {
        setEmailMessage('Your email is already in our notify list. Try with another email');
        setEmail('');
        setIsLoading(false);
        setIsButtonDisabled(false);
      } else {
        setRegisteredEmails([...registeredEmails, email]);
        setIsLoading(false);
        setEmailMessage('Email added successfully!');
        setEmailValid('confirmed');

        // Disable button after successful email addition
        setIsButtonDisabled(true);
      }
    }, 2000);
  };
  
  useEffect(() => {
    let interval;
    if (timerOn !== 'off') {
      interval = setInterval(() => {
        if (time.seconds > 0) {
          setTime(prevTime => ({ ...prevTime, seconds: prevTime.seconds - 1 }));
        } else if (time.minutes > 0) {
          setTime(prevTime => ({ ...prevTime, minutes: prevTime.minutes - 1, seconds: 59 }));
        } else if (time.hours > 0) {
          setTime(prevTime => ({ ...prevTime, hours: prevTime.hours - 1, minutes: 59, seconds: 59 }));
        } else {
          clearInterval(interval);
          setTimeout(() => setNavigate(true), 2000); // Delay before navigating
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [time, timerOn]);

  useEffect(() => {
    const animationTest = document.createElement('div');
    animationTest.style.animation = 'rocketMove 1000ms ease-in-out infinite';

    const handleAnimationEnd = () => {
      setIsAnimationWorking(true);
    };

    animationTest.addEventListener('animationend', handleAnimationEnd);

    document.body.appendChild(animationTest);

    setTimeout(() => {
      if (getComputedStyle(animationTest).animationName !== 'rocketMove') {
        setIsAnimationWorking(false);
      }
      document.body.removeChild(animationTest);
    }, 1100); // Slightly longer than the animation duration

    return () => {
      animationTest.removeEventListener('animationend', handleAnimationEnd);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('timerTime', JSON.stringify(time));
  }, [time]);

  useEffect(() => {
    const storedTime = JSON.parse(localStorage.getItem('timerTime'));
    if (storedTime && timerOn !== 'off') {
      setTime(storedTime);
    }
  }, [timerOn]);

  if (navigate) {
    return <Navigate to="/card" />;
  }

  return (
    <div className={theme === 'dark' ? 'dark' : 'light'}>
      <div className="HomePage">
        {!isAnimationSupported ? (
          <>
            <Blob className="blob-1" />
            <Blob className="blob-2" />
          </>
        ) : (
          <>
            <Blob className="blob-1 animate-blob-1" />
            <Blob className="blob-2 animate-blob-2" />
          </>
        )}
        <div className="content">
          <div className="image-heading-container">
            {isAnimationWorking ? (
              <div className="rocket">
                <img 
                  src={theme === 'dark' ? darkRocket : lightRocket} 
                  alt="rocket"
                />
              </div>
            ) : (
              <img 
                src={theme === 'dark' ? darkRocket : lightRocket} 
                alt="rocket" 
              />
            )}
            <h1 className='heading'>Launching New Module Soon!</h1>
          </div>

          <div>
            <p className="p-copy">
              Exciting things are in the works! We're currently <span>Crafting a new feature</span> for you. <br /> Keep an eye out for updates – We're working to make it available soon!
            </p>
          </div>

          <div className='box'>
            <div>
              <h1 className="reveal-heading">
                {emailValid === 'confirmed' ? "You're all set! We'll notify you." : "GET READY FOR THE REVEAL!"}
              </h1>
            </div>
            {timerOn !== 'off' && (
              <div className="timer-container">
                <div className='timeMain'>
                  <div className='time'>{String(time.hours).padStart(2, '0')}  </div> 
                  <span className='h'>Hours</span>
                </div>
                <span className='e'>:</span> 
                <div className='timeMain'>
                  <div className='time'>{String(time.minutes).padStart(2, '0')} </div> 
                  <span className='h'>Minutes</span>
                </div>
                <span className='e'>:</span> 
                <div className='timeMain'>
                  <div className='time'>{String(time.seconds).padStart(2, '0')} </div> 
                  <span className='h'>Seconds</span>
                </div>
              </div>
            )}
          </div>

          <div>
            <p className="ppp">Be the first to know! Share your email and We'll notify you when it's live</p>
            <div className="input-notify-container">
              <input 
                type="text" 
                value={email} 
                onChange={handleInputChange} 
                placeholder="Enter your email"
                disabled={isLoading }
              />
              {emailValid === 'confirmed' ? (
                <button className='btn confirmed' disabled>
                  {theme === 'dark' ? (
                    <span style={{ color: 'black' }}>✔︎</span> // Black tick for dark theme
                  ) : (
                    <span style={{ color: 'white' }}>✔︎</span> // White tick for light theme
                  )}
                </button>
              ) : (
                <button 
                  className='btn' 
                  disabled={isButtonDisabled || isLoading} 
                  onClick={handleNotifyClick}>
                  {isLoading ? <div className="spinner"></div> : 'Notify Me'}
                </button>
              )}
              <button className='btn'  onClick={()=> {
                if(timerOn != 'off'){
                  setTimerOn("off");
                }else {
                  setTimerOn('on');
                }
                
              }}>Timer</button>
            </div>
            {emailMessage && <p className="email-error">{emailMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
