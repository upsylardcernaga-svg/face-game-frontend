import React from "react";

export default function AnimationOverlay({ emoji }) {
  return (
    <div
      className="animation-overlay"
      style={{ fontSize: "50px", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
    >
      {emoji}
    </div>
  );
}
