import React from "react";
import "./RatingButtons.css";

export default function RatingButtons({ onVote, disabled }) {
  const emojis = ["😡", "😐", "🙂", "😍"];
  return (
    <div className="button-row">
      {emojis.map((emoji, idx) => (
        <button
          key={idx}
          disabled={disabled}
          onClick={() => onVote(idx)}
          className="emoji-button"
        >
          {emoji}
        </button>
      ))}
    </div>
  );
}
