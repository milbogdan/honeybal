export interface Product {
    id: number,
    category_id : number,
    name : string,
    description : string,
    in_stock: boolean,
    size?: string,
    base_price: number,
    discount: number,
    price : number
}