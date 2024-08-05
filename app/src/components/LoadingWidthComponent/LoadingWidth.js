import React, { useState, useEffect } from "react";

function LoadingWidth() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => prevProgress + 10);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-container">
      <div
        className="loading-bar"
        style={{
          width: `${progress}%`,
          transition: "width 0.5s ease-in-out",
        }}
      />
    </div>
  );
}

export default LoadingWidth;
