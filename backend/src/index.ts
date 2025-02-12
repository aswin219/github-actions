import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import Stripe from "stripe";
import morgan from "morgan";

dotenv.config();

const app = express();
app.use(cors());
app.use(morgan("dev"));

const port = process.env.PORT;
const secrete_stripeKey = String(process.env.SECRETE_STRIPE_KEY);

const stripeConnect = new Stripe(secrete_stripeKey, {
  apiVersion: "2024-06-20",
});

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "initial setup done from backend",
  });
});

// test strip route
app.get("/api/test-strip", async (req: Request, res: Response) => {
  try {
    const stripeResponse = await stripeConnect.balance.retrieve();
    console.log("strip connected successfully", stripeResponse);

    return res.status(200).json({
      message: "strip connected successfully",
      stripeResponse,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
});

app.post("/api/create-payment-intent", async (req: Request, res: Response) => {
  const { amount, currency } = req.body;
  try {
    // Create a payment intent with the amount and currency
    const paymentIntent = await stripeConnect.paymentIntents.create({
      amount,
      currency,
    });
    // Return the client secret for front-end use
    const paymentIntentResponse = paymentIntent.client_secret;
    res.status(200).send({
      clientSecret: paymentIntentResponse,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
