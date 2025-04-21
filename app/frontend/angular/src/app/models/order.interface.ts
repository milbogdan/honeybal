export interface Order {
    id?: number;
    deliveryTypeId: number;
    comment: string;
    phoneNumber: string;
    address: string;
    email: string;
    variations: Variation[];
    createOrder?: Date;
    statusOrder?: string;
    price?: number;
}

interface Variation {
    quantity: number;
    productVariationId: number;
}