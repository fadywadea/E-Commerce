import React from "react";
// import Style from './Home.module.css'
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import CategorySlider from "../CategorySlider/CategorySlider";
import MainSlider from "../MainSlider/MainSlider";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
    <Helmet>
          <meta name="description" content="Web site created using create-react-app"/>
          <meta name="keywords" content="HTML5 CSS3 Bootstrap JS React" />
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          <title>Home</title>
        </Helmet>
      <MainSlider />
      <CategorySlider />
      <FeaturedProducts />
    </>
  );
}
