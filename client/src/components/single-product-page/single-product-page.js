import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {PRODUCTS} from "../../constants/product";
import { useStripe } from "@stripe/react-stripe-js";
import { fetchFromAPI } from "../../helpers";

const SingleProductPage = () => {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [email, setEmail] = useState('')
    const stripe = useStripe()

    useEffect(() => {
        const product = PRODUCTS.filter(item => item.id === Number(id))[0]
        setProduct(product)
    }, [id])

    const handleCheckout = async (e) => {
        e.preventDefault()
        const line_items = [
            {
                quantity: 1,
                price_data: {
                    currency: 'usd',
                    unit_amount: product.price * 100, //price
                    product_data:{
                        name: product.name,
                        images: [product.imageUrl]
                    }
                }
            }
        ]
        const response = fetchFromAPI('create-checkout-session', {
            body : {line_items, customer_email: email }
        })
        const {sessionId} = await response

        const { error } =  await stripe.redirectToCheckout({
            sessionId
        })
        if(error){
            console.log(error)
        }
    }

    return (

        <div className='columns is-align-items-center is-justify-content-space-around'>
            {
                product ?   <div className='column is-5'>
                    <img alt='product' src={product.imageUrl}/>
                    <hr className='has-background-primary'/>
                    <div className='has-text-centered'>
                        <p className='is-size-4'>{product.name}</p>
                        <p className='is-size-5'><b>Total price:</b> ${product.price}</p>
                    </div>
                </div> : <p>Loading...</p>
            }
            <div className='column is-4'>
                <form className='box' onSubmit={handleCheckout}>
                    <div className='field'>
                        <label className="label">Email</label>
                        <input
                            type='email'
                            onChange={e => setEmail(e.target.value)}
                            placeholder='Email'
                            value={email}
                            className='input is-primary'
                        />
                    </div>
                    <div className='field has-text-centered'>
                        <button type='submit' className='button is-primary'>
                            CHECKOUT
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SingleProductPage
