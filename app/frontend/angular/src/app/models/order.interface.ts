export interface Order {
    deliveryTypeId: number;
    comment: string;
    phoneNumber: string;
    address: string;
    email: string;
    variations: Variation[];
}

interface Variation {
    quantity: number;
    productVariationId: number;
}