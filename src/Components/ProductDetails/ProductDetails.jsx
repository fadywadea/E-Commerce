import React from 'react'
// import Style from './ProductDetails.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useQuery } from 'react-query';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ProductDetails() {
  let params = useParams();

  function getProductDetails(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }
  let { data, isError, isLoading } = useQuery('productDetails', () => getProductDetails(params.id));

  console.log(data?.data.data);
  console.log(isError);
  console.log(isLoading);

  // async function getProductDetails(id) {
  //   let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  //   console.log(data);
  // }

  // useEffect(() => {
  //   getProductDetails(params.id)
  // }, []);

  const settings = {
    dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2500,
      pauseOnHover: true
  };

  return <>
    {data?.data.data ? <div className='row mt-3 align-items-center'>
      <div className="col-md-4">
        <div>
          {data?.data.data ?
            <Slider {...settings}>
              {data?.data.data.images.map((x) =>
                <img key={data?.data.data.id} style={{ height: "200" }} className='w-100' src={x} alt={data?.data.data.title} />)}
            </Slider> : ''}

        </div>
      </div>
      <div className="col-md-8">
        <h2 className='h5'>{data?.data.data.title}</h2>
        <p>{data?.data.data.description}</p>
        <h6 className='text-main'>{data?.data.data.category?.name}</h6>
        <h6 className='text-main'>Price: {data?.data.data.price}EGP</h6>
        <div className='d-flex justify-content-between'>
          <span>ratingsQuantity: {data?.data.data.ratingsQuantity}</span>
          <span> <i className='fas fa-star rating-color'></i> {data?.data.data.ratingsAverage}</span>
        </div>
        <button className='btn w-75 mx-auto btn-cart mt-3 text-white'>+ Add</button>
      </div>
    </div> : ''}
  </>
}