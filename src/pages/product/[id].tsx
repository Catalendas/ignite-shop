import { stripe } from "@/lib/stripe"
import { ImageContainer, ProductContainer, ProductDatails } from "@/styles/pages/product"
import { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/image"
import { useRouter } from "next/router"
import Stripe from "stripe"
import { useState } from "react"
import Head from "next/head"
import { useCart } from "@/Hooks/useCart"
import { IProduct } from "@/Context/cartContext"

interface ProductProps {
    product: IProduct
}

export default function Produtc({ product }: ProductProps) {

    const [ isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

    const { isFallback } = useRouter()

    const { checkIfItemAlredyExists, addToCart} = useCart()

    if(isFallback) {
        return <p>Loadding...</p>
    }

    const checkItem = checkIfItemAlredyExists(product.id)
 
    return (
       <>
            <Head>
                <title>{product.name} | Ignite shop </title>
            </Head>
            <ProductContainer>               
                    <ImageContainer>
                        <Image src={product.imageUrl} width={520} height={480} alt=""/>
                    </ImageContainer>

                    <ProductDatails>
                        <h1>{product.name}</h1>
                        <span>{product.price}</span>

                        <p>{product.description}</p>

                        <button disabled={isCreatingCheckoutSession} onClick={(e) => addToCart(product)}>
                            {checkItem ? 'O item já está em sua sacola' : 'Colocar na sacola'}
                        </button>
                    </ProductDatails>
            </ProductContainer>
       </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {

    return {
        paths: [
            {params: {id: "prod_NORlOoqcM2ZtlI"}}
        ],
        fallback: true,
    }
}

export const getStaticProps: GetStaticProps<any, { id: string}> = async ({ params }) => {

    if(!params) {
        return {
            notFound: true
        }
    }

    const productId = params.id

    const product = await stripe.products.retrieve(productId, {
        expand: ["default_price"]
    })

    const price = product.default_price as Stripe.Price

    return {
        props: {
            product: {
                id: product.id,
                name: product.name,
                imageUrl: product.images[0],
                price: new Intl.NumberFormat("pt-br", {
                  style: "currency",
                  currency: "BRL"
                }).format(price.unit_amount! / 100),
                description: product.description,
                defaultPriceId: price.id,
                numberPrice: price.unit_amount,
            }
        },
        revalidate: 60 * 60 * 1
    }
}