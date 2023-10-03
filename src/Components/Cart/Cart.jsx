import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { CartContext } from '../../Context/CartContext'

export default function Cart() {

  let { getLoggedUserCart } = useContext(CartContext);
  const [cartDetails, setCartDetails] = useState(null);

  async function getCart() {
    let { data } = await getLoggedUserCart();
    setCartDetails(data);
  }

  useEffect(() => {
    getCart();
  }, []);

  return <>
    <Helmet>
      <meta name="description" content="Web site created using create-react-app" />
      <meta name="keywords" content="HTML5 CSS3 Bootstrap JS React" />
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <title>Cart</title>
    </Helmet>
    {cartDetails ?

      <div className='container w-75 my-4 mx-auto py-3 bg-main-light'>
        <h3>Shopping Cart</h3>

        <div className="d-flex justify-content-between align-items-center mt-3 mb-3">
          <div>
            <h4 className='h6 fw-bolder'>total items: <span className='color-numbers fw-bold'>{cartDetails.numOfCartItems}</span> </h4>
          </div>
          <div>
            <h5 className='h6 fw-bolder'>Total Cart Price: <span className='color-numbers fw-bold'>{cartDetails.data.totalCartPrice}</span> EGP</h5>
          </div>
        </div>

        {cartDetails.data.products?.map((product) =>
          <div className='align-items-center row border-bottom py-2 px-2' key={product.product?.id}>

            <div className="col-md-2">
              <img className='w-100' src={product.product?.imageCover} alt={product?.id} />
            </div>

            <div className="col-md-10">
              <div className="d-flex justify-content-between align-items-center">

                <div>
                  <h3 className='h6'>{product.product?.title.split(" ").slice(0, 3).join(' ')}</h3>
                  <h4 className='h6 text-main'> Price : {product.price}</h4>
                </div>

                <div>
                  <button className='btn btn-outline-success'>+</button>
                  <span className='mx-2'>{product?.count}</span>
                  <button className='btn btn-outline-danger'>-</button>
                </div>
              </div>
              <button className='btn btn-outline-danger font-sm p-1'> <i className=' fas fa-trash-can'></i> Remove</button>
            </div>
          </div>)}
      </div>
      : ''}
  </>
}
