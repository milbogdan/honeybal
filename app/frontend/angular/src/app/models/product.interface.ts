import { ProductCategory } from "./productCategory.interface";
import { VariationProducts } from "./variationProducts.interface"; 

export interface Product {
    id: number,
    category : ProductCategory,
    name : string,
    description : string,
    variations : VariationProducts[],
}