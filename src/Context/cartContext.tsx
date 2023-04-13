import { createContext, ReactNode, useState } from "react";

export interface IProduct {
    id: string,
    name: string,
    imageUrl: string,
    price: string,
    numberPrice: number,
    description: string,
    defaultPriceId: string,
}

interface ProductsContextType {
    cartItems: IProduct[],
    totalValueProduct: number,
    addToCart: (product: IProduct) => void,
    removeToCart: (productId: string) => void,
    checkIfItemAlredyExists: (productId: string) => boolean
}

interface ProductProviderProps {
    children: ReactNode
}

export const ProductContext = createContext({} as ProductsContextType)

export function ProductContextProvider({ children }: ProductProviderProps) {
    const [cartItems, setCartItems] = useState<IProduct[]>([])

    const totalValueProduct = cartItems.reduce((total, product) => {
        return total + product.numberPrice
    }, 0)

    function addToCart(product: IProduct) {
        setCartItems((state) => [...state, product])
    }

    function removeToCart(productId: string) {
        setCartItems((state) => state.filter((item) => item.id != productId))
    }


    function checkIfItemAlredyExists(productId: string) {
        return cartItems.some((product) => product.id == productId)
    }

    return (
        <ProductContext.Provider value={{ cartItems, addToCart, removeToCart, checkIfItemAlredyExists, totalValueProduct }}>
            {children}
        </ProductContext.Provider>
    )
}