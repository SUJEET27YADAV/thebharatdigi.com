import { StandardCheckoutClient, Env } from "@phonepe-pg/pg-sdk-node";

const clientId = process.env.PHONEPE_CLIENT_ID || "";
const clientSecret = process.env.PHONEPE_CLIENT_SECRET || "";
const clientVersion = process.env.PHONEPE_CLIENT_VERSION || "1";
const env = Env.SANDBOX; //change to Env.PRODUCTION when you go live

if (!clientId || !clientSecret) {
  throw new Error("PhonePe Credentials missing in .env");
}

const client = StandardCheckoutClient.getInstance(
  clientId,
  clientSecret,
  Number(clientVersion),
  env,
);

export default client;
