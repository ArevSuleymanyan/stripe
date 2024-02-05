import React from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
    const navigate = useNavigate()
        return (
        <div className='has-text-centered'>
            <h1 className='is-size-4 has-text-weight-semibold mb-5'>Thank you for your order</h1>
            <p className='mb-5 has-text-weight-semibold'>We are currently processing your order and
                will send you a confirmation email
            </p>
            <div>
                <button className='button is-primary' onClick={() => navigate('/')}>
                    Continue Shopping
                </button>
            </div>
        </div>)
}

export default Success
