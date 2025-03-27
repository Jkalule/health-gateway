import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  width, 
  height,
  effect = 'blur',
  placeholderSrc
}) => {
  return (
    <LazyLoadImage
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      effect={effect}
      placeholderSrc={placeholderSrc}
      loading="lazy"
      decoding="async"
    />
  );
};

export default OptimizedImage;
