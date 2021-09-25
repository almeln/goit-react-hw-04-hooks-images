import React from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItemImage } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ src, alt }) => (
  <ImageGalleryItemImage src={src} alt={alt} />
);

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
