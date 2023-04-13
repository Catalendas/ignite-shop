import { stripe } from "@/lib/stripe";
import { ImageContainer, ImagesContainer, SuccesContainer } from "@/styles/pages/succes";
import { GetServerSideProps } from "next";
import { redirect } from "next/dist/server/api-utils";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";

interface SuccessProps {
    custumerName: string
    productsImages: string[]
}

export default function Success({custumerName, productsImages}: SuccessProps){
    return (
       <>
            <Head>
                <title>Compra efetuada | Ignite shop</title>

                <meta name="robots" content="noindex"/>
            </Head>

             <SuccesContainer>
                
                <ImagesContainer>
                    {productsImages.map((image, i) => (
                        <ImageContainer key={i}>
                            <Image src={image} width={120} height={110} alt=""/>
                        </ImageContainer>
                    ))}
                </ImagesContainer>

                <h1>Compra efetuada!</h1>

                <p>
                    Uhuul <strong>{custumerName}</strong>, sua compra de{" "} {productsImages.length} {productsImages.length < 1 ? "Produto" : "Produtos" } já está a caminho da sua casa. 
                </p>

                <Link href="/">
                    Voltar ao catálogo
                </Link>

            </SuccesContainer>
       </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({query}) => {

    if(!query.session_id){
        return {
            redirect: {
                destination: "/",
                permanent: false,
            }
        }
    }

    const sessionId = String(query.session_id)

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ["line_items", "line_items.data.price.product"]
    })

    console.log(session.line_items.data[0])

    const custumerName = session.customer_details.name
    const productsImages = session.line_items.data.map((item) => {
        const product = item.price.product as Stripe.Product
        return product.images[0]
    }) 

    return {
        props: {
            custumerName,
            productsImages,
        }
    }
}