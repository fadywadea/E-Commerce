import React from 'react'
// useContext
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useQuery } from 'react-query';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Helmet } from 'react-helmet';
// import { CartContext } from '../../Context/CartContext';
// import { toast } from 'react-toastify';

export default function ProductDetails() {

  // let { addToCart } = useContext(CartContext);

  // async function addProductToCart(id) {

  //   let response = await addToCart(id);

  //   if (response.data.status === 'success') {
  //     const notify = () => {
  //       toast.success((response.data.message), {
  //         position: "top-right",
  //         autoClose: 3000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: false,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "dark"
  //       });
  //     }
  //     notify();
  //   } else {
  //     const notify = () => {
  //       toast.error((response.data.message), {
  //         position: "top-right",
  //         autoClose: 3000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: false,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "dark",
  //       });
  //     }
  //     notify();
  //   }
  //   // console.log(response);
  // }

  let params = useParams();

  function getProductDetails(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }
  let { data } = useQuery('productDetails', () => getProductDetails(params.id));
  //, isError, isLoading 
  // console.log(data?.data.data);
  // console.log(isError);
  // console.log(isLoading);

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
    pauseOnHover: false,
    arrows: false
  };

  return <>

    {data?.data.data ? <div className='row mt-3 align-items-center'>
      <Helmet>
        <meta name="description" content="Web site created using create-react-app" />
        <meta name="keywords" content="HTML5 CSS3 Bootstrap JS React" />
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <title>{data?.data.data.title}</title>
      </Helmet>
      <div className="col-md-4">
        <div>
          {data?.data.data ?
            <Slider {...settings}>
              {data?.data.data.images?.map((x) =>
                <img key={data?.data.data?.id} style={{ height: "200" }} className='w-100' src={x} alt={data?.data.data?.title} />)}
            </Slider> : ''}

        </div>
      </div>
      <div className="col-md-8">
        <h2 className='h4'>{data?.data.data?.title}</h2>
        <p>{data?.data.data?.description}</p>
        <h6 className='text-main'>{data?.data.data.category?.name}</h6>
        <h6 className='text-main'>Price: {data?.data.data?.price}EGP</h6>
        <div className='d-flex justify-content-between'>
          <span>ratingsQuantity: {data?.data.data?.ratingsQuantity}</span>
          <span> <i className='fas fa-star rating-color'></i> {data?.data.data?.ratingsAverage}</span>
        </div>
        {/* <button onClick={(pro) => addProductToCart(product?.id)} className='btn w-75 mx-auto btn-cart mt-3 text-white'>+ Add</button> */}
      </div>
    </div> : ''}
  </>
}
