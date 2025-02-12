import React from 'react'
import PaymentForm from './PaymentForm'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const App = () => {
  const stripePromise = loadStripe('pk_test_your publishablekey');

  return (
    <div>
      <Elements stripe={stripePromise}>
        <PaymentForm />
      </Elements>
    </div>
  )
}

export default App
