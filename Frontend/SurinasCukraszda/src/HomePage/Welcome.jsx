import React, { useEffect, useState } from "react";
import "./Welcome.css";

const WelcomeMessage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`container ${isVisible ? "fade-in" : ""}`}>
      <div className="row">
        <div className="col">
          <h1 className="display-4 text-center mb-4">
            Üdvözöljük a Surinás Cukrászda webáruházában!
          </h1>
          <p className="lead text-center">Minden izében hagyomány.</p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;
