import React, { useEffect, useState } from 'react';
import { Box, IconButton, useBreakpointValue } from '@chakra-ui/react';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
//assets banner
import banner1 from "../assets/banner/banner1.jpg";
import banner2 from "../assets/banner/banner2.jpg";
import banner3 from "../assets/banner/banner3.jpg";
import banner4 from "../assets/banner/banner4.jpg";
import banner5 from "../assets/banner/banner5.jpg";


const settings = {
  dots: true,
  arrows: false,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 3000,
  slidesToShow: 1, // Display 1 slide at a time
  slidesToScroll: 1,
};

export function Carousel() {
  const [slider, setSlider] = useState(null);
  const top = useBreakpointValue({ base: '50%', md: '50%' });
  const side = useBreakpointValue({ base: '10px', md: '30px' });
  const [carouselDimensions, setCarouselDimensions] = useState({
    width: '100%',
    height: '30vh', // Adjust the height to your preference (e.g., 30vh, 25vh)
  });

  const cards = [
    banner1, banner2, banner3, banner4, banner5
  ];

  useEffect(() => {
    const handleResize = () => {
      if (slider) {
        const slideWidth = slider.innerSlider.list.offsetWidth;
        setCarouselDimensions({
          width: slideWidth,
          height: slideWidth * (9 / 16), // Set the aspect ratio to your desired value (e.g., 16:9)
        });
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [slider]);

  return (
    <Box position="relative" height={carouselDimensions.height} width={carouselDimensions.width}>
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
      <Box height="100%" width="100%">
        <Slider {...settings} ref={(slider) => setSlider(slider)}>
          {cards.map((url, index) => (
            <Box
              key={index}
              height={carouselDimensions.height}
              width={carouselDimensions.width}
              position="relative"
              overflow="hidden"
            >
              <img
                src={url}
                alt={`Slide ${index + 1}`}
                style={{
                  objectFit: 'cover', // Fit the image within the container without distortion
                  height: '100%',
                  width: '100%',
                }}
              />
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
}
