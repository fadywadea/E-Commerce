import axios from 'axios';
import React from 'react'
import { Helmet } from 'react-helmet'
import { ThreeDots } from 'react-loader-spinner';
import { useQuery } from 'react-query';
// import SpecificCategory from '../SpecificCategory/SpecificCategory';

export default function Categories() {

  function getCategories() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories');
  };

  let { isLoading, data } = useQuery('featuredProducts', getCategories, {
  });


  return <>
    {isLoading ?
      <div className='d-flex justify-content-center align-content-center m-0 p-0'>
      <Helmet>
        <meta name="description" content="Web site created using create-react-app" />
        <meta name="keywords" content="HTML5 CSS3 Bootstrap JS React" />
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <title>Categories</title>
      </Helmet>
        < ThreeDots
          height="100vh"
          width="80"
          radius="9"
          color="#4fa94d"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      </div > :
      <div className='row g-4 py-4'>
        {data?.data.data?.map((categories) => <div key={categories?._id} className="col-md-4">
          <div className='categories cursor-pointer rounded'>
            <img style={{ height: 380 }} className='w-100' src={categories?.image} alt={categories?.slug} />
            <div className='d-flex justify-content-center align-items-center'>
              <span className=' text-success h3 fs-3 fw-bolder py-3'>{categories?.name}</span>
            </div>
          </div>
        </div>)}
        {/* <SpecificCategory /> */}
      </div>
    }

  </>
}
