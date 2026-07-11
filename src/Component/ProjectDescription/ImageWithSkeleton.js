import React, { useState } from "react";

const ImageWithSkeleton = ({ src, alt, className = "", wrapperClassName = "" }) => {
  const [loaded, setLoaded] = useState(false);

  const handleLoad = () => setLoaded(true);

  return (
    <div className={`pd-image-skeleton-wrapper ${wrapperClassName}`.trim()}>
      {!loaded && <div className="pd-image-skeleton" aria-hidden="true" />}
      <img
        src={src}
        alt={alt}
        className={`${className} ${loaded ? "pd-image--loaded" : "pd-image--loading"}`}
        loading="lazy"
        onLoad={handleLoad}
        onError={handleLoad}
      />
    </div>
  );
};

export default ImageWithSkeleton;
