import { Prisma } from '@prisma/client';

// export type CartItemWithProduct = Prisma.CartItemGetPayload<{
//   include: { product: true };
// }>;

// Usage

export type Link = {
  id: string;
  social: string;
  url: string;
  userid: string;
  created_at: string;
};

export type Profile = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  image: string;
  userid: string;
  createdAt: string;
  updatedAt: string;
};

export type actionFunction = (
  prevState: any,
  formData: FormData
) => Promise<{ message: string }>;

export type ActionResult = {
  message?: string;
  errors?: Record<string, string>;
};

// export type CartItem = {
//   productId: string;
//   image: string;
//   title: string;
//   price: string;
//   amount: number;
//   company: string;

// };

// export type CartState = {
//   cartItems: CartItem[];
//   numItemsInCart: number;
//   cartTotal: number;
//   shipping: number;
//   tax: number;
//   orderTotal: number;
// };
