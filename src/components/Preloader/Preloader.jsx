import { useState, useEffect } from 'react';
import './Preloader.css';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setLoading(false); // Triggers fade out
    }, 1500);

    const timer2 = setTimeout(() => {
      setVisible(false); // Removes from DOM
    }, 2000); // 1500 + 500ms transition

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (!visible) return null;

  return (
    <div id="preloader" className={!loading ? 'hidden' : ''}>
      <div className="preloader-content">
        <div className="preloader-logo">BAHIR</div>
        <p className="preloader-text">Bangladesh Academy of Health Innovation & Research</p>
        <div className="preloader-bar">
          <div className="preloader-fill"></div>
        </div>
      </div>
    </div>
  );
}
