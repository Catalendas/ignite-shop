import { stripe } from "@/lib/stripe"
import { ImageContainer, ProductContainer, ProductDatails } from "@/styles/pages/product"
import { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/image"
import { useRouter } from "next/router"
import Skeleton from "react-loading-skeleton"
import Stripe from "stripe"

interface ProductProps {
    product: {
        id: string,
        name: string,
        imageUrl: string,
        price: string,
        description: string,
    }
}

export default function Produtc({ product }: ProductProps) {
 
    return (
        <ProductContainer>               
                    <ImageContainer>
                        <Image src={product.imageUrl} width={520} height={480} alt=""/>
                    </ImageContainer>

                    <ProductDatails>
                        <h1>{product.name}</h1>
                        <span>{product.price}</span>

                        <p>{product.description}</p>

                        <button>
                            Comprar
                        </button>
                    </ProductDatails>
        </ProductContainer>
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
                description: product.description
            }
        },
        revalidate: 60 * 60 * 1
    }
}