import React from "react";

export default function ImageDisplay({ src, loading }) {
  return (
    <div className="image-container">
      {loading ? (
        <div className="loading">Chargement de l'image...</div>
      ) : (
        <img
          src={`${src}?t=${Date.now()}`}
          alt="Face"
          className="face-image"
        />
      )}
    </div>
  );
}
