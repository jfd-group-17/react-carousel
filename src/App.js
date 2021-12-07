import React from 'react';
import Carousel, { CarouselItem } from './carousel/carousel';
import { carouselItemsContent } from './data/carouselItemsContent';
import './app.css';

const App = () => {
  return (
    <div className='app'>
      <Carousel width='80%' itemsOnSlide={1}>
        {carouselItemsContent.map((carouselItem, index) => {
          return <CarouselItem key={index}>{carouselItem}</CarouselItem>;
        })}
      </Carousel>
    </div>
  );
};

export default App;
