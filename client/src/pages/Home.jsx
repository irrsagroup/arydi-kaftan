import React from 'react';
import ProductSlider from '../components/ProductSlider';

const Home = ({ language }) => {
  return (
    <div>
      <ProductSlider language={language} />
    </div>
  );
};

export default Home;