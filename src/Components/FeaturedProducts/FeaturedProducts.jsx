import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import { useQuery } from 'react-query';
import { ThreeDots } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import { toast } from 'react-toastify';
// import toast from 'react-hot-toast';

export default function FeaturedProducts() {

  let { addToCart } = useContext(CartContext);

  async function addProductToCart(id) {

    let response = await addToCart(id);

    if (response.data.status === 'success') {
      const notify = () => {
        toast.success((response.data?.message.split(" ").slice(0, 3).join(" ")), {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark"
        });
      }
      notify();
    } else {
      const notify = () => {
        toast.error((response.data?.message), {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
      notify();
    }
    // console.log(response);
  }

  function getsFeaturedProducts() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products');
  };

  let { isLoading, data } = useQuery('featuredProducts', getsFeaturedProducts);
  // isFetching  , isError 
  // cacheTime: 3000,
  // refetchInterval: 5000,
  // refetchOnMount:false,
  // staleTime: 3000,
  // enabled: true
  // console.log("isLoading", isLoading);
  // console.log("isFetching", isFetching);
  // console.log("isError", isError);

  // console.log(data?.data.data);

  // const [products, setProducts] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  // async function getFeaturedProducts() {
  //   setIsLoading(false);
  //   let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
  //   setProducts(data.data);
  //   setIsLoading(true);
  // }

  useEffect(() => {

    getsFeaturedProducts();
  }, [])

  return <>
    {isLoading ?
      <div className='d-flex justify-content-center align-content-center m-0 p-0'>
        <ThreeDots
          height="100vh"
          width="80"
          radius="9"
          color="#4fa94d"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      </div>
      :
      <div className="container py-4">
        <div className="row">
          {data?.data.data?.map((product) =>
            <div key={product?._id} className="col-md-3">
              <div className='product cursor-pointer px-2 py-4 rounded'>
                <Link to={`/productDetails/${product?.id}`}>
                  <img className='w-100' src={product?.imageCover} alt={product?.title} />
                  <span className='text-main font-sm fw-bolder'>{product.category?.name}</span>
                  <h3 className='h6'>{product.title?.split(" ").slice(0, 2).join(" ")}</h3>
                  <div className='d-flex justify-content-between mt-3'>
                    <span>{product?.price} EGP</span>
                    <span><i className='fas fa-star rating-color'></i>{product?.ratingsAverage}</span>
                  </div>
                </Link>
                <button onClick={() => addProductToCart(product?.id)} className='btn bg-main text-white w-100 btn-sm mt-2'>+ Add</button>
              </div>
            </div>)}
        </div>
      </div >
    }  </>
}
