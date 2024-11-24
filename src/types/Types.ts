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
  
 export interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
  }
  
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
  