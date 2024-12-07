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