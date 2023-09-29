import axios from 'axios'
import React from 'react'
import { ThreeDots } from 'react-loader-spinner'
import { useQuery } from 'react-query'


export default function Brands() {
  function getBrands() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/brands')
  }
  let { data, isLoading } = useQuery('GetBrands', getBrands);
  // console.log(data?.data.data);
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
          visible={true} />
      </div>
      :
      <div className='container py-3'>
        <div className='row'>
          <span className='brands-title text-center fs-1'>All Brands</span>
          {data?.data.data.map((img) =>
            <div key={img._id} className='col-md-3 py-4'>
              <div className='brands cursor-pointer px-2 py-4 rounded'>
                <img className='w-100 ' src={img.image} alt={img.title} />
                <p className='text-center'>{img.name}</p>
              </div>
            </div>
          )}
        </div>

      </div>};
  </>
}
