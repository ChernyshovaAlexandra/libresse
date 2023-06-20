import React, { useState, useEffect } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import img1 from "../assets/images/loading/img1.png";
import img2 from "../assets/images/loading/img2.png";
import img3 from "../assets/images/loading/img3.png";
let interval = undefined;

function Loading() {
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (running) {
      interval = setInterval(() => {
        setProgress((prev) => prev + 5);
      }, 100);
    } else {
      clearInterval(interval);
    }
  }, [running]);

  useEffect(() => {
    if (progress === 100) {
      setRunning(false);
      clearInterval(interval);
    }
  }, [progress]);
  useEffect(() => {
    setRunning(true);
  }, []);


  return (
    <div className="content-inner loading-container">
      <h1 className="text-white text-centred expressive mg-tp-2">Разрушь все мифы</h1>
      {/* <LinearProgress
        className="loading-pink mg-tp-2"
        variant="determinate"
        value={progress}
      /> */}
      <div className="loading-bar loading-pink mg-tp-2">
        <div style={{width: `${progress}%` }}></div>
      </div>
      <div className="grid grid-gap-1 grid-col-3 loadin-grid mg-tp-3">
        <div className="col">
          <img src={img1} alt="" />
        </div>
        <div className="col">
          <img src={img2} alt="" />
        </div>
        <div className="col">
          <img src={img3} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Loading;
