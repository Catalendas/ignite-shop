import { HomeContainer, Product } from "@/styles/pages/home"
import Image from "next/image"
import {useKeenSlider} from "keen-slider/react"

import camiseta1 from "../assets/camisetas/1.png"
import camiseta2 from "../assets/camisetas/2.png"
import camiseta3 from "../assets/camisetas/3.png"

import "keen-slider/keen-slider.min.css"
import { stripe } from "@/lib/stripe"
import { GetStaticProps } from "next"
import Stripe from "stripe"
import Head from "next/head"


interface HomeProps {
  products: {
    id: string,
    name: string,
    imageUrl: string,
    price: string
  }[]
}

export default function Home({products}: HomeProps) {

  const [slideRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    }
  })

  return (
    <>
    <Head>
      <title>Ignite shop</title>
    </Head>
      <HomeContainer ref={slideRef} className="keen-slider">
        {products.map( product => {
          return (
              <Product className="keen-slider__slide" key={product.id} href={`/product/${product.id}`} prefetch={false}>
                <Image src={product.imageUrl} width={520} height={480} alt={product.name}/>

                <footer>
                  <strong>{product.name}</strong>
                  <span>{product.price}</span>
                </footer>   
              </Product>
          )
          })}
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  const response = await stripe.products.list({
    expand: ["data.default_price"],
  })
  
  const products = response.data.map(response => {
    const price = response.default_price as Stripe.Price

    return {
      id: response.id,
      name: response.name,
      imageUrl: response.images[0],
      price: new Intl.NumberFormat("pt-br", {
        style: "currency",
        currency: "BRL"
      }).format(price.unit_amount! / 100
      ),

    }
  })

  return {
    props: {
      products,
    }, 
    revalidate: 60 * 60 * 2, // Duas horas
  }
}
