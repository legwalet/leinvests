import { useState } from 'react';
import { CardMedia } from '@mui/material';

interface FallbackImageProps {
  src: string;
  alt: string;
  height?: string | number;
}

const FallbackImage = ({ src, alt, height = 200 }: FallbackImageProps) => {
  const [error, setError] = useState(false);

  return (
    <CardMedia
      component="img"
      height={height}
      image={error ? '/images/services/placeholder.jpg' : src}
      alt={alt}
      onError={() => setError(true)}
      sx={{
        objectFit: 'cover',
        backgroundColor: error ? 'grey.200' : 'transparent'
      }}
    />
  );
};

export default FallbackImage; 