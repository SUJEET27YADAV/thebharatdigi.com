export type AdminRole = "super_admin" | "admin" | "moderator" | "editor";

export interface AdminUser {
  id: string;
  email: string;
  password_hash: string;
  name?: string;
  avatar_url?: string;
  role: AdminRole;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  last_login_at?: string;
  phone?: string;
  bio?: string;
  department?: string;
  created_by?: string;
  updated_by?: string;
}

export interface AdminUserProfile {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  role: AdminRole;
  is_active: boolean;
  last_login_at?: string;
  phone?: string;
  department?: string;
}

export interface AdminSession {
  id: string;
  admin_user_id: string;
  token_hash: string;
  ip_address?: string;
  user_agent?: string;
  expires_at: string;
  created_at: string;
  last_activity_at: string;
}

export interface AdminLoginCredentials {
  email: string;
  password: string;
}

export interface AdminStats {
  totalSales: number;
  totalOrders: number;
  totalCustomers: number;
  totalRevenue: string;
  recentOrders: Order[];
  topProducts: {
    name: string;
    sales: number;
    revenue: string;
  }[];
}

export type Product = {
  id: string;
  serial: number;
  image_url: string;
  name: string;
  description: string;
  price: string;
  tag: string;
  features: string[];
};

export interface Service {
  id: string;
  icon: string;
  title: string;
  shortdesc: string;
  fulldesc: string;
  features: string[];
  color: string;
  popular: boolean;
}

export interface Project {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  category: string;
  color: string;
  technologies: string[];
  year: string;
  featured: boolean;
  link?: string;
  created_at: string;
}

export interface Order {
  id: string;
  name: string;
  email: string;
  phone: string;
  amount: string;
  product_id: string[];
  paid: boolean;
  created_at: string;
}

export interface PaymentRecord {
  id: string;
  customer_id: string;
  amount: string;
  payment_status: "pending" | "completed" | "failed";
  transaction_id: string;
  payment_date: string;
  payment_method: string;
}

export interface FormState {
  success: boolean;
  message: string;
  redirectUrl?: string | undefined;
}
