import React from "react";
import { PRODUCTS } from "../../constants/product";
import './shop-page.styles.scss'
import { useNavigate } from 'react-router-dom'

const ShopPage = () => {
    const navigate = useNavigate()
    return (
        <div className='columns is-flex-wrap-wrap'>
            {
                PRODUCTS.map(item => {
                    return (
                        <div className='column is-3 custom-box' key={item.id}>
                            <div>
                                <img alt='shoes' src={item.imageUrl}  />
                            </div>
                            <div>
                                <div className='is-flex is-justify-content-space-between mb-3'>
                                    <p className='has-text-weight-bold'>{item.name}</p>
                                    <p className='has-text-weight-bold'>${item.price}</p>
                                </div>
                                <div className='has-text-right'>
                                      <button className='button is-primary' onClick={() => navigate(`/custom-product/${item.id}`)}>
                                        BUY
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default ShopPage
