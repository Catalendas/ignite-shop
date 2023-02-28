import { stripe } from "@/lib/stripe"
import { ImageContainer, ProductContainer, ProductDatails } from "@/styles/pages/product"
import { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/image"
import { useRouter } from "next/router"
import Stripe from "stripe"
import axios from "axios"
import { useState } from "react"
import Head from "next/head"

interface ProductProps {
    product: {
        id: string,
        name: string,
        imageUrl: string,
        price: string,
        description: string,
        defaultPriceId: string,
    }
}

export default function Produtc({ product }: ProductProps) {

    const [ isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

    async function handleBuyProduct() {
        try {
            setIsCreatingCheckoutSession(true)
            const response = await axios.post('/api/checkout', {
                priceId: product.defaultPriceId
            })

            const { checkoutUrl } = response.data
            
            window.location.href = checkoutUrl

        } catch (err) {
            setIsCreatingCheckoutSession(false)
            alert("Falha ao redirecionar ao checkout")
            console.log(err)
        }
    }

    const { isFallback } = useRouter()

    if(isFallback) {
        return <p>Loadding...</p>
    }
 
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

                        <button disabled={isCreatingCheckoutSession} onClick={handleBuyProduct}>
                            Comprar
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
                defaultPriceId: price.id
            }
        },
        revalidate: 60 * 60 * 1
    }
}