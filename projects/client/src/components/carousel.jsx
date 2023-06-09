import React from 'react';
import Slider from 'react-slick';

export default function SimpleSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      <div>
        <div
          style={{ backgroundColor: 'blue', width: '100px', height: '100px' }}
        >
          SLIDE 1
        </div>
      </div>
      <div>
        <div
          style={{ backgroundColor: 'black', width: '100px', height: '100px' }}
        >
          SLIDE 2
        </div>
      </div>
      <div>
        <div
          style={{ backgroundColor: 'grey', width: '100px', height: '100px' }}
        >
          SLIDE 3
        </div>
      </div>
      <div>
        <div
          style={{ backgroundColor: 'red', width: '100px', height: '100px' }}
        >
          SLIDE 4
        </div>
      </div>
      <div>
        <div
          style={{ backgroundColor: 'yellow', width: '100px', height: '100px' }}
        >
          SLIDE 5
        </div>
      </div>
      <div>
        <div
          style={{ backgroundColor: 'green', width: '100px', height: '100px' }}
        >
          SLIDE 6
        </div>
      </div>
    </Slider>
  );
}
