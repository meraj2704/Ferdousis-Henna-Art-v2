export interface Address {
  courierOfficeName: string;
  location: string;
  state: string;
  district: string;
  upazila: string;
}

export interface User {
  userId: string;
  name: string;
  email: string;
  phone: string;
  address: Address;
}

export type Product = {
  _id: string;
  name: string;
  price: number;
  image: string;
  discountPercentage: number;
  discountedPrice: number;
  description: string;
};

export interface OrderDetails {
  subtotal: number;
  tax: number;
  shippingFee: number;
  total: number;
}

export interface Order {
  orderId: string;
  user: User;
  products: Product[];
  orderDetails: OrderDetails;
  orderStatus: string;
  paymentStatus: string;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

export interface AddProductI {
  name: string;
  price: number;
  discountPercentage: number | null;
  discountedPrice: number | null;
  quantity: number | null;
  description: string;
  active?: boolean;
  image: FileList | null;
}

export interface PostI {
  _id: string;
  type: string;
  title?: string;
  description?: string;
  buttonName: string;
  link: string;
  image: string;
  active: boolean;
}
export interface AddPostI {
  type: string;
  title?: string;
  description?: string;
  buttonName: string;
  link: string;
  image: FileList | null;
  active: boolean;
}

export interface ClientPostI{
  _id: string;
  title?: string;
  description?: string;
  buttonName: string;
  link: string;
  image: string;
}

export interface PhotosI{
  _id: string;
  title: string;
  image: string;
}

export interface MessageI{
  _id: string;
  fullName: string;
  email: string;
  message: string;
}
export interface ReviewI{
  _id: string;
  title: string;
  image: string;
}
export interface PhotoI{
  _id: string;
  title: string;
  image: string;
}