import React from "react";
import { Routes, Route } from "react-router-dom";
import ShopPage from "./components/shop-page/shop-page";
import SingleProductPage from "./components/single-product-page/single-product-page";
import Navbar from "./components/navbar/navbar";
import Success from "./components/success/success";
import Cancel from "./components/cancel/cencel";
import CustomSingleProductPage from "./components/custom-single-product-page/custom-single-product-page";



function App() {
  return (
      <div className='container'>
        <Navbar/>
        <Routes>
            <Route exact path='/' element={<ShopPage/>}/>
            <Route  path='/success' element={<Success/>}/>
            <Route  path='/canceled' element={<Cancel/>}/>
            {/*with stripe checkout*/}
            <Route path='/product/:id' element={<SingleProductPage/>}/>
            {/*with custom checkout*/}
            <Route path='/custom-product/:id' element={<CustomSingleProductPage/>}/>
        </Routes>
      </div>
  );
}

export default App;
