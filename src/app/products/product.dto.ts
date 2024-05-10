import { Category } from "../categories/category.dto"
import { Suppliers } from "../suppliers/suppliers.dto"

export interface Product {
    id?: number
    supplier?: Suppliers
    category?: Category
    unitPrice: number
    unitsInStock: number
    name: string
    discontinued: Boolean
}
