import { useEffect, useState } from 'react'
import React from 'react';
import Slider from 'react-slick';
import { FaChevronLeft, FaChevronRight } from 'react-icons'
import axios from 'axios';
import AvatarCategory from './categoryAvatar';

export default function CategorySlider() {
    const [sliderRef, setSliderRef] = useState(null)
    const [category, setCategory] = useState([])

    const getData = async () => {
        try {
            const result = await axios.get('http://localhost:8000/api/temp/category')
            console.log(result)
            setCategory(result.data.data)
        } catch (error) {

        }
    }

    useEffect(() => {
        getData()
    }, [])

    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 5,
        slidesToScroll: 1,
    }
    //    const productsCards = [
    //     {
    //         imageSrc: 
    //         'https://i.pinimg.com/736x/11/00/c7/1100c7ddf2c547ce814da329aa69f322.jpg',
    //         tittle: 'Panadol',
    //         description: 'Menurunkan Demam',

    //     },
    //     {
    //         imageSrc: 
    //         'https://i.pinimg.com/736x/0a/86/64/0a8664574a50e2fb4410cb2568911eaf.jpg',
    //         tittle: 'Imboost',
    //         description: 'Vitamin Imun',
    //     },
    //     {
    //         imageSrc: 
    //         'https://i.pinimg.com/736x/f4/ae/f7/f4aef7b2d62561dd449d540c79b09149.jpg',
    //         tittle: 'Emergen-C',
    //         description: 'Vitamin C',
    //     },
    //     {
    //         imageSrc: 
    //         'https://i.pinimg.com/736x/52/0d/79/520d79eed32418a798366bc12d3871fb.jpg',
    //         tittle: 'Centrum',
    //         description: 'Multivitamin',
    //     }
    //    ]
    return (

        <Slider {...settings}>
            {category.length > 0 ? category.map(i => <AvatarCategory image={i.image} name={i.category_name} />) : ""}
        </Slider>
    );
}
