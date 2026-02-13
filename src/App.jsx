import React, { useState, useRef } from "react"; // Added useRef
import { motion, AnimatePresence } from "framer-motion";
import { config } from "./Config";
import "./App.css";
import image2 from './assets/bubu-dudu-sseeyall.gif';
import image1 from './assets/mocha-bear-hearts.gif'; 


import musicFile from './assets/Nee-Kavithaigala.mp3'; 

function App() {
  const [noLabel, setNoLabel] = useState(config.content.noButtonText);
  const [noOffset, setNoOffset] = useState({ x: 0, y: 0 }); 
  const [hoveredOnce, setHoveredOnce] = useState(false);
  const [showHoverPopup, setShowHoverPopup] = useState(false);
  const [view, setView] = useState("home"); 

  // 2. Create a reference for the audio element
  const audioRef = useRef(null);

  const handleNoEnter = () => {
    if (!hoveredOnce) {
      setShowHoverPopup(true);
      setHoveredOnce(true);
    } else {
      const x = (Math.random() - 0.5) * 400; 
      const y = (Math.random() - 0.5) * 400;
      setNoOffset({ x, y });
      
      const texts = ["No! ❌", "please 👉👈", "Sorry 🙏"];
      setNoLabel(texts[Math.floor(Math.random() * texts.length)]);
    }
  };

  // 3. Function to play music and change view
  const handleOpenReason = () => {
    setView("letter");
    if (audioRef.current) {
      audioRef.current.play().catch(err => {
        console.log("Music playback failed. Browsers require user interaction first.", err);
      });
    }
  };

  // 4. Function to stop music when going back (Optional)
  const handleBack = () => {
    setView("success");
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset to start
    }
  };

  
  if (view === "letter") {
    return (
      <div className="valentine-root">
        {/* Hidden Audio Element */}
        <audio ref={audioRef} src={musicFile} loop />

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card letter-card"
        >
          <h2 className="letter-title">{config.letter.title}</h2>
          <div className="letter-content">
            {config.letter.content.map((paragraph, index) => (
              <p key={index} className="letter-text">{paragraph}</p>
            ))}
          </div>
          <p className="letter-signature">{config.letter.signature}</p>
          
          <button className="btn yes" onClick={handleBack}>
            Back❤️
          </button>
        </motion.div>
      </div>
    );
  }

  // --- VIEW: SUCCESS ---
  if (view === "success") {
    return (
      <div className="valentine-root">
        {/* Keep audio element here so it can be triggered */}
        <audio ref={audioRef} src={musicFile} loop />

        <motion.div 
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          className="card"
        >
          <h1 className="yay">I love you so much!❤️</h1>
          <img src={image2} alt="bear" className="card-image" />
          
          <div className="success-buttons">
            <button className="btn reason-btn" onClick={handleOpenReason}>
              Reason to choose you 💌
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // --- VIEW: HOME ---
  return (
    <div className="valentine-root">
      <motion.div className="card">
        <img src={image1} alt="bear" className="card-image" />
        <h1 className="title">{config.content.title}</h1>
        
        <div className="choices">
          <motion.button
            className="btn yes"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setView("success")}
          >
            {config.content.yesButtonText}
          </motion.button>

          <motion.button
            className="btn no"
            onMouseEnter={handleNoEnter}
            animate={{ x: noOffset.x, y: noOffset.y }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {noLabel}
          </motion.button>
        </div>
      </motion.div>
      <AnimatePresence>
        {showHoverPopup && (
          <motion.div 
            className="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="popup"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
            >
              <p className="popup-text">Wait! Don't say No yet... 🥺</p>
              <button 
                className="okay-btn" 
                onClick={() => setShowHoverPopup(false)}
              >
                Think about it Dear❤️
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;