import React from 'react'
import Slider from "react-slick";
import slider1 from '../../Assets/images/slider-image-1.jpeg';
import slider2 from '../../Assets/images/slider-image-2.jpeg';
import slider3 from '../../Assets/images/slider-image-3.jpeg';
import blog1 from '../../Assets/images/blog-img-1.jpeg';
import blog2 from '../../Assets/images/blog-img-2.jpeg';
import { Helmet } from 'react-helmet';

export default function MainSlider() {

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: false,
    arrows: false,
  };

  return <>
    <div className="row py-2 gx-0">
      <Helmet>
        <meta name="description" content="Web site created using create-react-app" />
        <meta name="keywords" content="HTML5 CSS3 Bootstrap JS React" />
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <title>Fresh Cart</title>
      </Helmet>
      <div className='col-md-9 '>
        <Slider {...settings}>
          <img className='w-100' height={300} src={slider1} alt="products" />
          <img className='w-100' height={300} src={slider2} alt="products" />
          <img className='w-100' height={300} src={slider3} alt="products" />
        </Slider>
      </div>
      <div className="col-md-3 ">
        <img className='w-100' height={150} src={blog1} alt="products" />
        <img className='w-100' height={150} src={blog2} alt="products" />
      </div>
    </div>
  </>
}
