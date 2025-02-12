# **React Stripe Payment Integration**

This project demonstrates how to build a **dynamic payment system** using **React** for the frontend and **Stripe** for payment processing. Users can enter their payment details, choose an amount, and securely complete payments through Stripe’s API.

## **Features**

- Dynamic payment amount input
- Secure card data collection with Stripe's `CardElement`
- Integration with a Node.js backend to create payment intents
- Error handling and success messages
- Beginner-friendly and easy to extend

## **Technologies Used**

- **React**: Frontend framework for building the payment form.
- **Stripe**: Payment processing API.
- **Node.js**: Backend for securely creating Stripe payment intents.
- **Express**: Web framework for handling the API routes.
- **Stripe Elements**: Secure card input fields for collecting sensitive payment data.

## **Project Setup**

### **Prerequisites**

Ensure you have the following installed on your machine:

- **Node.js** (v14+)
- **npm** (v6+)
- **Stripe Account**: [Sign up for Stripe](https://dashboard.stripe.com/register) to get your API keys.

### **Frontend Setup**

1. Clone the repository:

   ```bash
   git clone https://github.com/Richpong212/React-Stripe-Payment.git
   cd React-Stripe-Payment
   ```

2. Install dependencies:

   ```bash
   cd frontend
   npm install
   ```

   ```bash
   cd backend
   npm install
   ```

3. Set up Stripe in the frontend:

   - Open `src/App.tsx`.
   - Replace `'your-publishable-key-here'` with your actual Stripe **Publishable Key** from the [Stripe Dashboard](https://dashboard.stripe.com/apikeys).

4. Start the React development server:

   ```bash
   cd frontend
   npm start
   ```

### **Backend Setup**

1. Navigate to the `backend` folder:

   ```bash
   cd backend
   ```

2. Install backend dependencies:

   ```bash
   npm install
   ```

3. Set up Stripe in the backend:

   - Create a `.env` file in the `server` directory.
   - Add your **Stripe Secret Key** to the `.env` file:

     ```bash
     STRIPE_SECRET_KEY=sk_test_your_secret_key_here
     PORT=your_port_number
     ```

4. Start the backend server:

   ```bash
   yarn dev
   ```

   The backend will run on `http://localhost:5001`.

### **Testing the Payment Flow**

1. Open the frontend in your browser (`http://localhost:3000`).
2. Fill in the form with your name, email, amount, and card details (use Stripe's [test card numbers](https://stripe.com/docs/testing#international-cards), like `4242 4242 4242 4242` for Visa).
3. Submit the form, and if everything is set up correctly, you’ll see a success message after the payment is processed.

## **Project Structure**

```bash
├── src
│   ├── App.tsx          # Main app with Stripe Elements provider
│   ├── PaymentForm.tsx  # Payment form component
│   ├── index.tsx        # Entry point for React app
│   └── ...
└── server
    ├── index.ts         # Node.js backend to handle payment intents
    ├── .env             # Environment variables (Stripe secret key)
    └── ...
```

## **Customization**

- **Dynamic Amounts**: The user can enter any amount they wish to pay in the form. You can modify the form to enforce specific minimum/maximum values.
- **Error Handling**: The project includes basic error handling. You can extend it to cover additional error cases like invalid card data or insufficient funds.

## **Useful Links**

- [Stripe Documentation](https://stripe.com/docs)
- [React Stripe.js Documentation](https://stripe.com/docs/stripe-js/react)
- [Node.js Documentation](https://nodejs.org/en/docs/)

---

## **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
