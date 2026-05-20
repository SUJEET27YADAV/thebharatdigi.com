import { z } from "zod";

export const AdminLoginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const ProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.string().min(1, "Price is required"),
  tag: z.string().min(1, "Category/tag is required"),
  features: z.string().min(1, "Features are required"),
  image_url: z.string().url("Invalid image URL"),
});

export const ServiceSchema = z.object({
  title: z.string().min(1, "Service title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  icon: z.string().optional(),
});

export const PortfolioSchema = z.object({
  title: z.string().min(1, "Project title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  image_url: z.string().url("Invalid image URL"),
  link: z.string().url("Invalid project link"),
  tags: z.string().optional(),
});

export type AdminLoginInput = z.infer<typeof AdminLoginSchema>;
export type ProductInput = z.infer<typeof ProductSchema>;
export type ServiceInput = z.infer<typeof ServiceSchema>;
export type PortfolioInput = z.infer<typeof PortfolioSchema>;
