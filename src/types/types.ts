export type Product = {
  id: number;
  imageUrl: string;
  name: string;
  description: string;
  price: string;
  tag: string;
  features: string;
};

export interface FormState {
  success: boolean;
  message: string;
  redirectUrl?: string | undefined;
}
