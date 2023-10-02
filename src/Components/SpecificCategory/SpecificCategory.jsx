import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useQuery } from 'react-query';

export default function SpecificCategory() {
  let params = useParams();

  function getSpecificCategory(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);
  }
  let { data, isError, isLoading } = useQuery('specificCategory', () => getSpecificCategory(params.id))
  console.log(data?.data.data);
  console.log(isError);
  console.log(isLoading);

  return <>
    <span>{data?.data.data ? data?.data.data.map((img) => console.log(img)) : ''}</span>
  </>
}
