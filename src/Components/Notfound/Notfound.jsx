import React from 'react'
import Style from './Notfound.module.css'
import { Helmet } from 'react-helmet'

export default function Notfound() {
  return <>
    <Helmet>
      <meta name="description" content="Web site created using create-react-app" />
      <meta name="keywords" content="HTML5 CSS3 Bootstrap JS React" />
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <title>Fresh Cart</title>
    </Helmet>
    <h1 className={Style}>Notfound</h1>
  </>
}
