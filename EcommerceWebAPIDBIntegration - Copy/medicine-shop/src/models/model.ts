export interface User {
    userID: number;
    amount: number;
    name: string;
    email: string;
    password: string;
    userPhoneNumber: string;
}

export interface ProductInfo {
    productID: number;
    productName: string;
    productCount: number;
    productPrice: number;
}

export const orderStatus: string[] = ["Purchased", "Cancelled"];

export  interface Orders {
    orderID: number;
    productID: number;
    productName: string;
    userID: number;
    totalPrice: number;
    productCount: number;
    purchaseStatus: string;
    orderDate: Date;
}