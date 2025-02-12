import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

interface FormData {
    name: string;
    email: string;
    amount: number; // Include amount in form data
}

const FormPage: React.FC = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        amount: 0, // Default to 0, the user will input this
    });
    const [paymentStatus, setPaymentStatus] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'amount' ? parseInt(value) : value, // Ensure the amount is parsed as a number
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return; // Stripe.js has not loaded yet.
        }

        const cardElement = elements.getElement(CardElement);
        if (!cardElement) return;

        try {
            // Convert amount from dollars to cents
            const amountInCents = formData.amount * 100;

            // Call the backend to create a payment intent
            const response = await fetch('http://localhost:5001/api/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: amountInCents, // Send dynamic amount
                    currency: 'usd',
                }),
            });

            const { clientSecret } = await response.json();

            // Confirm the payment on the front-end using the client secret
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        name: formData.name,
                        email: formData.email,
                    },
                },
            });

            if (result.error) {
                // Show error message
                setPaymentStatus(`Payment failed: ${result.error.message}`);
            } else if (result.paymentIntent?.status === 'succeeded') {
                // Show success message
                setPaymentStatus('Payment succeeded!');
            }

            // Reset the form
            setFormData({ name: '', email: '', amount: 0 });

            // Clear the card element
            cardElement.clear();
        } catch (error) {
            setPaymentStatus('Error processing payment.');
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    <div className="card shadow-lg border-0 rounded-lg">
                        <div className="card-header bg-primary text-white text-center py-3">
                            <h3>Payment Form</h3>
                        </div>
                        <div className="card-body p-4">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group mb-3">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        placeholder="Enter your name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* New input field for the amount */}
                                <div className="form-group mb-3">
                                    <label htmlFor="amount">Amount (USD)</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="amount"
                                        name="amount"
                                        placeholder="Enter the amount"
                                        value={formData.amount}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <label htmlFor="cardElement">Card Details</label>
                                    <CardElement id="cardElement" className="form-control" />
                                </div>

                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary btn-block" disabled={!stripe}>
                                        Pay ${formData.amount}
                                    </button>
                                </div>
                                {paymentStatus && <div className="alert alert-info mt-3">{paymentStatus}</div>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormPage;
