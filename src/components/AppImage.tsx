import type { ImgHTMLAttributes, SyntheticEvent } from 'react';

interface AppImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt' | 'className'> {
  src: string;
  alt?: string;
  className?: string;
}

function AppImage({
  src,
  alt = "Image Name",
  className = "",
  ...props
}: AppImageProps) {
  const handleError = (e: SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    img.onerror = null; // prevent infinite loop if fallback is missing
    img.src = "/assets/images/no_image.png";
  };

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={handleError}
      {...props}
    />
  );
}

export default AppImage;
