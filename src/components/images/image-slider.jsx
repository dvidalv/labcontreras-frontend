import { useEffect, useState } from 'react';


import guantes from "/public/equipos/DSC01438.webp";
import canasta from "/public/equipos/P1700688.webp";
import bencher from "/public/equipos/P1700691.webp";
import micro from "/public/equipos/P1700756.webp";
import tissue from "/public/equipos/P1700776.webp";
import bandeja from "/public/equipos/P1700803.webp";

import classes from './image-slideshow.module.css';

const images = [
  { image: guantes, alt: 'ilustracion de guantes' },
  { image: canasta, alt: 'ilustracion de canasta' },
  { image: bencher, alt: 'ilustracion de bencher' },
  { image: micro, alt: 'ilustracion de micro' },
  { image: tissue, alt: 'ilustracion de tissue' },
  { image: bandeja, alt: 'ilustracion de bandeja' },
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