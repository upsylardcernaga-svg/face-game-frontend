import React, { useEffect, useState } from "react";
import "./App.css";

import ImageDisplay from "./components/ImageDisplay";
import RatingButtons from "./components/RatingButtons";
import AnimationOverlay from "./components/AnimationOverlay";

const BACKEND = "http://localhost:8000";

export default function App() {
  const [current, setCurrent] = useState(null);
  const [similarity, setSimilarity] = useState("--");
  const [animation, setAnimation] = useState("");
  const [buttonsDisabled, setButtonsDisabled] = useState(true);
  const [consecutiveThrees, setConsecutiveThrees] = useState(0);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch(`${BACKEND}/first_image`)
      .then((r) => r.json())
      .then((data) => {
        setCurrent(data.filename);
        setButtonsDisabled(true);
        setTimeout(() => setButtonsDisabled(false), 1000);
      })
      .catch(console.error);
  }, []);

  const vote = (note) => {
    if (!current) return;

    setButtonsDisabled(true);
    const newConsecutive = note === 3 ? consecutiveThrees + 1 : 0;
    setConsecutiveThrees(newConsecutive);

    const endpoint =
      newConsecutive >= 5 && Math.random() < 0.1 ? "/random_image" : "/next_image";
    if (endpoint === "/random_image") setConsecutiveThrees(0);

    fetch(`${BACKEND}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ current, note, avoid_list: history }),
    })
      .then((r) => r.json())
      .then((data) => {
        setCurrent(data.filename);
        setSimilarity(data.similarity);
        if (data.animation) setAnimation(data.animation);
        if (data.animation) setTimeout(() => setAnimation(""), 800);

        setHistory((prev) => {
          const newHist = [...prev, data.filename];
          if (newHist.length > 10) newHist.shift();
          return newHist;
        });

        setTimeout(() => setButtonsDisabled(false), 1000);
      })
      .catch(() => setTimeout(() => setButtonsDisabled(false), 1000));
  };

  return (
    <div className="container">
      <h1>🎯 Jeu de reconnaissance de visages</h1>

      <div className="info-row">
        <div className="similarity">Similarité : {similarity}</div>
        <div className="image-name">{current}</div>
      </div>

      <ImageDisplay src={`${BACKEND}/images/${current}`} loading={!current} />
      <AnimationOverlay emoji={animation} />

      <RatingButtons onVote={vote} disabled={buttonsDisabled} />
    </div>
  );
}
