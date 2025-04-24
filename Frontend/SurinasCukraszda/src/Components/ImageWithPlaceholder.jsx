import React, { useState } from "react";
import { Skeleton } from "@mui/material";

export default function ImageWithPlaceholder({
  src,
  alt,
  width,
  height,
  className,
  style,
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div style={{ position: "relative", width, height, ...style }}>
      {/* Skeleton addig, amíg a kép nem töltődik be */}
      {!loaded && (
        <Skeleton
          variant="rectangular"
          width={width}
          height={height}
          animation="wave"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            bgcolor: "grey.300",
          }}
        />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={className}
        onLoad={() => setLoaded(true)}
        style={{
          display: loaded ? "block" : "none",
          width,
          height,
          objectFit: "cover",
        }}
      />
    </div>
  );
}
