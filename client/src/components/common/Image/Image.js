import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getSrcSet, getSizes, getImageDimensions } from '../../../utils/image';
import './Image.css';

const Image = ({
  src,
  alt,
  className = '',
  lazy = true,
  sizes,
  aspectRatio,
  fallback = '/assets/images/placeholder.jpg',
  onLoad,
  onError,
  ...props
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [dimensions, setDimensions] = useState(null);

  useEffect(() => {
    if (src && !aspectRatio) {
      getImageDimensions(src)
        .then(dims => {
          setDimensions(dims);
          setLoading(false);
        })
        .catch(() => {
          setError(true);
          setLoading(false);
        });
    }
  }, [src, aspectRatio]);

  const handleLoad = (e) => {
    setLoading(false);
    onLoad?.(e);
  };

  const handleError = (e) => {
    setError(true);
    setLoading(false);
    onError?.(e);
  };

  const imageClasses = [
    'responsive-image',
    loading ? 'image-loading' : '',
    error ? 'image-error' : '',
    aspectRatio || (dimensions ? \`aspect-ratio-\${dimensions.width}x\${dimensions.height}\` : ''),
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={imageClasses}>
      {!error ? (
        <img
          src={src}
          alt={alt}
          srcSet={getSrcSet(src)}
          sizes={sizes || getSizes()}
          loading={lazy ? 'lazy' : 'eager'}
          onLoad={handleLoad}
          onError={handleError}
          {...props}
        />
      ) : (
        <img
          src={fallback}
          alt={alt}
          className="fallback-image"
          {...props}
        />
      )}
      {loading && (
        <div className="image-loader">
          <div className="loader-spinner" />
        </div>
      )}
    </div>
  );
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  lazy: PropTypes.bool,
  sizes: PropTypes.string,
  aspectRatio: PropTypes.string,
  fallback: PropTypes.string,
  onLoad: PropTypes.func,
  onError: PropTypes.func
};

export default Image;
