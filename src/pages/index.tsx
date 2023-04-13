import { HomeContainer, Product, SliderContainer } from "@/styles/pages/home"
import Image from "next/image"

import "keen-slider/keen-slider.min.css"
import { stripe } from "@/lib/stripe"
import { GetStaticProps } from "next"
import Stripe from "stripe"
import Head from "next/head"
import {MouseEvent, useEffect, useState} from "react"
import { useCart } from "@/Hooks/useCart"
import { IProduct } from "@/Context/cartContext"
import { ProductSkeleton } from "@/components/Skeleton"
import useEmblaCarousel from "embla-carousel-react"
import { Handbag } from "phosphor-react"
import Link from "next/link"


interface HomeProps {
  products: IProduct[]
}

export default function Home({products}: HomeProps) {

  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    skipSnaps: false,
    dragFree: true
  })

  const { addToCart, checkIfItemAlredyExists } = useCart()

  const [isLoading, setIsLoading] = useState(true)

  function handleAddToCart(e: MouseEvent<HTMLButtonElement>, product: IProduct) {
    e.preventDefault()
    addToCart(product)
  }

  useEffect(() => {
    const timeOut = setTimeout(() => setIsLoading(false), 2000)

    return () => clearTimeout(timeOut)
  }, [])

  return (
    <>
    <Head>
      <title>Ignite shop</title>
    </Head>
      <div style={{overflow: 'hidden', width: "100%"}}>
        <HomeContainer>
          <div className="embla" ref={emblaRef}>
            <SliderContainer className="embla__container container">
              {isLoading ? (
                <>
                  <ProductSkeleton className="keen-slider__slide"/>
                  <ProductSkeleton className="keen-slider__slide"/>
                  <ProductSkeleton className="keen-slider__slide"/>
                </>
              ): (
                <>
                  {products.map( product => {
                return (
                    <Link 
                      key={product.id}
                      href={`/product/${product.id}`}
                      prefetch={false}
                      passHref
                    >   
                      <Product className="embla__slide">
                        <Image src={product.imageUrl} width={520} height={480} alt={product.name}/>

                        <footer>
                          <div>
                            <strong>{product.name}</strong>
                            <span>{product.price}</span>
                          </div>
                          <button disabled={checkIfItemAlredyExists(product.id)} onClick={(e) => handleAddToCart(e, product)}>
                            <Handbag size={32}/>
                          </button>
                          </footer>   
                      </Product>
                    </Link>
                )
                })}
                </>
              )}
              
              
            </SliderContainer>
          </div>
        </HomeContainer>
      </div>
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
      }).format(price.unit_amount! / 100),
      numberPrice: price.unit_amount / 100,
      defaultPriceId: price.id,
    }
  })

  return {
    props: {
      products,
    }, 
    revalidate: 60 * 60 * 2, // Duas horas
  }
}
