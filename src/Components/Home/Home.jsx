import React, { useContext } from 'react'
import Style from './Home.module.css'
import { CounterContext } from '../../Context/CounterContext'

export default function Home() {
  let { changeCounter } = useContext(CounterContext)
  return <>
    <button onClick={changeCounter} className='btn btn-info'>Change</button>
    <h1 className={Style}>Home</h1>
  </>
}
