import { ProductCategory } from "./ProductCategory";
import { VariationProducts } from "./VariationProducts";

export interface Product {
    id: number,
    category : ProductCategory,
    name : string,
    description : string,
    variations : VariationProducts[],
}