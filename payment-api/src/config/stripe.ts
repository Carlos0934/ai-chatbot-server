import Stripe from "stripe";

const apiKey = process.env.STRIPE_API_KEY;
if (!apiKey) throw new Error("Missing Stripe API key");

const stripe = new Stripe(apiKey, {
  apiVersion: "2022-11-15",
});

export default stripe;
