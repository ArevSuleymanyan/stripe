import React, {useEffect, useState}  from "react";
import {useNavigate, useParams} from "react-router-dom";
import {PRODUCTS} from "../../constants/product";
import {
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js'
import {fetchFromAPI} from "../../helpers";

const cardStyle = {
    style: {
        base: {
            color: "#000",
            fontFamily: 'Roboto, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
                color: "rgb(0, 179, 152)",
            },
        },
        invalid: {
            color: "rgb(255, 56, 96)",
            iconColor: "rgb(255, 56, 96)"
        }
    }
};


const CustomSingleProductPage = () => {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [shipping, setShipping] = useState({})
    const [showStripeForm, setShowStripeForm] = useState(false)
    const [showError, setShowError] = useState(false)

    const [processing, setProcessing] = useState(false)
    const [error, setError] = useState(null)
    const [clientSecret, setClientSecret] = useState(null)
    const elements = useElements()
    const stripe = useStripe()
    const navigate = useNavigate()

    useEffect(() => {
        const product = PRODUCTS.filter(item => item.id === Number(id))[0]
        setProduct(product)
    }, [id])
    const populateField = (key, value) => {
        setShowError(false)
        setShipping(prevState => ({...prevState, [key]: value}))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const {name, email, address} = shipping
        if(name && email && address){
            setShowStripeForm(true)
        } else {
            setShowError(true)
        }
    }

    ////////////////////////////////////////

    useEffect(() => {
        if(product){

        const item = {quantity: 1, price: product.price}
        const {name, email, address} = shipping
        if(name && email && address){
            const body = {
                product: item,
                shipping: {
                    name: shipping.name,
                    address: {
                        line1: shipping.address
                    }
                },
                receipt_email: shipping.email
            }
            const customCheckout = async () => {
                const {clientSecret} = await fetchFromAPI('create-payment-intent', {body})
                setClientSecret(clientSecret)
            }

            customCheckout()
        }
        }
    }, [shipping, product])

    const cardHandleChange = (e) => {
        const { error } = e;
        setError(error? error.message : '')
    }
    const handleCheckout = async () => {
        setProcessing(true)
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method:{
                card: elements.getElement(CardNumberElement)
            }
        })
        if(payload.error){
            setError(payload.error.message)
        } else {
            navigate('/success')
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
            {
                !showStripeForm ?  <div className='column is-4'>
                    <div className='box'>
                        <form onSubmit={handleSubmit}>
                            <div className='field'>
                                <input
                                    name='name'
                                    type='text'
                                    placeholder='Name'
                                    onChange={(e) => populateField(e.target.name, e.target.value)}
                                    className='input is-primary'/>
                            </div>
                            <div className='field'>
                                <input
                                    name='email'
                                    type='email'
                                    placeholder='Email'
                                    onChange={(e) => populateField(e.target.name, e.target.value)}
                                    className='input is-primary'/>
                            </div>
                            <div className='field'>
                                <input
                                    name='address'
                                    type='text'
                                    placeholder='Address'
                                    onChange={(e) => populateField(e.target.name, e.target.value)}
                                    className='input is-primary'/>
                            </div>
                            <div className='field has-text-centered'>
                                <button type='submit' className='button is-primary'>CONTINUE</button>
                            </div>
                            <div className='field has-text-centered'>
                                {
                                    showError && <p className='has-text-danger' onClick={() => setShowError(false)}>All fields are required</p>
                                }
                            </div>
                        </form>
                    </div>
                </div>
                    :
                    <div className='column is-3'>
                    <div className='box'>
                        <h4 className='has-text-centered mb-4 has-text-weight-bold has-text-primary'>Enter Payment Details</h4>
                        <div className='field' style={{border:' 1px solid rgb(0, 179, 152)', padding:'0.5rem',borderRadius: '5px'}}>
                            <CardNumberElement
                            options={cardStyle}
                            className='card-element'
                            onChange={cardHandleChange}
                            />
                        </div>
                        <div className='field' style={{border:' 1px solid rgb(0, 179, 152)', padding:'0.5rem',borderRadius: '5px'}}>
                            <CardExpiryElement
                                options={cardStyle}
                                className='card-element'
                                onChange={cardHandleChange}
                            />
                        </div>
                        <div className='field' style={{border:' 1px solid rgb(0, 179, 152)', padding:'0.5rem', borderRadius: '5px'}}>
                            <CardCvcElement
                                options={cardStyle}
                                className='card-element'
                                onChange={cardHandleChange}
                            />
                        </div>
                        <div className='field has-text-centered'>
                            <button type='submit' disabled={processing} className='button is-primary' onClick={() => handleCheckout()}>
                                {
                                    processing ? 'PROCESSING':'PAY'
                                }
                            </button>
                        </div>
                        <div className='field has-text-centered'>
                            {
                                error ? <p className='has-text-danger'>{error}</p>: null
                            }
                        </div>
                    </div>
                    </div>

            }

        </div>
    )
}

export default CustomSingleProductPage
