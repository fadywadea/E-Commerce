/* eslint-disable jsx-a11y/img-redundant-alt */
import axios from 'axios';
import React from 'react'
import { Helmet } from 'react-helmet';
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
        <Helmet>
          <meta name="description" content="Web site created using create-react-app" />
          <meta name="keywords" content="HTML5 CSS3 Bootstrap JS React" />
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          <title>Fresh Cart</title>
        </Helmet>
        <Slider {...settings}>
          {data?.data.data?.map((pic) => 
          <img height={200} key={pic?._id} src={pic?.image} alt="image" className='w-100' />)}
        </Slider>
      </div>
      : ''}
  </>
}