import { z } from "zod";

export const CheckoutSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  phone: z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  amount: z.number().min(1, "Amount must be greater than 0"),
  productIds: z
    .array(z.number().min(1, "Product ID must be atleast 1"))
    .min(1, "At least one product ID is required"),
});
