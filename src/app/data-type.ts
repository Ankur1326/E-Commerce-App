export interface SingUp {
    name: string,
    passowrd: string,
    email: string
}

export interface Login {
    email: string,
    password: string
}

export interface Product {
    name: string,
    price: number,
    category: string,
    color: string,
    image: string,
    description: string,
    id: number,
    quantity: undefined | number,
    productId: undefined | number
}

export interface Cart {
    name: string,
    price: number,
    category: string,
    color: string,
    image: string,
    description: string,
    id: number,
    quantity: undefined | number,
    productId: number,
    userId: number
}

export interface cartPriceSummary {
    price: number,
    discount: number,
    tax: number,
    delivery: number,
    total: number
}