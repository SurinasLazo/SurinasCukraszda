import React from "react";

const GoogleMap = () => {
  return (
    <div className="google-map">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2719.734752925003!2d21.274002415608477!3d46.64669927913278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4744893459c4e7f5%3A0x5e7431f3e44f776d!2sTemesv%C3%A1ri%20%C3%BAt%2024%2C%20Gyula%2C%205700!5e0!3m2!1shu!2shu!4v1616582552296!5m2!1shu!2shu"
        width="600"
        height="450"
        allowFullScreen=""
        loading="lazy"
        title="Surinás Cukrászda"
      ></iframe>
    </div>
  );
};

export default GoogleMap;
