import React from 'react';
import { Box, IconButton, useBreakpointValue } from '@chakra-ui/react';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
//asets banner
import banner3 from '../assets/banner/banner3.jpg';
import banner6 from '../assets/banner/banner6.jpg';
import banner7 from '../assets/banner/banner7.jpg';
import banner8 from '../assets/banner/banner8.jpg';
import banner9 from '../assets/banner/banner9.jpg';
import banner10 from '../assets/banner/banner10.jpg';
import banner11 from '../assets/banner/banner11.jpg';

const settings = {
  dots: true,
  dotsClass: 'slick-dots',
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 3000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export function Carousel() {
  const [slider, setSlider] = React.useState(null);
  const top = useBreakpointValue({ base: '80%', md: '40%' });
  const side = useBreakpointValue({ base: '30%', md: '10px' });

  const cards = [
     banner6, banner7, banner8, banner9, banner10, banner11, banner3
  ];
 
  return (
    <Box position={'relative'} height={'465px'} width={'full'} overflow={'hidden'}>
      <IconButton
        aria-label="left-arrow"
        colorScheme="messenger"
        borderRadius="full"
        position="absolute"
        left={side}
        top={top}
        transform={'translate(0%, -50%)'}
        zIndex={2}
        onClick={() => slider?.slickPrev()}
      >
        <BiLeftArrowAlt />
      </IconButton>
      <IconButton
        aria-label="right-arrow"
        colorScheme="messenger"
        borderRadius="full"
        position="absolute"
        right={side}
        top={top}
        transform={'translate(0%, -50%)'}
        zIndex={2}
        onClick={() => slider?.slickNext()}
      >
        <BiRightArrowAlt />
      </IconButton>
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {cards.map((url, index) => (
          <Box
            key={index}
            height={'400px'}
            position="relative"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            backgroundImage={`url(${url})`}
          />
        ))}
      </Slider>
    </Box>
  );
};
