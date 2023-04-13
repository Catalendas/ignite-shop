import { useCart } from "@/Hooks/useCart"
import { Card, CardContainer, ImgContainer, BagShopping } from "@/styles/pages/app"
import Image from "next/image"
import { X } from "phosphor-react"
import { useState } from "react"
import axios from "axios"
// import camiseta from "../../assets/camisetas/1.png"

interface BagShoppingComponentProps {
    show: boolean,
    setShow: (e: boolean) => void
}

export function BagShoppingComponent({show, setShow}: BagShoppingComponentProps){

    const {cartItems, removeToCart, totalValueProduct} = useCart()

    const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

    const cartQuantity = cartItems.length

    const totalValueProductFormated = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(totalValueProduct)

    async function handleCheckout() {
      try {
        setIsCreatingCheckoutSession(true)
        
        const respose = await axios.post("/api/checkout", {
          products: cartItems
        })

        const { checkoutUrl } = respose.data

        window.location.href = checkoutUrl
      } catch (err) {
        setIsCreatingCheckoutSession(false)
        alert("Falha no envio ao carrinho, erro: "+err)
      }
    }

    return (
        <BagShopping css={show == false ? {right: '-40rem', transition: '.5s'} : {right: 0, position: 'absolute', transition: '.5s'}}>
        <div id="cards">
          <button id="close-button" onClick={() => setShow(false)}>
            <X size={24}/>
          </button>

          <CardContainer>
            <h2>Sacola de compras</h2>
            {cartQuantity <= 0 && <p>Parece que seu carrinho está vazio :(</p>}

            <section>
                {cartItems.map( product => (
                    <Card key={product.id}>
                        <ImgContainer>
                            <Image src={product.imageUrl} alt=""  width={94.79} height={94.79}/>
                        </ImgContainer>
                        <div id="description">
                        <span>{product.name}</span>
                        <strong>{product.price}</strong>
                        <button onClick={() => removeToCart(product.id)}>
                            Remover
                        </button>
                        </div>
                    </Card>
                ))}
            </section>
          </CardContainer>
        </div>
        <div id="amounts">
          <div>
              <span>Quantidade</span>
              <span>{cartQuantity} {cartQuantity == 1 ? "Item" : "Itens"}</span>
              <strong>Valor total</strong>
              <strong>{totalValueProductFormated}</strong>
          </div>
          <button onClick={handleCheckout} disabled={isCreatingCheckoutSession || cartQuantity <= 0}>Finalizar compra</button>
        </div>
      </BagShopping>
    )
}