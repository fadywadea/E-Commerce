import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query'
// import Style from './CategorySlider.module.css'
import Slider from "react-slick";

export default function CategorySlider() {

  function getCategorySlider() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories');
  }

  let { data } = useQuery("GetCategorySlider", getCategorySlider);
  // console.log(data?.data.data);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: false,
    arrows: false,
  };

  return <>

    {data?.data.data ?
      <div className=' py-3'>
        <Slider {...settings}>
          {data?.data.data.map((pic) => <img height={200} key={pic._id} src={pic.image} alt={pic.title} className=' w-100' />)}
        </Slider>
      </div>

      : ''}
  </>
}