import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Star, Truck, Shield } from "lucide-react";
import { useState } from "react";

import { toast } from "sonner";
import SocialProof from "@/components/SocialProof";
import UrgencyTimer from "@/components/UrgencyTimer";

/**
 * MãoLuz - Página de Checkout One-Page
 * Focado em conversão com imagens reais do produto
 * Estrutura: Banner desconto → Header → Galeria produto → Checkout → Avaliações
 */

export default function Home() {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);



  // Preço unitário fixo
  const unitPrice = 149.99;
  const unitOriginalPrice = 299.99;
  const discount = "50%";

  // Calcula preço total baseado na quantidade selecionada
  const totalPrice = unitPrice * selectedQuantity;
  const totalOriginalPrice = unitOriginalPrice * selectedQuantity;
  const totalDiscount = totalOriginalPrice - totalPrice;

  const productImages = [
    "https://buyglohand.com/cdn/shop/files/LED_Gesture_2.webp?v=1756328739&width=1946",
    "https://buyglohand.com/cdn/shop/files/LED_Gesture_2_1.webp?v=1756328739&width=1946",
    "https://buyglohand.com/cdn/shop/files/Picture2_2.webp?v=1756328739&width=1946",
    "https://buyglohand.com/cdn/shop/files/Picture3_2.webp?v=1756328739&width=1946",
  ];

  const reviews = [
    {
      name: "Carlos M.",
      date: "30/12/2025",
      rating: 5,
      text: "Produto excelente! Muito brilhante e chegou rápido. Recomendo!",
      verified: true,
    },
    {
      name: "Marina S.",
      date: "27/12/2025",
      rating: 5,
      text: "Adorei! Exatamente como descrito. Entrega super rápida!",
      verified: true,
    },
    {
      name: "João P.",
      date: "20/12/2025",
      rating: 5,
      text: "Qualidade premium, vale cada centavo. Meus amigos adoraram!",
      verified: true,
    },
    {
      name: "Ana L.",
      date: "15/12/2025",
      rating: 5,
      text: "Instalação muito fácil. Produto funciona perfeitamente!",
      verified: true,
    },
    {
      name: "Pedro R.",
      date: "10/12/2025",
      rating: 5,
      text: "Melhor compra que fiz! Divertido e seguro de usar.",
      verified: true,
    },
    {
      name: "Lucia F.",
      date: "05/12/2025",
      rating: 5,
      text: "Chegou bem embalado, produto de ótima qualidade!",
      verified: true,
    },
  ];

  const handleCheckout = async () => {
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          handle: "ecasanovs",
          amount: Math.round(totalPrice * 100),
          description: `MãoLuz - ${selectedQuantity}x Mão LED com Controle Remoto`,
          redirect_url: `${window.location.origin}/pagamento-confirmado`,
          items: [
            {
              description: `MãoLuz - Mão LED com Controle Remoto`,
              quantity: selectedQuantity,
              price_cents: Math.round(unitPrice * 100),
              image_url: productImages[0],
            },
          ],
        }),
      });

      const result = await response.json();

      if (result.url) {
        window.location.href = result.url;
      } else {
        throw new Error("URL de checkout não retornada");
      }
    } catch (error) {
      console.error("Erro ao gerar checkout:", error);
      toast.error("Erro ao processar pagamento. Tente novamente.");
    }
  };

  // Não precisa mais de selectedQty, usamos cálculos diretos

  return (
    <div className="min-h-screen bg-white">
      {/* Banner de Desconto e Frete */}
      <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 px-4 text-center font-bold">
        <p className="text-sm md:text-base">🎉 50% OFF + FRETE GRÁTIS PARA TODO BRASIL 🚚</p>
      </div>

      {/* Header Simples */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 py-4 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-black">MãoLuz</h1>
        </div>
      </header>

      {/* Seção Principal de Checkout */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Coluna Esquerda - Galeria do Produto */}
          <div className="space-y-4">
            {/* Imagem Principal */}
            <div className="bg-gray-100 rounded-lg overflow-hidden aspect-square flex items-center justify-center">
              <img
                src={productImages[selectedImage]}
                alt="MãoLuz Produto"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Miniaturas */}
            <div className="grid grid-cols-4 gap-2">
              {productImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${selectedImage === idx ? "border-orange-500" : "border-gray-200"
                    }`}
                >
                  <img src={img} alt={`Produto ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Informações Rápidas */}
            <div className="bg-blue-50 rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Truck className="w-5 h-5 text-blue-600" />
                <span className="text-gray-700">Entrega em 7 dias úteis</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Shield className="w-5 h-5 text-blue-600" />
                <span className="text-gray-700">Garantia de 1 ano</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Check className="w-5 h-5 text-blue-600" />
                <span className="text-gray-700">Frete grátis para todo Brasil</span>
              </div>
            </div>
          </div>

          {/* Coluna Direita - Checkout */}
          <div className="space-y-6">
            {/* Avaliação */}
            <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-orange-500 text-orange-500" />
                ))}
              </div>
              <span className="font-bold text-lg">4.9/5</span>
              <span className="text-gray-600 text-sm">187 avaliações</span>
            </div>

            {/* Preço Destacado */}
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-orange-600">
                R$ {unitPrice.toFixed(2)}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl text-gray-400 line-through">R$ {unitOriginalPrice.toFixed(2)}</span>
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {discount} OFF
                </span>
              </div>
              <p className="text-sm text-green-600 font-semibold">✓ Em estoque</p>
            </div>

            {/* Contador de Urgência */}
            <UrgencyTimer />

            {/* Seleção de Quantidade Manual */}
            <div className="space-y-3">
              <p className="font-bold text-gray-900">Escolha a quantidade:</p>
              <div className="flex items-center justify-center gap-4 bg-gray-50 rounded-lg p-6">
                <button
                  onClick={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))}
                  className="w-12 h-12 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-2xl flex items-center justify-center transition-all hover:scale-110"
                  disabled={selectedQuantity <= 1}
                >
                  −
                </button>
                <div className="text-center">
                  <div className="text-5xl font-bold text-orange-600">{selectedQuantity}</div>
                  <div className="text-sm text-gray-600 mt-1">unidade{selectedQuantity > 1 ? 's' : ''}</div>
                </div>
                <button
                  onClick={() => setSelectedQuantity(selectedQuantity + 1)}
                  className="w-12 h-12 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-2xl flex items-center justify-center transition-all hover:scale-110"
                >
                  +
                </button>
              </div>
              <p className="text-center text-sm text-gray-600">
                Preço unitário: <span className="font-bold text-orange-600">R$ {unitPrice.toFixed(2)}</span>
              </p>
            </div>

            {/* Resumo do Pedido */}
            <Card className="bg-gray-50 p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{selectedQuantity}x MãoLuz</span>
                <span className="font-semibold">R$ {totalOriginalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Desconto ({discount})</span>
                <span className="font-semibold text-red-600">- R$ {totalDiscount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Frete</span>
                <span className="font-semibold text-green-600">Grátis</span>
              </div>
              <div className="border-t border-gray-200 pt-2 flex justify-between">
                <span className="font-bold">Total:</span>
                <span className="font-bold text-2xl text-orange-600">R$ {totalPrice.toFixed(2)}</span>
              </div>
              <div className="text-center pt-2 border-t border-gray-200">
                <p className="text-xs text-green-600 font-semibold">💳 Parcele em até 12x sem juros no cartão</p>
              </div>
            </Card>

            {/* Botão Comprar */}
            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-lg h-14 font-bold rounded-lg transition-all hover:shadow-lg"
              onClick={handleCheckout}
            >
              🛍️ COMPRAR AGORA
            </Button>

            {/* Métodos de Pagamento */}
            <div className="space-y-2">
              <p className="text-xs text-gray-600 text-center">Formas de pagamento:</p>
              <div className="flex justify-center gap-3 flex-wrap">
                <span className="text-xs bg-gray-100 px-3 py-1 rounded">💳 Cartão</span>
                <span className="text-xs bg-gray-100 px-3 py-1 rounded">🏦 PIX</span>
                <span className="text-xs bg-gray-100 px-3 py-1 rounded">📋 Boleto</span>
              </div>
            </div>

            {/* Garantia */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center text-sm">
              <p className="text-green-900 font-semibold">✓ Garantia de 30 dias ou seu dinheiro de volta</p>
            </div>
          </div>
        </div>

        {/* Seção de Avaliações */}
        <div className="mt-16 pt-12 border-t border-gray-200">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Avaliações dos Clientes</h2>
            <p className="text-gray-600">Veja o que nossos clientes dizem sobre o MãoLuz</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reviews.map((review, idx) => (
              <Card key={idx} className="p-5 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-bold text-gray-900">{review.name}</p>
                    <p className="text-xs text-gray-500">{review.date}</p>
                  </div>
                  {review.verified && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">✓ Verificado</span>
                  )}
                </div>

                <div className="flex gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-orange-500 text-orange-500" />
                  ))}
                </div>

                <p className="text-gray-700 text-sm leading-relaxed">{review.text}</p>
              </Card>
            ))}
          </div>

          {/* Ver Mais Avaliações */}
          <div className="text-center mt-8">
            <Button variant="outline" className="border-2 border-gray-300 text-gray-900 hover:bg-gray-50">
              Ver todas as 187 avaliações
            </Button>
          </div>
        </div>

        {/* FAQ Rápido */}
        <div className="mt-16 pt-12 border-t border-gray-200">
          <h2 className="text-3xl font-bold mb-8">Perguntas Frequentes</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="font-bold text-lg mb-2">O que vem na caixa?</h3>
              <p className="text-gray-600 text-sm">1x Mão LED + 1x Controle Remoto + Manual de Instruções + Adesivo 3M</p>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold text-lg mb-2">Como instalo?</h3>
              <p className="text-gray-600 text-sm">Muito simples! Basta remover o adesivo 3M e colar no vidro do seu carro.</p>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold text-lg mb-2">Qual é o prazo de entrega?</h3>
              <p className="text-gray-600 text-sm">Entregamos em 7 dias úteis em todo o Brasil com frete grátis.</p>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold text-lg mb-2">Tem garantia?</h3>
              <p className="text-gray-600 text-sm">Sim! Garantia de 1 ano contra defeitos de fabricação.</p>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer Simples */}
      <footer className="bg-gray-900 text-white py-8 px-4 mt-16">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">&copy; 2026 MãoLuz™ - Todos os direitos reservados</p>
          <p className="text-gray-500 text-sm mt-2">Expresse-se na estrada com segurança e diversão</p>
        </div>
      </footer>

      {/* Prova Social */}
      <SocialProof />
    </div>
  );
}
