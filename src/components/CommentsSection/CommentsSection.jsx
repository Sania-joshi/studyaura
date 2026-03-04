import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { subscribeLikes, addLikeToFirebase, submitCommentToFirebase } from '../../utils/firebase';
import './CommentsSection.css';

export default function CommentsSection({ revealed }) {
  const { theme } = useTheme();
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [submitMsg, setSubmitMsg] = useState('');
  const [showMsg, setShowMsg] = useState(false);
  const [likes, setLikes] = useState(0);
  const [likeBounce, setLikeBounce] = useState(false);

  // Subscribe to likes
  useEffect(() => {
    const unsub = subscribeLikes((count) => setLikes(count));
    return () => { if (unsub) unsub(); };
  }, []);

  const handleSubmit = async () => {
    if (!name.trim() || !message.trim()) return;
    try {
      const success = await submitCommentToFirebase(name.trim(), message.trim(), theme);
      setName('');
      setMessage('');
      if (success) {
        setSubmitMsg('Your aura has been felt! 💫');
      } else {
        setSubmitMsg('Saved locally! (Firebase offline) ✨');
      }
    } catch (e) {
      setSubmitMsg('Saved locally! (Firebase offline) ✨');
    }
    setShowMsg(true);
    setTimeout(() => setShowMsg(false), 3000);
  };

  const handleLike = async () => {
    // Always show immediate feedback
    setLikes(prev => prev + 1);
    setLikeBounce(true);
    setTimeout(() => setLikeBounce(false), 400);
    try {
      await addLikeToFirebase();
    } catch (e) {
      // already incremented locally, that's fine
    }
  };

  return (
    <div className={`comments-section ${revealed ? 'revealed' : ''}`}>
      <div className="comments-title">Leave Your Aura ✨</div>
      <div className="comment-form">
        <input
          type="text" value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Your name" maxLength={40}
        />
        <textarea
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Leave a message..." maxLength={300}
        />
      </div>
      <div className="comment-submit-row">
        <button className="submit-btn" onClick={handleSubmit}>Submit ✨</button>
        <div className="like-wrap">
          <button
            className={`like-btn ${likeBounce ? 'bouncing' : ''}`}
            onClick={handleLike}
          >
            {theme === 'princess' ? '💖' : '⚡'}
          </button>
          <span className="like-count">{likes}</span>
        </div>
      </div>
      <div className={`submit-msg ${showMsg ? 'show' : ''}`}>{submitMsg}</div>
    </div>
  );
}
