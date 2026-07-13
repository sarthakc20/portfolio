import React, { useEffect, useState } from "react";
import placeholderSvg from "../../assets/website-thumbnail-placeholder.svg";

const WebsiteThumbnail = ({
  image,
  alt,
  className = "",
  wrapperClassName = "",
}) => {
  const [status, setStatus] = useState(image ? "loading" : "placeholder");

  useEffect(() => {
    if (!image) {
      setStatus("placeholder");
      return;
    }

    let isMounted = true;
    setStatus("loading");

    const preload = new Image();
    preload.onload = () => {
      if (isMounted) setStatus("ready");
    };
    preload.onerror = () => {
      if (isMounted) setStatus("placeholder");
    };
    preload.src = image;

    return () => {
      isMounted = false;
    };
  }, [image]);

  const showSkeleton = status === "loading";
  const showThumbnail = status === "ready" && image;
  const showPlaceholder = status === "placeholder";

  return (
    <div className={`website-thumbnail ${wrapperClassName}`.trim()}>
      {showSkeleton && (
        <div className="website-thumbnail__skeleton" aria-hidden="true" />
      )}

      {showPlaceholder && (
        <img
          src={placeholderSvg}
          alt={alt}
          className={`website-thumbnail__placeholder ${className}`}
          loading="lazy"
        />
      )}

      {showThumbnail && (
        <img
          src={image}
          alt={alt}
          className={`website-thumbnail__image ${className} website-thumbnail__image--loaded`}
          loading="lazy"
        />
      )}
    </div>
  );
};

export default WebsiteThumbnail;
