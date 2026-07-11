import React, { useEffect, useState } from "react";
import placeholderSvg from "../../assets/website-thumbnail-placeholder.svg";

const getThumbIoUrl = (url) =>
  `https://image.thum.io/get/width/800/noanimate/${url}`;

const fetchMicrolinkThumbnail = async (url) => {
  const response = await fetch(
    `https://api.microlink.io/?url=${encodeURIComponent(
      url
    )}&screenshot=true&meta=false`
  );

  if (!response.ok) {
    throw new Error("Microlink request failed");
  }

  const payload = await response.json();

  if (payload.status !== "success") {
    throw new Error("Microlink returned no preview");
  }

  return (
    payload.data?.screenshot?.url ||
    payload.data?.image?.url ||
    payload.data?.logo?.url ||
    null
  );
};

const preloadImage = (src) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(src);
    image.onerror = reject;
    image.src = src;
  });

const resolveThumbnailSources = async (url) => {
  const sources = [];

  try {
    const microlinkImage = await fetchMicrolinkThumbnail(url);
    if (microlinkImage) {
      sources.push(microlinkImage);
    }
  } catch {
    // Fall through to thum.io
  }

  sources.push(getThumbIoUrl(url));

  return [...new Set(sources)];
};

const WebsiteThumbnail = ({
  url,
  alt,
  className = "",
  wrapperClassName = "",
}) => {
  const [status, setStatus] = useState("loading");
  const [thumbnailSrc, setThumbnailSrc] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadThumbnail = async () => {
      setStatus("loading");
      setThumbnailSrc("");

      const sources = await resolveThumbnailSources(url);

      for (const source of sources) {
        try {
          const validatedSource = await preloadImage(source);
          if (!isMounted) return;

          setThumbnailSrc(validatedSource);
          setStatus("ready");
          return;
        } catch {
          // Try the next thumbnail source
        }
      }

      if (isMounted) {
        setStatus("placeholder");
      }
    };

    loadThumbnail();

    return () => {
      isMounted = false;
    };
  }, [url]);

  const showSkeleton = status === "loading";
  const showThumbnail = status === "ready" && thumbnailSrc;
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
          src={thumbnailSrc}
          alt={alt}
          className={`website-thumbnail__image ${className} website-thumbnail__image--loaded`}
          loading="lazy"
        />
      )}
    </div>
  );
};

export default WebsiteThumbnail;
