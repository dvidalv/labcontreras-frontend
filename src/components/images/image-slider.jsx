import { useEffect, useState } from 'react';

import classes from './image-slideshow.module.css';

const images = [
  { image: '/equipos/DSC01438.webp', alt: 'ilustracion de guantes' },
  { image: '/equipos/P1700688.webp', alt: 'ilustracion de canasta' },
  { image: '/equipos/P1700691.webp', alt: 'ilustracion de bencher' },
  { image: '/equipos/P1700756.webp', alt: 'ilustracion de micro' },
  { image: '/equipos/P1700776.webp', alt: 'ilustracion de tissue' },
  { image: '/equipos/P1700803.webp', alt: 'ilustracion de bandeja' },
];

export default function ImageSlider() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex < images.length - 1 ? prevIndex + 1 : 0
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={classes.slideshow}>
      {images.map((image, index) => (
        <img
          key={index}
          src={image.image}
          className={index === currentImageIndex ? classes.active : ""}
          alt={image.alt}
        />
      ))}
    </div>
  );
}