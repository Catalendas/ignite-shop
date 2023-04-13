import { GlobalStyle } from '@/styles/global'
import { Container, Header } from '@/styles/pages/app'
import type { AppProps } from 'next/app'
import Image from 'next/image'
import { Handbag, X } from 'phosphor-react'
import LogoImg from "../assets/Logo.svg"

import { useState } from 'react'
import { ProductContextProvider } from '@/Context/cartContext'
import { BagShoppingComponent } from '@/components/Shoppingbag'
import { useRouter } from 'next/router'

GlobalStyle()

export default function App({ Component, pageProps }: AppProps) {

  const {pathname} = useRouter()

  const showCartButton = pathname != '/success'

  const [show, setShow] = useState(false)
  console.log(typeof setShow)

  return (
    <ProductContextProvider>
      <Container>
        <Header>
          <Image src={LogoImg.src} width={129} height={52} alt="" />

          {showCartButton &&  
            <button onClick={() => setShow(true)}>
              <Handbag size={24} />
            </button>}
        </Header>
        <BagShoppingComponent show={show} setShow={setShow}/>
        <Component {...pageProps} />
      </Container>
    </ProductContextProvider>
  )
}
