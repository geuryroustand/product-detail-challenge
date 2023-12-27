import React from "react";

interface ImageProps {
  imageUrl: string;
  altText: string;
  className?: string;
}

const Image: React.FC<ImageProps> = ({ className, imageUrl, altText }) => {
  return <img className={className} src={imageUrl} alt={altText} />;
};

export default Image;
