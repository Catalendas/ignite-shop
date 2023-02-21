import { GlobalStyle } from '@/styles/global'
import { Container, Header } from '@/styles/pages/app'
import type { AppProps } from 'next/app'
import Image from 'next/image'
import LogoImg from "../assets/Logo.svg"

GlobalStyle()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Image src={LogoImg.src} width={129} height={52} alt="" />
      </Header>
      <Component {...pageProps} />
    </Container>
  )
}
