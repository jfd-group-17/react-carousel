import React, { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import './carousel.css';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/all';

export const CarouselItem = ({ children, width }) => {
  return (
    <div className='carouselItem' style={{ minWidth: `${width}%` }}>
      {children}
    </div>
  );
};

const Carousel = ({
  children,
  width,
  height,
  itemsOnSlide,
  intervalTime = 2000,
}) => {
  /*
   * * * * * Formula for maxIndex * * * * *
   * itemsAmount = React.Children.count(children)
   * slidesAmount = itemsAmount / itemsOnSlide
   * slidesAmountToShow = slidesAmount - 1
   * maxIndex = Math.round(slidesAmountToShow * itemsOnSlide))
   * */
  const maxIndex = Math.round(
    (React.Children.count(children) / itemsOnSlide - 1) * itemsOnSlide
  );
  const itemWidth = 100 / itemsOnSlide;

  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = maxIndex;
    } else if (newIndex === maxIndex + 1) {
      newIndex = 0;
    }

    setActiveIndex(newIndex);
  };

  const generateCarouselItems = () => {
    return React.Children.map(children, (child, index) => {
      return React.cloneElement(child, { key: index, width: itemWidth });
    });
  };

  const generateBullets = () => {
    const bullets = [];

    for (let index = 0; index <= maxIndex; index += 1) {
      bullets.push(
        <button
          key={index}
          className={`bullet ${index === activeIndex ? 'active' : ''}`}
          onClick={() => updateIndex(index)}
        />
      );
    }

    return bullets;
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => updateIndex(activeIndex + 1),
    onSwipedRight: () => updateIndex(activeIndex - 1),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        updateIndex(activeIndex + 1);
      }
    }, intervalTime);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  });

  return (
    <div
      className='carousel'
      style={{ width: width }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      {...swipeHandlers}
    >
      <div className='carouselItemsContainer'>
        <div
          className='carouselItems'
          style={{
            height: height || 'auto',
            transform: `translateX(-${activeIndex * itemWidth}%)`,
          }}
        >
          {generateCarouselItems()}
        </div>
      </div>
      <div className='controls'>
        <button
          className='prevBtn'
          onClick={() => updateIndex(activeIndex - 1)}
        >
          <IoIosArrowBack />
        </button>
        <button
          className='nextBtn'
          onClick={() => updateIndex(activeIndex + 1)}
        >
          <IoIosArrowForward />
        </button>
        <div className='bullets'>{generateBullets()}</div>
      </div>
    </div>
  );
};

export default Carousel;
