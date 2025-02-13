import { ProductCategory } from "./ProductCategory";

export interface Product {
    id: number,
    category : ProductCategory,
    name : string,
    description : string,
    in_stock: boolean,
    imageUrl: string,
    size: string,
    basePrice: number,
    discount: number,
    price : number
}