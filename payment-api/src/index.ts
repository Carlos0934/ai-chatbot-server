import { serve } from "@hono/node-server";
import { Hono } from "hono";
import "dotenv/config";

import paymentRoute from "./routes/payment.route";

const app = new Hono();

app.route("/payments", paymentRoute);

serve(
  {
    fetch: app.fetch,
    port: 8003,
  },
  (c) => console.log(`Server listening on port http://localhost:${c.port}`)
);
