import { ProductContext } from "@/Context/cartContext";
import { useContext } from "react";

export function useCart() {
    return useContext(ProductContext)
}